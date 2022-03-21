'use strict'
const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;
const OPEN_EVENT = 'open';
const ERROR_EVENT = 'error';

(async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
        });
    } catch (e) {
        console.log(`connection error ${e}`);
    }
})();

const db = mongoose.connection;
db.once(OPEN_EVENT, () => {
    console.log(`Successfully connected to db at ${URL}`);
});
db.on(ERROR_EVENT, () => {
    console.log(`connection error while connection at ${URL}`);
});
