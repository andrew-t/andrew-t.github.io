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
		parallaxes.forEach(function (parallax) {
			parallax.image.style.top = ((Tools.trueYPos(parallax.container) - window.scrollY) * -0.5) + 'px';
		});
		var scrollPos = Tools.getScrollPosition();
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
		window.addEventListener('resize', request);
		var oldScroll = window.scroll;
		window.scroll = function(x, y) {
			request();
			oldScroll.bind(window)(x, y);
		};
	} else parallaxes.forEach(function(parallax) {
		parallax.image.style.height = '100%';
	});
});