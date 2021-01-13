'use strict';

const database = require('../database/accounts');

function addApiRoutes(app, config, callback) {
    database(config, accounts  => {
        
		app.get('/api/accounts', (req, res) => {
            accounts.find(results => {
                res.json({ data: results });
            });
        });
 
        app.post('/api/account', (req, res) => {
            accounts.addAccount(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });
		
		
		app.post('/api/task', (req, res) => {
            accounts.addTask(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });

        app.post('/api/connexion', (req, res) => {
            accounts.connexion(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });
		
        app.all('/api/*', (req, res) => {
            res.json({ error: 404, message: 'Unknown route' });
        });
        
        if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};
