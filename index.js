const express = require('express')
const app = express()

app.set('view engine', 'pug');

app.get('/', function (req, res){
	res.render('index', {name: 'Andreï DE BONA'});
});

app.get('/experience', (req,res) =>{ 
	res.render('exp');
});

app.get('/2.txt', (req,res) =>{
	res.send('3');
});

app.use(express.static('assets'));

app.listen(80, function() {
	console.log('Example app listening on port 80!')
});