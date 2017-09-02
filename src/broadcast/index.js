import Promise from 'bluebird';
import newDebug from 'debug';
import noop from 'lodash/noop';

import formatter from '../formatter';
import operations from './operations.json';
import museApi from '../api';
import museAuth from '../auth';
import { camelCase } from '../util';

const debug = newDebug('muse:broadcast');

const museBroadcast = {};

// Base transaction logic -----------------------------------------------------

/**
 * Sign and broadcast transactions on the muse network
 */

museBroadcast.send = function museBroadcast$send(tx, privKeys, callback) {
  const resultP = museBroadcast._prepareTransaction(tx)
    .then((transaction) => {
      debug(
        'Signing transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      return Promise.join(
        transaction,
        museAuth.signTransaction(transaction, privKeys)
      );
    })
    .spread((transaction, signedTransaction) => {
      debug(
        'Broadcasting transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      return museApi.broadcastTransactionWithCallbackAsync(
        () => {},
        signedTransaction
      ).then(() => signedTransaction);
    });

  resultP.nodeify(callback || noop);
};

museBroadcast._prepareTransaction = function museBroadcast$_prepareTransaction(tx) {
  // Login and get global properties
  const loginP = museApi.loginAsync('', '');
  const propertiesP = loginP.then(() => {
    return museApi.getDynamicGlobalPropertiesAsync()
  });
  return propertiesP
    .then((properties) => {
      // Set defaults on the transaction
      const chainDate = new Date(properties.time + 'Z');
      return Object.assign({
        ref_block_num: properties.head_block_number & 0xFFFF,
        ref_block_prefix: new Buffer(properties.head_block_id, 'hex').readUInt32LE(4),
        expiration: new Date(
          chainDate.getTime() +
            15 * 1000
        ),
      }, tx);
    });
};

// Generated wrapper ----------------------------------------------------------

// Generate operations from operations.json
operations.forEach((operation) => {
  const operationName = camelCase(operation.operation);
  const operationParams = operation.params || [];

  const useCommentPermlink =
    operationParams.indexOf('parent_permlink') !== -1 &&
    operationParams.indexOf('parent_permlink') !== -1;

  museBroadcast[`${operationName}With`] =
    function museBroadcast$specializedSendWith(wif, options, callback) {
      debug(`Sending operation "${operationName}" with`, {options, callback});
      const keys = {};
      if (operation.roles && operation.roles.length) {
        keys[operation.roles[0]] = wif; // TODO - Automatically pick a role? Send all?
      }
      return museBroadcast.send({
        extensions: [],
        operations: [[operation.operation, Object.assign(
          {},
          options,
          options.json_metadata != null ? {
            json_metadata: toString(options.json_metadata),
          } : {},
          useCommentPermlink && options.permlink == null ? {
            permlink: formatter.commentPermlink(options.parent_author, options.parent_permlink),
          } : {}
        )]],
      }, keys, callback);
    };

  museBroadcast[operationName] =
    function museBroadcast$specializedSend(wif, ...args) {
      debug(`Parsing operation "${operationName}" with`, {args});
      const options = operationParams.reduce((memo, param, i) => {
        memo[param] = args[i]; // eslint-disable-line no-param-reassign
        return memo;
      }, {});
      const callback = args[operationParams.length];
      return museBroadcast[`${operationName}With`](wif, options, callback);
    };
});

const toString = obj => typeof obj === 'object' ? JSON.stringify(obj) : obj;

Promise.promisifyAll(museBroadcast);

exports = module.exports = museBroadcast;
