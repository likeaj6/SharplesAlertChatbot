/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

/* ----------  External Libraries  ---------- */

import React from 'react';
import 'whatwg-fetch';
import StarRatings from './star-ratings';
import {
  Button,
  ButtonArea,
} from 'react-weui';

/* ----------  Internal Imports  ---------- */

import WebviewControls from '../messenger-api-helpers/webview-controls';
import purchase from './purchase';
import logger from './fba-logging';

const selectItem = (itemId, userId) => {
  logger.fbLog('select_item_start', {item_id: itemId}, userId);
  fetch(`/users/${userId}/item/${itemId}`, {
    method: 'PUT',
  }).then((response) => {
    if (response.ok) {
      logger.fbLog('select_item_success', {item_id: itemId}, userId);
      return;
    }
    logger.fbLog('select_item_error', {item_id: itemId}, userId);
    console.error(
      response.status,
      `Unable to save item for User ${userId}'`
    );
  }).catch((err) => console.error('Error pushing data', err)).then(() => {
    WebviewControls.close();
  });
};

const buyNow = (itemId, userId) => {
  logger.fbLog('payment_step', {step: "start_purchase", item_id: itemId}, userId);
  purchase.buyItem(itemId, userId);
};

/*
 * A component for displaying the Product details for a given product
 */
const Item = ({id, name, currentRating, images, description, userId}) => {
  return (
    <div>
      <div id='product' className='static-page'>
        <div className='static-page-body'>
          <div className='product-body'>
            <img className='product-image' src={images.square}/>
            <div className='product-details'>
              <h1>{name}</h1>
              <p className='static-page-subtitle'>{description}</p>
              <h3>{"Today's Rating:"}</h3>
                <StarRatings
                  rating={currentRating}
                  starRatedColor='rgb(251, 233, 96)'
                  starEmptyColor='rgba(208,218,223,0.5)'
                  starWidthAndHeight='40px'
                  starSpacing='2px'
                  isSelectable={false}
                  isAggregateRating={true}
                  numOfStars={5}
                />
            </div>
          </div>
        </div>
      </div>
      <ButtonArea className='see-options' direction='horizontal'>
        <Button onClick={() => selectItem(id, userId)}>
          Rate Item
        </Button>
      </ButtonArea>
    </div>
  );
};

export default Item;
