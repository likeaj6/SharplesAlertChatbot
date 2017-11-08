/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== STORES ================================================================
import Store from './store';

// ===== MODELS ================================================================
import Item from '../models/item';

const SERVER_URL = process.env.SERVER_URL;
const [MOISTURIZER, CLEANER, MASK, LIP] = Item.CATEGORIES;

/**
 * Stores data for the Items we display to users
 */
class ItemStore extends Store {
  /**
   * Gets all items matching the given category
   *
   * @param {String} categoryId category to filter by
   * @returns {Object[]} all items matching the given category
   */
  getByCategoryId(categoryId) {
    /**
     * Maps don't have a filter method (nor map, reduce, and so on)
     * Rather than write our own, here we convert to an Array
     * and leverage the build-in filter method.
     */
    return [...this.data.values()]
      .filter((item) => item.category === categoryId);
  }

  /**
   * Inserts a item to the Store using the items id as the key
   *
   * @param {Object} item Item to insert
   * @returns {Object} The inserted item
   */
  insert(item) {
    return this.set(item.id, item);
  }
}

/**
 * Initialize the global Item Store and populate with Items for the demo
 */
const ITEM_STORE = new ItemStore();

/* eslint-disable max-len */
ITEM_STORE.insert(
  new Item(
    'moisturizers-kara',
    'Cheesesteak',
    {
      original: `${SERVER_URL}/media/moisturizers/kara-new.jpg`,
      square: `${SERVER_URL}/media/moisturizers/kara-square.jpg`,
    },
    'Hand-crafted with love by Donnie.',
    MOISTURIZER,
    1.59,
  ));

ITEM_STORE.insert(
  new Item(
    'moisturizers-softening',
    'Indian Bar',
    {
      original: `${SERVER_URL}/media/moisturizers/softening-new.jpg`,
      square: `${SERVER_URL}/media/moisturizers/softening-square.jpg`,
    },
    'Best indian food in town.',
    MOISTURIZER,
    8.99,
  ));

ITEM_STORE.insert(
  new Item(
    'moisturizers-revitalizing',
    'Pasta Bar',
    {
      original: `${SERVER_URL}/media/moisturizers/revitalizing-new.jpg`,
      square: `${SERVER_URL}/media/moisturizers/revitalizing-square.jpg`,
    },
    'Amazing.',
    MOISTURIZER,
    12.49,
  ));

ITEM_STORE.insert(
  new Item(
    'cleansers-lathering',
    'Lathering Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/lathering-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/lathering-square.jpg`,
    },
    'A rich lathering cleanser to purify and hydrate all skin types.',
    CLEANER,
    32.22,
  ));

ITEM_STORE.insert(
  new Item(
    'cleansers-refining',
    'Refining Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/refining-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/refining-square.jpg`,
    },
    'An energizing cleanser that removes impurities and dead skin cells for a more refined skin texture.',
    CLEANER,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'cleansers-kara',
    'VB Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/kara-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/kara-square.jpg`,
    },
    'A daily foaming cleanser that promotes visibly clearer skin without drying.',
    CLEANER,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'masks-kara',
    'Belle Mask',
    {
      original: `${SERVER_URL}/media/masks/kara-new.jpg`,
      square: `${SERVER_URL}/media/masks/kara-square.jpg`,
    },
    'Deeply cleanse your skin with our purifying and balancing seaweed oil clay mask.',
    MASK,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'masks-hydrating',
    'Hydrating Mask',
    {
      original: `${SERVER_URL}/media/masks/hydrating-new.jpg`,
      square: `${SERVER_URL}/media/masks/hydrating-square.jpg`,
    },
    'Hydrates and soothes, while leaving skin feeling fresh thanks to its mineral rich formula and liquid gel texture.',
    MASK,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'masks-clay',
    'Clay Mask',
    {
      original: `${SERVER_URL}/media/masks/clay-new.jpg`,
      square: `${SERVER_URL}/media/masks/clay-square.jpg`,
    },
    'Help cleanse and nourish your skin with this clay mask infused with Lavender.',
    MASK,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'lip-kara',
    'Victoria B. Lip Butter',
    {
      original: `${SERVER_URL}/media/lip/kara-new.jpg`,
      square: `${SERVER_URL}/media/lip/kara-square.jpg`,
    },
    'An intensive, creamy moisturizer for lips with the zesty pink grapefruit essence.',
    LIP,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'lip-restorative',
    'Restorative Lip Balm',
    {
      original: `${SERVER_URL}/media/lip/restorative-new.jpg`,
      square: `${SERVER_URL}/media/lip/restorative-square.jpg`,
    },
    'A restorative formula that hydrates lips while softening and smoothing for a beautiful, healthy-looking smile',
    LIP,
    1.99,
  ));

ITEM_STORE.insert(
  new Item(
    'lip-hydrating',
    'Hydrating Lip Butter',
    {
      original: `${SERVER_URL}/media/lip/hydrating-new.jpg`,
      square: `${SERVER_URL}/media/lip/hydrating-square.jpg`,
    },
    'A mixture of Shea Butter and Rice Wax offers deep hydration and softness.',
    LIP,
    1.99,
  ));
/* eslint-enable max-len */

export default ITEM_STORE;
