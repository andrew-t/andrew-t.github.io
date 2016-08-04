window.Parallax = {
	assumeStatic: false,
	request: function() {}
};

document.addEventListener('DOMContentLoaded', function() {
	var lastPosition = -1;
	var parallaxes = [];

	function update() {
		requestAnimationFrame(update);
		var scrollPos = Tools.getScrollPosition();
		if (lastPosition != scrollPos) {
			updating = true;
			requested = false;
			for (var i = parallaxes.length - 1; i >= 0; i--) {
				var parallax = parallaxes[i];
				if (!Parallax.assumeStatic ||
					parallax.coords === undefined)
					parallax.coords = Tools.getCoords(parallax.container);
				if (parallax.coords.top <= scrollPos + window.innerHeight &&
					parallax.coords.top + parallax.coords.height >= scrollPos)
					parallax.image.style.top = ((parallax.coords.top - scrollPos) * -0.5) + 'px';
			}
			lastPosition = scrollPos;
		}
	}

	// Parallax
	var containers = document.getElementsByClassName('parallax');
	for (var i = 0; i < containers.length; ++i) {
		var before = document.createElement('div');
		before.classList.add('before');
		containers[i].appendChild(before);
		parallaxes.push({
			container: containers[i],
			image: before,
			coords: Tools.getCoords(containers[i])
		});
	}

	if (window.requestAnimationFrame && !('ontouchstart' in window))
		requestAnimationFrame(update);
});