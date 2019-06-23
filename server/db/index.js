'use strict';

let util = require('util');
let path = require('path');
let fs = require('fs');

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('server/db/items.json');
let userPath = path.resolve('server/db/password.json');



async function createUser(newUser) {
  //validate username
  if (!newUser.username || !newUser.password || typeof newUser.username !== 'string' || typeof newUser.password !== 'string') {
    throw new Error('Invalid username or password');
  }


  return readUsers()
    .then((user1) => {
      //check for unique username
      user1.forEach((inUser) => {
        if (inUser.username === newUser.username) {
          //function will not execute, and user will not be saved
          throw new Error('Username already in use');
        }
      });

      user1.push(newUser);
      return writeUsers(user1);
    });
}

async function readUsers() {
  return readFile(userPath)
    .then((contents) => {
    return JSON.parse(contents);
  });
}


async function usernameExists(username) {
  return readUsers()
    .then((users) => {
      let exists = false;

      users.forEach((user) => {
        if (user.username === username) {
          exists = true;
        }
      });

      return exists;
    });
}


function getUserPasswordHash(username) {
  return readUsers()
    .then((users) => {
      let match;

      users.forEach((user) => {
        if (user.username === username) {
          match = user;
        }
      });

      if (!match) {
        throw new Error('User does not exist.');
      }

      return match.password;
    });
}


async function writeUsers (newUser) {
  let userJson = JSON.stringify(newUser, null, 2);
  return writeFile(userPath, userJson);
}


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
    let json = JSON.stringify(items, null, 2);
    return writeFile(filePath, json)
      .then(() => items);
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

/**
 * Gets an item by ID and returns the matching item
 */
async function getComputerById(id) {
  const computers = await readItems();
  let matchedComputer;
  computers.forEach((computer) => {
    if (computer.id === id) {
      matchedComputer = computer;
    }
  });
  return matchedComputer;
}

async function deleteItemById(id) {
  return readItems()
    .then((allItems) => {
      return allItems.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
    })
    .then((products) => {
      return writeItems(products);
    });
}

async function updateItemById(id,updatedComputer) {
  return readItems()
    .then((allComputers) => {
      return allComputers.map((computer) => {
        if (computer.id === id) {
          return updatedComputer;
        } else {
          return computer;
        }
      });
    })
    .then((products) => {
      return writeItems(products);
    });
}

module.exports = {
 searchItems,
  itemExists,
  createItem: createItem,
  deleteItemById: deleteItemById,
  updateItemById: updateItemById,
  getComputerById:getComputerById,
  getAllItems: readItems,
   createUser: createUser,
  readUsers: readUsers,
  usernameExists: usernameExists,
  getUserPasswordHash: getUserPasswordHash,

};
