/******************************************************************************************************
 * Helper for managing topoics
 * Chris Biedermann
 * V1.0
 * September 2023
 * 
 * 
 *******************************************************************************************************/

const DataGateway = require('./DataGateway');
const gateway = new DataGateway();

async function topics_clear() {
   await gateway.topics_ClearAll()
}

async function topics_getAll() {
    var items = await gateway.topics_readAll();
    return items;
}

async function topics_getOne(name) {
    var item = await gateway.topics_readOne(name);
    return JSON.stringify(item);
}

async function topics_getAll_Names() {
    var items = await gateway.topics_readAll();
    ret = []
    for (item of items) {
        ret.push(item.name)
    }
    return ret
}

// Ensure topics exist
async function topics_setup() {
    topics_existing = []
    topics_to_add = []
    //Default Topics if none extist
    const topics_to_use = require("../config/config").topicsToUse;
    var items = await gateway.topics_readAll();
    for (item of items) {
        topics_existing.push(item.name)
    }
    for (item of topics_to_use) {
        if (!topics_existing.includes(item)) {
            topics_to_add.push(item)
        }
    }
    for (item of topics_to_add) {
        await gateway.topics_Insert({ 'name': item })
    }
}

//Map incoming feeds to topics
async function map_To_Topics(items) {
    var topics = await gateway.topics_readAll();
    for (let i = 0; i < topics.length; i++) {
        console.log("TOPTIC:    ", topics[i].name)
        var feeds = topics[i].feeds;
        for (let j = 0; j < items.length; j++) {
            if (items[j].content.toUpperCase().includes(topics[i].name.toUpperCase())) {
                if (!feeds.includes(items[j]._id)) {
                    console.log("New ", items[j]._id)
                    feeds.push(items[j]._id);
                }
                else {
                    console.log("Exists ", items[j]._id)
                }
            }
        }
        topics[i].feeds = feeds;
    }
    gateway.topics_Save(topics);
}



module.exports = { topics_setup,map_To_Topics,topics_clear,topics_getAll,topics_getAll_Names,topics_getOne };