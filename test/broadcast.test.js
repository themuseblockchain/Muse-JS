import Promise from 'bluebird';
import should from 'should';
import museAuth from '../src/auth';
import museBroadcast from '../src/broadcast';
import museFormatter from '../src/formatter';
import packageJson from '../package.json';

const username = process.env.MUSE_USERNAME || 'guest123';
const password = process.env.MUSE_PASSWORD;
const postingWif = password
  ? museAuth.toWif(username, password, 'posting')
  : '5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg';

describe('muse.broadcast:', () => {
  it('exists', () => {
    should.exist(museBroadcast);
  });

  it('has generated methods', () => {
    should.exist(museBroadcast.vote);
    should.exist(museBroadcast.voteWith);
    should.exist(museBroadcast.comment);
    should.exist(museBroadcast.transfer);
  });

  it('has backing methods', () => {
    should.exist(museBroadcast.send);
  });

  it('has promise methods', () => {
    should.exist(museBroadcast.sendAsync);
    should.exist(museBroadcast.voteAsync);
    should.exist(museBroadcast.transferAsync);
  });

  describe('patching transaction with default global properties', () => {
    it('works', async () => {
      const tx = await museBroadcast._prepareTransaction({
        extensions: [],
        operations: [['vote', {
          voter: 'yamadapc',
          author: 'yamadapc',
          permlink: 'test-1-2-3-4-5-6-7-9',
        }]],
      });

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
      ]);
    });
  });

  describe('downvoting', () => {
    it('works', async () => {
      const tx = await museBroadcast.voteAsync(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        -1000
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });

  describe('voting', () => {
    beforeEach(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await museBroadcast.voteAsync(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        10000
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });

    it('works with callbacks', (done) => {
      museBroadcast.vote(
        postingWif,
        username,
        'yamadapc',
        'test-1-2-3-4-5-6-7-9',
        10000,
        (err, tx) => {
          if (err) return done(err);
          tx.should.have.properties([
            'expiration',
            'ref_block_num',
            'ref_block_prefix',
            'extensions',
            'operations',
            'signatures',
          ]);
          done();
        }
      );
    });
  });

  describe('customJson', () => {
    before(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await museBroadcast.customJsonAsync(
        postingWif,
        [],
        [username],
        'follow',
        JSON.stringify([
          'follow',
          {
            follower: username,
            following: 'fabien',
            what: ['blog'],
          },
        ])
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });

  describe('comment', () => {
    before(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await museBroadcast.commentAsync(
        postingWif,
        'siol',
        '3xxvvs-test',
        username,
        museFormatter.commentPermlink('siol', '3xxvvs-test'),
        'Test',
        'This is a test!',
        JSON.stringify({ app: `musejs/${packageJson.version}` }),
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });
});
