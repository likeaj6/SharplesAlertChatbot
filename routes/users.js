/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import express from 'express';

// ===== MESSENGER =============================================================
import sendApi from '../messenger-api-helpers/send';
import receiveApi from '../messenger-api-helpers/receive';

// ===== STORES ================================================================
import UserStore from '../stores/user-store';

const router = express.Router();

// Get user preferences
router.get('/:userId', ({params: {userId}}, res) => {
  const user = UserStore.get(userId) || UserStore.insert({id: userId});
  const userJSON = JSON.stringify(user);

  console.log(`GET User response: ${userJSON}`);
  res.setHeader('Content-Type', 'application/json');
  res.send(userJSON);
});

/**
 * Return items based on preferences,
 * and store a user's preferences if `persist` if selected (idempotent)
 */
router.put('/:userId', ({body, params: {userId}}, res) => {
  if (body.persist) {
    UserStore.insert({...body, id: userId});
  }

  const userJSON = JSON.stringify({...body, userId});
  console.log(`PUT User response: ${userJSON}`);

  res.sendStatus(204);

  sendApi.sendPreferencesChangedMessage(userId);
});

/**
 * Update a users selected item,
 */
router.put('/:userId/item/:itemId', ({params: {userId, itemId}}, res) => {
  console.log('PUT User Item response:', {userId, itemId});

  res.sendStatus(204);
  receiveApi.handleItemRateRequest(userId, itemId);
});

/**
 * Send purchase confirmation into thread.
 */
router.put('/:userId/purchase/:itemId', ({params: {userId, itemId}}, res) => {
  console.log('PUT User Purchase response:', {userId, itemId});

  res.sendStatus(204);
  receiveApi.handleNewItemPurchased(userId, itemId);
});


export default router;
