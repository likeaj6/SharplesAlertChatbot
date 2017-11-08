/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import express from 'express';

// ===== STORES ================================================================
import ItemStore from '../stores/item-store';

const router = express.Router();

// Get Gift page
router.get('/:itemId', ({params: {itemId}}, res) => {
  const item = ItemStore.get(itemId);

  const itemJSON = JSON.stringify(item);
  console.log(`GET Gift response: ${itemJSON}`);

  res.render(
    './index',
    {
      demo: process.env.DEMO,
      item: itemJSON,
      title: item.name,
    }
  );
});

export default router;
