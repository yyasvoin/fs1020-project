'use strict';

let util = require('util');
let path = require('path');
let fs = require('fs');

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('server/db/items.json');


/**
 * Reads and returns contents of items.json.
 * @returns {Promise<Array<Object>>}
 */
async function readItems() {
  const json = await readFile(filePath);
  return JSON.parse(json);
}


/**
 * Replaces the contents of items.json.
 * @param {Array<Object>} items to insert into JSON file
 * @returns {Promise<undefined>}
 */
async function writeItems(items) {
  const json = JSON.stringify(items, null, 2);
  await writeFile(filePath, json);
}

async function searchItems(query) {
  let items = await readItems();

 if (query.id) {
    const pattern = new RegExp(query.id, 'i');
    items = items.filter(item => pattern.test(item.id));
  }
  
  if (query.brand) {
    items = items.filter(item => item.brand === query.brand);
  }


  if (typeof query.available === 'boolean') {
    items = items.filter(item => item.available === query.available);
  }
  return items;
}


/**
 * Returns whether an item (computer) exists or not.
 * @param {string} ID of computer
 * @returns {Promise<boolean>}
 */
async function itemExists(id) {
  const items = await readItems();
  return items.some(item => item.id === id);
}


/**
 * Adds a new item (computer) to DB.
 * @param {item} item to create
 * @returns {Promise<undefined>}
 */
async function createItem(item) {
  const allItems = await readItems();
  await writeItems(allItems.concat(item));
}


module.exports = {
 searchItems,
  itemExists,
  createItem,
  getAllItems: readItems,
};
