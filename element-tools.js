var Tools = {
	trueYPos: function trueYPos(element) {
		for (var top = 0; element; element = element.parentElement)
			top += element.offsetTop +
				parseInt(window.getComputedStyle(element).marginTop, 10);
		return top;
	},

	getScrollPosition: function getScrollPosition() {
		return document.body.scrollTop || window.scrollY;
	},

	animate: function animate(getter, setter, target, time, then) {
		var lastUpdate = null,
			cancelled = false,
			speed = (target - getter()) / time;
		requestAnimationFrame(nextFrame);
		return function cancel() { cancelled = true; };
		function nextFrame(now) {
			if (cancelled)
				return;
			var interval = lastUpdate ? now - lastUpdate : 18;
			lastUpdate = now;
			var nextValue = getter() + speed * interval;
			if ((target - nextValue) * speed <= 0) {
				setter(target);
				if (then)
					then();
			} else {
				setter(nextValue);
				requestAnimationFrame(nextFrame);
			}
		}
	}
};