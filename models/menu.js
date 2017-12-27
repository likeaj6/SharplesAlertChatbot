import Item from './item';

import ItemStore from '../stores/item-store';

/**
 * Menu Model
 *
 * @class Menu
 */
export default class Menu {
  /**
   * @property {Array.<string>} - Time since an item has become available
   */
  /**
   * @property {Array.<string>} - Skin types
   */
  static MENU_ITEMS = [

  ];

  /**
   * @property {Array.<string>} - Defaults attributes for users
   */
  static DEFAULT_ATTRIBUTES = {
    dateOfMenu: '2017-01-01',
    menuItems: [],
  };

  /* eslint-disable max-len */
  /**
   * @constructor
   *
   * @param {object} attributes)
   * @param {string} attributes.id - Menu ID ('psid')
   * @param {string} attributes.menuItems - User's skin type (from `User.SKIN_TYPES`)
   * @param {string} attributes.itemCategory -
   *   Preferred type of item (from `Item.CATEGORIES`)
   */
   /* eslint-enable max-len */
  constructor(attributes) {
    const {
      id,
      dateOfMenu,
      menuType,
      menuItems,
  } = Object.assign({}, Menu.DEFAULT_ATTRIBUTES, attributes);
    this.id = id;
    this.menuType = menuType;
    this.dateOfMenu = dateOfMenu;
    this.menuItems = menuItems;
  }

  getMenuItems() {
      return this.menuItems;
  }
}
