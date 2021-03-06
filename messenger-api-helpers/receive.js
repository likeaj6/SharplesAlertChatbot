/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import sendApi from './send';
import datafetch from './datafetch';
import moment from 'moment'
import dateString from '../utils/date-string-format';


// ===== STORES ================================================================
import UserStore from '../stores/user-store';
import ItemStore from '../stores/item-store';
import MenuStore from '../stores/menu-store';

import logger from './fba-logging';
const util = require('util');

// Updates a users preferred item, then notifies them of the change.
const handleItemRateRequest = (senderId, itemId) => {
  const user = UserStore.get(senderId);
  //change function name to currentRatingItem
  user.setCurrentRatingItem(itemId);
  sendApi.sendItemRateOptions(senderId, itemId);
};

// Updates a users preferred item, then notifies them of the change.
const handleItemRated = (senderId, itemId, newRating) => {
  const user = UserStore.get(senderId);
  const item = ItemStore.get(itemId)
  item.addNewRating(newRating)
  sendApi.sendItemRatedMessage(senderId);
};

// Thanks user for purchasing item.
const handleNewItemPurchased = (senderId, itemId) => {
  sendApi.sendItemPurchasedMessage(senderId, itemId);
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
    handleItemRated(senderId, data.itemId, type);
    break;
  case 'VIEW_MENU':
    datafetch.fetchCurrentMenu().then(function(menus) {
        console.log(menus)
        if (menus == {}) {
            //error has occured
            console.log('ERROR')
        } else {
            menus.forEach(function(menu) {
                MenuStore.insert(menu)
            })
            sendApi.sendMenuMessage(senderId, menus);
        }
    })
    break;
  case 'RATE_MENU':
    let menuId = (''+dateString.currentDate()+dateString.currentMealFromDateTime()).toLowerCase()
    console.log(menuId)
    if (!MenuStore.get(menuId)) {
        let menu = datafetch.fetchCurrentMenu().then(function(response){
            if (response = {}) {
                //error has occured
            } else {
                MenuStore.insert(response)
                sendApi.sendMenuMessage(senderId, menuId);
            }
        })
    }
    sendApi.sendMenuMessage(senderId, menuId);
    break;
  case 'RATE_ITEM':
    handleItemRateRequest(senderId, data.itemId);
    break;
  case 'GET_STARTED':
    // let nameRequest = datafetch.fetchUserName(senderId);
    // nameRequest.then(function(response) {
    //     if (response) {
    //         sendApi.sendHelloMessage(senderId, response.first_name);
    //         setUserName(senderId, response.first_name, response.lastName);
    //     }
    // }, function(error) {
    //     sendApi.sendHelloMessage(senderId, 'there');
    // });
    let nameRequest = datafetch.fetchUserName(senderId);
    nameRequest.then(function({first_name, last_name}) {
            console.log("FIRST NAME" + first_name)
        if (!first_name) {
            sendApi.sendHelloMessage(senderId, 'there');
        } else {
            sendApi.sendHelloMessage(senderId, first_name);
            setUserName(senderId, first_name, last_name);
        }
    })
    break;
  default:
    console.error(`Unknown Postback called: ${type}`);
    sendApi.sendErrorMessage(senderId);
    break;
  }
};

function validRating(rating) {
    let valid = ['1', '2', '3', '4', '5']
    return (valid.indexOf(rating) > -1)
}

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
const handleReceiveMessage = (event) => {
    const message = event.message;
    const senderId = event.sender.id;

    // It's good practice to send the user a read receipt so they know
    // the bot has seen the message. This can prevent a user
    // spamming the bot if the requests take some time to return.
    sendApi.sendReadReceipt(senderId);
    if (validRating(message.text)) {
      const {type, data} = JSON.parse(message.quick_reply.payload);
      switch (type) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
            handleItemRated(senderId, data.itemId, type);
            break;
          default:
            break;
      }
    } else {
    if (['your purpose is to pass butter', 'you pass butter', 'pass the butter'].indexOf(message.text.toLowerCase()) >= 0) {
        sendApi.sendToastMessage(senderId);
    } else {
        sendApi.sendErrorMessage(senderId);
    }
    }

};

const setUserName = (id, firstName, lastName) => {
    const user = UserStore.get(id) || UserStore.insert({id: id});
    console.log("USER")
    user.setUserName(firstName, lastName);
    console.log(user)

}


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
  handleItemRateRequest,
  handleItemRated,
  handleNewItemPurchased,
};
