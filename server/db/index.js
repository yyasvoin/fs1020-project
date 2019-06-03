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



/**
 * Returns whether an item (computer) exists or not.
 * @param {string} brand of computer
 * @returns {Promise<boolean>}
 */
async function itemExists(brand) {
  const items = await readItems();
  return items.some(items => items.brand === brand);
}


/**
 * Adds a new item (computer) to DB.
 * @param {item} item to create
 * @returns {Promise<undefined>}
 */
async function createItem(item) {
  const allItems = await readItems();
  await writeItems(allItems.concat(items));
}


module.exports = {
  itemExists,
  createItem,
  getAllItems: readItems,
};
