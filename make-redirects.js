var fs = require('fs');

var pages = {
		blog: 'the blog',
		apathy: 'the comic',
		stumpy: 'Stumpy and Friends'
	},
	keys = Object.keys(pages);

for (var i = 0; i < keys.length; ++i) {
	var key = 'http://i.andrewt.net/' + keys[i],
		value = pages[key],
		Value = value[0].toUpperCase() + value.substr(1),
		body = '<!DOCTYPE HTML><html lang="en-GB"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=' + key + '"><script type="text/javascript">window.location.href = "' + key + '";</script><title>' + Value + ' has moved.</title></head><body>If you are not redirected automatically, follow the <a href="' + key + '">link to ' + value + '</a>.</body></html>';
	try {
		fs.mkdirSync(key);
	} catch (e) {
		console.dir(e);
	}
	fs.writeFileSync(key + '/index.html', body);
}
