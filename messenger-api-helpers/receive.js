/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import sendApi from './send';

// ===== STORES ================================================================
import UserStore from '../stores/user-store';
import logger from './fba-logging';
const util = require('util');

// Updates a users preferred gift, then notifies them of the change.
const handleItemRateRequest = (senderId, giftId) => {
  const user = UserStore.get(senderId);
  sendApi.sendItemRateOptions(senderId, giftId);
};


// Updates a users preferred gift, then notifies them of the change.
const handleItemRated = (senderId, giftId) => {
  const user = UserStore.get(senderId);
  user.setPreferredGift(giftId);
  sendApi.sendItemRatedMessage(senderId);
};

// Thanks user for purchasing gift.
const handleNewGiftPurchased = (senderId, giftId) => {
  sendApi.sendGiftPurchasedMessage(senderId, giftId);
};


/*
 * handleReceivePostback — Postback event handler triggered by a postback
 * action you, the developer, specify on a button in a template. Read more at:
 * developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
const handleReceivePostback = (event) => {
  /**
   * The 'payload' parameter is a developer-defined field which is
   * set in a postbackbutton for Structured Messages.
   *
   * In this case we've defined our payload in our postback
   * actions to be a string that represents a JSON object
   * containing `type` and `data` properties. EG:
   */
  const {type, data} = JSON.parse(event.postback.payload);
  const senderId = event.sender.id;

  // perform an action based on the type of payload received
  switch (type) {
  case '1':
    handleItemRated(senderId, data.giftId);
    break;
  case 'RATE_MENU':
    sendApi.sendMenuMessage(senderId);
    break;
  case 'RATE_ITEM':
    handleItemRateRequest(senderId, data.giftId);
    break;
  case 'GET_STARTED':
    sendApi.sendHelloMessage(senderId);
    break;
  default:
    console.error(`Unknown Postback called: ${type}`);
    sendApi.sendErrorMessage(senderId);
    break;
  }
};

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
const handleReceiveMessage = (event) => {
  const message = event.message;
  const senderId = event.sender.id;
  const {type, data} = JSON.parse(event.message.payload);

  // It's good practice to send the user a read receipt so they know
  // the bot has seen the message. This can prevent a user
  // spamming the bot if the requests take some time to return.
  sendApi.sendReadReceipt(senderId);
  switch (type) {
      case 'ONE':
        handleItemRated(senderId, data.itemId);
        break;
      default:

  }
  if (message.text) { sendApi.sendErrorMessage(senderId); }

};

/*
 * handleReceiveReferral - Message Event called when a referral event is sent to
 * your page. Read more about the 'referral' object at: https://developers.
 * facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals/
 */
const handleReceiveReferral = (event) => {
  const senderId = event.sender.id;
  var payload = {};
  if (event.referral.ref){
    payload["ref"] = event.referral.ref;
  }
  if (event.referral.ad_id){
    payload["ad_id"] = event.referral.ad_id;
  }
  logger.fbLog("referral", payload, senderId);
};


export default {
  handleReceivePostback,
  handleReceiveMessage,
  handleReceiveReferral,
  handleItemRated,
  handleNewGiftPurchased,
};
