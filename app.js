'use strict';

let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/api/whoami', function(req,res){
	let patternIP = /(\d+\.){3}\d+/;
	let headerIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	let ipaddress = patternIP.exec(headerIP)[0];
	let patternLang = /\w+\W*\w*/;
	let language = patternLang.exec(req.headers["accept-language"])[0];
	let software = req.headers['user-agent'];
	let data = { ipaddress , language , software };

	console.log(req.connection.remoteAddress);
	console.log(req.headers['x-forwarded-for']);

	res.json(data);
});

app.listen(app.get('port'), function(){
	console.log(`Now listening on port ${app.get('port')}`);
});