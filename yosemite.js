document.addEventListener('DOMContentLoaded', function() {

	var glass = document.querySelector('.yosemite-glass'),
		clone = document.createElement('div'),
		body = document.querySelector('.yosemite-body');

	clone.classList.add('yosemite-clone');
	clone.innerHTML = body.innerHTML;
	body.style.paddingTop =
	clone.style.paddingTop =
		glass.offsetHeight + 'px';
	document.body.appendChild(clone);

	body.addEventListener('scroll', function() {
		clone.scrollTop = body.scrollTop;
		clone.scrollLeft = body.scrollLeft;
	});

});