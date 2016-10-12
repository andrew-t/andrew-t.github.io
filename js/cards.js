
var container = document.getElementsByClassName('cards')[0];
if (container)
	for (var i = 0; i < container.children.length; ++i)
		addCard(container.children[i]);
else console.log('No cards found.');

function addCard(el) {
	try {
		var link = el.querySelector('h1 a').getAttribute('href');
		el.addEventListener('click', function(e) {
			if (e.target.tagName !== 'A') {
				document.location = link;
				e.preventDefault();
			}
		});
	} catch(e) {
		console.error('Error adding card to element ', el);
		console.log(e);
	}
}
