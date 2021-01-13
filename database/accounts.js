'use strict';

const chalk = require('chalk');
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const COLLECTION_NAME = 'accounts';

function printFailure(err) {
    console.error(chalk.red.bold('Error'), chalk.grey(err));
}

function findAccount(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).toArray((err, results) => {
            if (err) printFailure(err);
            callback(err ? [] : results);
        });
    }
}

function addAccount(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        var account = {
            email: entry.email || '',
            username: entry.username || '',
			pw: entry.pw || '',
			taches: "Pas de tâches"
        };

        var salt = [String(new Date()), account.email, account.username, account.pw].join('|');
        account._id = crypto.createHash('md5').update(salt).digest('hex');
        
        db.collection(COLLECTION_NAME).insertOne(account, (err, response) => {
            if (err) {
                printFailure(err);
                return callback(null);
            }
            var result = response.ops[0];
            callback(result._id);
        });
    };
}

function countAccounts(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).count((err, count) => {
            if (err) printFailure(err);
            callback(err ? -1: count);
        });
    };
}

function addTask(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        db.collection(COLLECTION_NAME).updateOne({ email: 'adb' }, { $set:{ taches: entry.task } }, (err, response) => {
            if (err) {
                printFailure(err);
                return callback(null);
            }
            var result = response.ops[0];
            callback(result._id);
        });
    };
}

function removeAccount(db) {
    return (id, callback) => {
        callback();
    };
}

function removeAllAccounts(db) {
    return callback => {
        db.collection(COLLECTION_NAME).deleteMany({}, (err, count) => {
            if (err) printFailure(err);
            callback(count);
        });
    };
}

function connexion(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
		let account = db.collecion(COLLECTION_NAME).find({ username : entry.username });
		if (account.pw == entry.pw) {
				return true;
		}
		else {
			return false;
		} 
    };
}

module.exports = (config, callback) => {
    if (!config.silent) console.log(chalk.cyan.bold('Connecting'), `to mongo uri="${config.dbUri}", db="${config.dbName}"`);
    const client = new MongoClient(config.dbUri, { useUnifiedTopology: true});
 
    client.connect(err => {
        // Handling mongo connect error and logging
        if (err) {
            console.error(chalk.red.bold('Error'), 'could not open Mongodb:', chalk.grey(err));
            process.exit(1);
        }
        if (!config.silent) console.log(chalk.green.bold('Connected'), 'to mongo');
        
        const db = client.db(config.dbName);
 
        callback({
            find: findAccount(db),
            count: countAccounts(db),
            addAccount: addAccount(db),
			addTask: addTask(db),
            remove: removeAccount(db),
            removeAll: removeAllAccounts(db)
        });
    });

}
