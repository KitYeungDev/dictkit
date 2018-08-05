#! /usr/bin/env node

var commander = require('commander');
var request = require('request');
var cheerio = require('cheerio');

var basic_link = 'http://dict.cn/';

commander.version('1.0.0')
		 .option('-e, --english [en]', 'Translate English word')
		 .parse(process.argv);

// Check the language input is right
if (commander.english && commander.chinese) {
	console.error('Just support one input language !');
	return;
}

if (commander.english) {
	//English translate to Chinese
	console.log('translating (en -> cn) %s ...', commander.english);

	if (commander.english) {
		var word = commander.english;

		// Send translation request
		request(basic_link+word, function (error, response, body) {
			if (error) {
				console.error('Request error: ', error);
				return;
			}

			if (response && response.statusCode) {
				if (response.statusCode == 200) {
					const $ = cheerio.load(body);

					console.log($('ul[class=dict-basic-ul]').text());
				} else {
					console.log('Response error code: ', response.statusCode);
				}
			}
		});
	} else console.error('`-e` paramter is null.');

} else {
	console.error('Please use `dictkit -h` to check help.');
	return;
}
