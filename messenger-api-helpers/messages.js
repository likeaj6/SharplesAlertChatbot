/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable camelcase */
/* eslint-disable max-len */

/*
 * MESSAGES
 *
 * Objects and methods that create objects that represent
 * messages sent to Messenger users.
 */

// ===== STORES ================================================================
import UserStore from '../stores/user-store';
import ItemStore from '../stores/item-store';
import MenuStore from '../stores/menu-store';


// ===== UTILS =================================================================
import {dateString} from '../utils/date-string-format';

const SERVER_URL = process.env.SERVER_URL;

/**
 * Button for displaying the preferences menu inside a webview
 */
const setPreferencesButton = {
  type: 'web_url',
  title: 'Set Menu Preferences',
  url: `${SERVER_URL}/`,
  webview_height_ratio: 'tall',
  messenger_extensions: true,
};

/*
 * Button for displaying the view details button for a item
 */
const viewDetailsButton = (itemId) => {
  return {
    title: "View Today's Ratings",
    type: 'web_url',
    url: `${SERVER_URL}/items/${itemId}`,
    webview_height_ratio: 'compact',
    messenger_extensions: true,
  };
};

/*
 * Button for selecting a item
 */
const rateItemButton = (itemId) => {
  return {
    type: 'postback',
    title: 'Rate This Item',
    payload: JSON.stringify({
      type: 'RATE_ITEM',
      data: {
        itemId: itemId,
      },
    }),
  };
};

/**
 * Button for displaying a postback button that triggers the change item flow
 */
const viewMenuButton = {
  type: 'postback',
  title: "View Today's Menu",
  payload: JSON.stringify({
    type: 'VIEW_MENU',
  }),
};

const rateMenuButton = {
  type: 'postback',
  title: "Rate Today's Menu",
  payload: JSON.stringify({
    type: 'RATE_MENU',
  }),
};

const rateAgainButton = {
    type:"postback",
    title:"Rate Another Item?",
    payload: JSON.stringify({
      type: 'RATE_MENU',
    }),
}

/**
 * Toast message to handle Rick & Morty fans
 */
const toastMessage = {
    // 'Sorry, I am just a humble bot!'
    text: 'Oh my god 😢😢😢',
};

/**
 * Error message to handle unknown responses
 */
const errorMessage = {
    // 'Sorry, I am just a humble bot!'
    text: 'Help! Sharples is holding me captive!',
};

/**
 * Message that informs the user of the promotion and prompts
 * them to set their preferences.
 */
// const helloIntroMessage = (firstName) => {
//   return {
//       attachment: {
//           type: 'template',
//           payload: {
//               template_type: 'button',
//               text: 'Hey ' + firstName + '! I am SharplesBot.\n\nI keep track of the menu and alert you if there is something you like on the menu!\n\nYou can also rate the menu of the day.\n\nBe sure to set your preferences below:',
//               buttons: [setPreferencesButton],
//           },
//       },
//   }
// };
const helloIntroMessage = (firstName) => {
  return {
    text: 'Hey ' + firstName + '! I am SharplesBot.\n\nI keep track of the menu. \n\nIn the future, I will also alert you if there is something you like on the menu and let you rate the menu of the day. \n\nStay tuned!',
  }
};

// const menuIAlertMessage = (recipientId) => {
//     return {
//         attachment: {
//             type: '',
//             payload: {
//
//             },
//         }
//     }
// }


/**
 * Message that informs the user that their preferences have changed.
 */
const preferencesUpdatedMessage = {
  text: 'OK, your preferences have been updated. You can change them anytime you want from the help menu on the bottom.',
};

/**
 * Message that informs that we have their current item selected.
 */
const currentPreferencesText = {
  text: 'Here is your menu alert!',
};

/**
 * Message that informs the user what item has been selected for them
 * and prompts them to select a different item.
 *
 * @param {String} recipientId Id of the user to send the message to.
 * @returns {Object} Message payload
 */
const currentPreferencesButton = (recipientId) => {
  const user = UserStore.get(recipientId);
  const items = user.getPreferredItems();

  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Today's Items: ${item.name}`,
            // image_url: item.images.original,
            // subtitle: item.description,
            buttons: [
            //   viewDetailsButton(item.id),
              rateMenuButton,
            ],
          },
        ],
      },
    },
  };
};

/**
 * Message that precedes us displaying recommended items.
 */
const menuOptionsText = {
  text: `Here's today's menu:`,
};

/**
 * Message that informs the user what item has been selected for them
 * and prompts them to select a different item.
 *
 * @param {Object} id - The Items unique id.
 * @param {Object} name - The Items name.
 * @param {Object} description - The Items description.
 * @param {Object} original - Path to the original image for the item.
 * @returns {Object} Messenger representation of a carousel item.
 */
const menuToCarouselItem = ({id, name, description, images: {original}}) => {
  return {
    title: name,
    image_url: original,
    subtitle: description,
    buttons: [
      viewDetailsButton(id),
      rateItemButton(id),
    ],
  };
};

/**
 * Message that informs the user what item has been selected for them
 * and prompts them to select a different item.
 *
 * @param {String} recipientId Id of the user to send the message to.
 * @returns {Object} Message payload
 */
const menuOptionsCarosel = (menuId) => {
  const menu = MenuStore.get(menuId) || MenuStore.insert({id: menuId});
  const itemOptions = menu.getMenuItems();

  const carouselItems = itemOptions.map(menuToCarouselItem);

  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: carouselItems,
      },
    },
  };
};


/**
 * Message that informs the user what item will be sent to them.
 *
 * @param {String} recipientId Id of the user to send the message to.
 * @returns {Object} Message payload
 */
const ratingsRequestedMessage = (recipientId, itemId) => {
  const {currentRatingItem} = UserStore.get(recipientId);
  let buttons = [];
  var i;
  for (i = 1; i <= 5; i++) {
      buttons.push({
        content_type:'text',
        title:''+i,
        image_url:'https://d30y9cdsu7xlg0.cloudfront.net/png/431-200.png',
        payload:JSON.stringify({
          type: ''+i,
          data: {
            itemId: itemId,
          },
        }),
      })
  }
  let response = {}
  return {
      text: `Please rate the '${preferredItem.name}':`,
      quick_replies: buttons,
  };
};

const alertMessage = (recipientId, itemId) => {
  const {currentRatingItem} = UserStore.get(recipientId);
  // const {item} =
};


/**
 * Message that informs the user what item will be sent to them.
 *
 * @param {String} recipientId Id of the user to send the message to.
 * @returns {Object} Message payload
 */
const ratingsChangedMessage = (recipientId) => {
  const {currentRatingItem} = UserStore.get(recipientId);
  return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: `Thanks for your feedback! The ratings for ${preferredItem.name} will be updated! `,
          buttons: [rateAgainButton],
        },
      },
  };
};

/**
 * Message thanking user for their purchase.
 *
 * @param {String} itemId Id of the purchased item.
 * @returns {Object} Message payload
 */
const itemPurchasedMessage = (itemId) => {
  const purchasedItem = ItemStore.get(itemId);
  return {
    text: `Thank you for purchasing the ${purchasedItem.name}!  `,
  };
};

/**
 * The persistent menu for users to use.
 */
const persistentMenu = {
  setting_type: 'call_to_actions',
  thread_state: 'existing_thread',
  call_to_actions: [
      viewMenuButton
      // rateMenuButton,
      // setPreferencesButton,
  ],
};

/**
 * The Get Started button.
 */
const getStarted = {
  setting_type: 'call_to_actions',
  thread_state: 'new_thread',
  call_to_actions: [
    {
      payload: JSON.stringify({
        type: 'GET_STARTED',
      }),
    },
  ],
};

export default {
  errorMessage,
  toastMessage,
  helloIntroMessage,
  preferencesUpdatedMessage,
  currentPreferencesText,
  currentPreferencesButton,
  menuOptionsText,
  menuOptionsCarosel,
  ratingsRequestedMessage,
  ratingsChangedMessage,
  itemPurchasedMessage,
  persistentMenu,
  getStarted,
};
