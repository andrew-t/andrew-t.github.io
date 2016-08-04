var Tools = {

	// from http://stackoverflow.com/a/26230989/1491108
	getCoords: function getCoords(elem) {
	    var box = elem.getBoundingClientRect();

	    var body = document.body;
	    var docEl = document.documentElement;

	    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	    var clientTop = docEl.clientTop || body.clientTop || 0;
	    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	    var top  = box.top +  scrollTop - clientTop;
	    var left = box.left + scrollLeft - clientLeft;

	    return {
	    	top: Math.round(top),
	    	left: Math.round(left),
	    	width: box.width,
	    	height: box.height
	    };
	},
	
	getScrollPosition: function getScrollPosition() {
		return window.scrollY || document.body.scrollTop;
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