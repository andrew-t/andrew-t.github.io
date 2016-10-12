document.addEventListener('DOMContentLoaded', function(e) {
	var elements = document.getElementsByClassName('footnote');

	var container = document.createElement('div'),
		body = document.createElement('div');
	container.classList.add('hidden', 'footnote-body');
	document.body.appendChild(container);
	container.appendChild(body);

	for (var i = 0; i < elements.length; ++i)
		addFootnote(elements[i]);

	function addFootnote(element) {
		element.appendChild(document.createTextNode('*'));
		element.addEventListener('click', function(e) {
			body.innerHTML = element.getAttribute('data-html');
			container.classList.remove('hidden');
			e.preventDefault();
			container.scrollTop = 0;
		});
	}

	container.addEventListener('click', function(e) {
		container.classList.add('hidden');
		e.preventDefault();
	});
});
