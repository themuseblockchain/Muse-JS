require('babel-polyfill');
import Promise from 'bluebird';
import assert from 'assert';
import makeStub from 'mocha-make-stub'
import should from 'should';

import muse, { Muse } from '../src/api/index';
import config from '../src/config';
import testPost from './test-post.json';

describe('muse.api:', function () {
  this.timeout(30 * 1000);

  describe('new Muse', () => {
    it('doesn\'t open a connection until required', () => {
      assert(!muse.ws, 'There was a connection on the singleton?');
      assert(!new Muse().ws, 'There was a connection on a new instance?');
    });

    it('opens a connection on demand', (done) => {
      const s = new Muse();
      assert(!new Muse().ws, 'There was a connection on a new instance?');
      s.start();
      process.nextTick(() => {
        assert(s.ws, 'There was no connection?');
        done();
      });
    });
  });

  describe('setWebSocket', () => {
    it('works', () => {
      muse.setWebSocket('ws://localhost');
      config.get('websocket').should.be.eql('ws://localhost');
      config.set('websocket', 'wss://wallet.museblockchain.com/blockchain')
    });
  });

  beforeEach(async () => {
    await muse.apiIdsP;
  });

  describe('getFollowers', () => {
    describe('getting ned\'s followers', () => {
      it('works', async () => {
        const result = await muse.getFollowersAsync('ned', 0, 'blog', 5);
        assert(result, 'getFollowersAsync resoved to null?');
        result.should.have.lengthOf(5);
      });

      it('the startFollower parameter has an impact on the result', async () => {
        // Get the first 5
        const result1 = await muse.getFollowersAsync('ned', 0, 'blog', 5)
        result1.should.have.lengthOf(5);
        const result2 = await muse.getFollowersAsync('ned', result1[result1.length - 1].follower, 'blog', 5)
        result2.should.have.lengthOf(5);
        result1.should.not.be.eql(result2);
      });

      it('clears listeners', async () => {
        muse.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('getContent', () => {
    describe('getting a random post', () => {
      it('works', async () => {
        const result = await muse.getContentAsync('yamadapc', 'test-1-2-3-4-5-6-7-9');
        result.should.have.properties(testPost);
      });

      it('clears listeners', async () => {
        muse.listeners('message').should.have.lengthOf(0);
      });
    });
  });

  describe('streamBlockNumber', () => {
    it('streams muse transactions', (done) => {
      let i = 0;
      const release = muse.streamBlockNumber((err, block) => {
        should.exist(block);
        block.should.be.instanceOf(Number);
        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamBlock', () => {
    it('streams muse blocks', (done) => {
      let i = 0;
      const release = muse.streamBlock((err, block) => {
        try {
          should.exist(block);
          block.should.have.properties([
            'previous',
            'transactions',
            'timestamp',
          ]);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamTransactions', () => {
    it('streams muse transactions', (done) => {
      let i = 0;
      const release = muse.streamTransactions((err, transaction) => {
        try {
          should.exist(transaction);
          transaction.should.have.properties([
            'ref_block_num',
            'operations',
            'extensions',
          ]);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamOperations', () => {
    it('streams muse operations', (done) => {
      let i = 0;
      const release = muse.streamOperations((err, operation) => {
        try {
          should.exist(operation);
        } catch (err) {
          release();
          done(err);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('when there are network failures (the ws closes)', () => {
    const originalStart = Muse.prototype.start;
    makeStub(Muse.prototype, 'start', function () {
      return originalStart.apply(this, arguments);
    });

    const originalStop = Muse.prototype.stop;
    makeStub(Muse.prototype, 'stop', function () {
      return originalStop.apply(this, arguments);
    });

    it('tries to reconnect automatically', async () => {
      const muse = new Muse();
      // console.log('RECONNECT TEST start');
      assert(!muse.ws, 'There was a websocket connection before a call?');
      // console.log('RECONNECT TEST make followers call');
      await muse.getFollowersAsync('ned', 0, 'blog', 5);
      assert(muse.ws, 'There was no websocket connection after a call?');
      // console.log('RECONNECT TEST wait 1s');
      await Promise.delay(1000);
      // console.log('RECONNECT TEST simulate close event');
      assert(!muse.stop.calledOnce, 'Muse::stop was already called before disconnect?');
      muse.ws.emit('close');
      assert(!muse.ws);
      assert(!muse.startP);
      assert(muse.stop.calledOnce, 'Muse::stop wasn\'t called when the connection closed?');
      // console.log('RECONNECT TEST make followers call');
      await muse.getFollowersAsync('ned', 0, 'blog', 5);
      assert(muse.ws, 'There was no websocket connection after a call?');
      assert(muse.isOpen, 'There was no websocket connection after a call?');
    });
  });
});
