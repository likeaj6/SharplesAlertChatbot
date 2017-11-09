/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODELS ================================================================
import Item from './item';

// ===== STORES ================================================================
import ItemStore from '../stores/item-store';

/**
 * User Model
 *
 * @class User
 */
export default class User {
  /**
   * @property {Array.<string>} - Time since an item has become available
   */
  static ARRIVAL_PERIODS = [
    'thirtyDays',
    'sixtyDays',
    'soon',
  ];

  /**
   * @property {Array.<string>} - Skin types
   */
  static MENU_ITEMS = [
    'acne',
    'oil',
    'tone',
    'wrinkles',
    'sensitive',
    'tightDehydration',
    'flakyDehydration',
    'scars',
  ];

  /**
   * @property {Array.<string>} - Defaults attributes for users
   */
  static DEFAULT_ATTRIBUTES = {
    dateOfBirth: '2017-01-01',
    firstName: '',
    lastName: '',
    arrivalPeriod: User.ARRIVAL_PERIODS[0],
    preferredItems: [],
  };

  /* eslint-disable max-len */
  /**
   * @constructor
   *
   * @param {object} attributes)
   * @param {string} attributes.id - Messenger Page Scoped User ID ('psid')
   * @param {string} attributes.dateOfBirth - Date of birth formatted YYYY-MM-DD
   * @param {string} attributes.environment - User's environment (from `User.ENVIRONMENTS`)
   * @param {string} attributes.menuItems - User's skin type (from `User.SKIN_TYPES`)
   * @param {string} attributes.itemCategory -
   *   Preferred type of item (from `Item.CATEGORIES`)
   * @param {string} attributes.arrivalPeriod -
   *   How recently a item should have been released (from `User.ARRIVAL_PERIODS`)
   */
   /* eslint-enable max-len */
  constructor(attributes) {
    const {
      id,
      firstName,
      lastName,
      arrivalPeriod,
      preferredItems,
    } = Object.assign({}, User.DEFAULT_ATTRIBUTES, attributes);
    this.id = id;
    this.firstName = firstName
    this.lastName = lastName
    this.arrivalPeriod = arrivalPeriod;
    this.preferredItems = preferredItems;
    this.currentRatingItem = null;
  }

  setUserName(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
  /**
   * Get all items matching the users itemCategory
   *
   * @returns {Object[]} All items matching the users itemCategory
   */
  getPreferredItems() {
    return this.preferredItems;
  }

  saveRatingForItem(itemId) {
    return ItemStore.getByCategoryId(this.itemCategory);
  }

  addToPreferredItems() {

  }
  /**
   * Set the users preferredItem to the item matching the id
   *
   * @param {String} itemId Id of the item to set as the users preferred item.
   * @returns {undefined}
   * @memberOf User
   */
  setCurrentRatingItem(itemId) {
    this.currentRatingItem = ItemStore.get(itemId);
  }
}
