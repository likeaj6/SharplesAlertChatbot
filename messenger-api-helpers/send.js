/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== LODASH ================================================================
import castArray from 'lodash/castArray';

// ===== MESSENGER =============================================================
import api from './api';
import messages from './messages';
import logger from './fba-logging';

// Turns typing indicator on.
const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on', // eslint-disable-line camelcase
  };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off', // eslint-disable-line camelcase
  };
};

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);
};

// Send a read receipt to indicate the message has been read
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen', // eslint-disable-line camelcase
  };

  api.callMessagesAPI(messageData);
};

const sendToastMessage = (recipientId) => {
  logger.fbLog("send_message", {payload: "toastMessage"}, recipientId);
  sendMessage(recipientId, messages.toastMessage);
};

// Send the initial message telling the user about the promotion.
const sendErrorMessage = (recipientId) => {
  logger.fbLog("send_message", {payload: "errorMessage"}, recipientId);
  sendMessage(recipientId, messages.errorMessage);
};

// Send the initial message telling the user about the promotion.
const sendHelloMessage = (recipientId, firstName) => {
  logger.fbLog("send_message", {payload: "hello_message"}, recipientId);
  sendMessage(recipientId, messages.helloIntroMessage(firstName));
};

// Send a message indicating to a user that their preferences have changed.
const sendPreferencesChangedMessage = (recipientId) => {
  sendMessage(
    recipientId,
    [
      messages.preferencesUpdatedMessage,
      messages.currentPreferencesText,
      messages.currentPreferencesButton(recipientId),
    ]);
};

// Send a message displaying the items a user can choose from.
const sendMenuMessage = (recipientId, menuId) => {
  sendMessage(
    recipientId,
    [
      messages.menuOptionsText,
      messages.menuOptionsCarosel(menuId),
    ]);
};

// Send a message that a users preffered item has changed.
const sendItemRateOptions = (recipientId, itemId) =>
  sendMessage(recipientId, messages.ratingsRequestedMessage(recipientId, itemId));

// Send a message that a users preffered item has changed.
const sendItemRatedMessage = (recipientId) =>
  sendMessage(recipientId, messages.ratingsChangedMessage(recipientId));

// Send a message that a user has purchased a item.
const sendGiftPurchasedMessage = (recipientId, itemId) =>
  sendMessage(recipientId, messages.itemPurchasedMessage(itemId));


export default {
  sendMessage,
  sendReadReceipt,
  sendHelloMessage,
  sendPreferencesChangedMessage,
  sendMenuMessage,
  sendErrorMessage,
  sendToastMessage,
  sendItemRateOptions,
  sendItemRatedMessage,
  sendGiftPurchasedMessage,
};
