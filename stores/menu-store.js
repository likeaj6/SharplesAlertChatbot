/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== STORES ================================================================
import Store from './store';

// ===== MODELS ================================================================
import Menu from '../models/menu';

/**
 * Stores Menu data
 */
class MenuStore extends Store {

  /**
   * Create a menu Object and store into menu store.
   *
   * @param {Object} props Menu properties
   * @returns {Object} User model
   */
  insert(props) {
    const menu = new Menu(props);
    console.log(`Inserting Menu ${JSON.stringify(menu)}`);

    this.set(props.id, menu);
    return menu;
  }
}

// Initialize the global user store.
const MENU_STORE = new MenuStore();

export default MENU_STORE;
