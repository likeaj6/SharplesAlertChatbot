/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Item Model
 *
 * @class Item
 */
export default class Item {
  /**
   * @property {Array.<string>} - Available Item categories
   */
  static CATEGORIES = [
    'moisturizer',
    'cleanser',
    'mask',
    'lipTreatment',
  ];


  updateRating(updatedRating) {
    // this.currentRating = (this.currentRating*this.numOfRatings + updatedRating);
  }

  addNewRating(newRating) {
    this.numOfRatings += 1
    this.currentRating = (this.currentRating*parseFloat(this.numOfRatings-1) + parseFloat(newRating))/parseFloat(this.numOfRatings);
  }

  /**
   * Create a Item
   *
   * @param {string} id - Unique idenitifier of this Item.
   * @param {string} name - Human readable Item name.
   * @param {float} currentRating
   * @param {int} numOfRatings
   * @param {object} images - Path to images.
   * @param {object} images.original - Full size image.
   * @param {object} images.square - Square cropped image.
   * @param {string} description - Description of the Item.
   * @param {string} category - Category of this Item (`Item.CATEGORIES`).
   */
  constructor(id, name, images, description, category, price) {
    this.id = id;
    this.name = name;
    this.currentRating = 0;
    this.numOfRatings = 0;
    this.images = images;
    this.description = description;
    this.category = category;
    this.price = price;
  }
}
