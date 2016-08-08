document.addEventListener('DOMContentLoaded', function() {
	var lastPosition = -1;
	var parallaxes = [];
	var requested = false;

	function request() {
		if (!requested) {
			requested = true;
			requestAnimationFrame(update);
		}
	}

	// Some modules may need to trigger this manually:
	window.requestParallax = request;

	function update() {
		var scrollPos = Tools.getScrollPosition();
		for (var i = parallaxes.length - 1; i >= 0; i--) {
			var parallax = parallaxes[i];
			parallax.image.style.transform = 'translate(0, ' + ((parallax.pos - scrollPos) * -0.5) + 'px)';
		}
		if (lastPosition != scrollPos) {
			requestAnimationFrame(update);
			lastPosition = scrollPos;
		} else
			requested = false;
	}

	// Parallax
	var containers = document.getElementsByClassName('parallax');
	for (var i = 0; i < containers.length; ++i) {
		var before = document.createElement('div');
		before.classList.add('before');
		containers[i].appendChild(before);
		parallaxes.push({
			container: containers[i],
			image: before
		});
	}

	if (window.requestAnimationFrame &&
		window.devicePixelRatio <= 1.5 &&
		!('ontouchstart' in window)) {
		request();
		window.addEventListener('scroll', request);
		window.addEventListener('resize', function() {
			getSizes();
			request();
		});
		getSizes();
		var oldScroll = window.scroll;
		window.scroll = function(x, y) {
			request();
			oldScroll.bind(window)(x, y);
		};
	} else parallaxes.forEach(function(parallax) {
		parallax.image.style.height = '100%';
	});

	function getSizes() {
		parallaxes.forEach(function(parallax) {
			parallax.pos = Tools.trueYPos(parallax.container);
		});
	}
});