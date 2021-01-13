'use strict';

const chalk = require('chalk');
const request = require('request');
const bodyParser = require('body-parser');

function addHtmlRoutes(app, config, callback) {
    app.set('view engine', 'pug');
    
	app.get('/', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/'));
        
        request.get(`${config.apiRoot}/api/accounts`, { json: true }, (err, reqRes, body) => {
            res.render('index', {
                accountList: !err && body && Array.isArray(body.data) ? body.data : []
            });
        });
    });
	
	app.get('/inscription', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/inscription'));
        
        request.get(`${config.apiRoot}/api/accounts`, { json: true }, (err, reqRes, body) => {
            res.render('inscription', {
                accountList: !err && body && Array.isArray(body.data) ? body.data : []
            });
        });
    });
	
	
	app.post('/newAccount', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/newAccount'));
        
        request.post(
            `${config.apiRoot}/api/account`,
            { json: req.body },
            (err, reqRes, body) => {
                if (err) console.error(chalk.bold.red('Error'), err);
                res.render('newAccount', {
                    success: req.body && req.body.success
                });
            }
        );
    });
	
	app.post('/tache', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/tache'));
        
        request.post(
            `${config.apiRoot}/api/tasks`,
            { json: req.body },
            (err, reqRes, body) => {
                if (err) console.error(chalk.bold.red('Error'), err);
                res.render('tache', {
                    success: req.body && req.body.success
                });
            }
        );
    });
    
	app.post('/newTask', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/newTask'));
        
        request.post(
            `${config.apiRoot}/api/task`,
            { json: req.body },
            (err, reqRes, body) => {
                if (err) console.error(chalk.bold.red('Error'), err);
                res.render('/newTask', {
                    success: req.body && req.body.success
                });
            }
        );
    });
	
	app.post('/connexion', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/connexion'));
        
        request.post(
            `${config.apiRoot}/api/connexion`,
            { json: req.body },
            (err, reqRes, body) => {
                if (err) console.error(chalk.bold.red('Error'), err);
                res.render('connexion', {
                    success: req.body && req.body.success
                });
            }
        );
    });
	
	

    if (callback) callback();
}

module.exports = {
    addRoutes: addHtmlRoutes
}
