function trueYPos(element) {
	for (var top = 0; element; element = element.parentElement)
		top += element.offsetTop +
			parseInt(window.getComputedStyle(element).marginTop, 10);
	return top;
}

function getScrollPosition() {
	return document.body.scrollTop || window.scrollY;
}

function animate(getter, setter, target, time, then) {
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

var expandables = {},
	nextExpandableId = 0;
function getOrRegisterExpandable(name, delay) {
	var element, e;
	if (name instanceof HTMLElement) {
		element = name;
		if (!element.id)
			element.id = '__expandable_' + ++nextExpandableId;
		name = name.id;
	} else element = document.getElementById(name);
	if (!expandables[name]) {
		element.style.height = 0;
		expandables[name] = e = {
			element: element,
			child: element.children[0],
			isOpen: false,
			cancel: null,
			delay: delay || 300
		};
		e.toggle = function() {
			toggleExpandable(e);
		};
		e.open = function() {
			if (!e.isOpen) toggleExpandable(e);
		};
		e.close = function() {
			if (e.isOpen) toggleExpandable(e);
		};
	}
	return expandables[name];
}

function toggleExpandable(name) {
	var e = (typeof name == 'object') ? name : expandables[name];
	if (e.cancel)
		e.cancel();
	e.cancel = animate(
		function getH() { return e.element.clientHeight; },
		function setH(h) {
			e.element.style.height = h + 'px';
			requestParallax();
		},
		e.isOpen ? 0 : e.child.clientHeight,
		e.delay,
		e.isOpen ? null : function () { 
			e.element.style.height = 'auto';
			requestParallax();
		});
	e.isOpen = !e.isOpen;
}

function makeExpandable(name, delay) {
	var e = getOrRegisterExpandable(name, delay);
	document.getElementById(name + '-link')
		.addEventListener('click', function(e) {
			toggleExpandable(name);
			e.preventDefault();
		});
}

var lastPosition = -1,
	parallaxes = [],
	requested = false;
function requestParallax() {
	if (!requested) {
		requested = true;
		requestAnimationFrame(updateParallax);
	}
}
function updateParallax() {
	parallaxes.forEach(function (parallax) {
		parallax.image.style.top = ((trueYPos(parallax.container) - window.scrollY) * -0.5) + 'px';
	});
	if (lastPosition != getScrollPosition()) {
		requestAnimationFrame(updateParallax);
		lastPosition = getScrollPosition();
	} else
		requested = false;
}

document.addEventListener('DOMContentLoaded', function() {

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

	if (window.requestAnimationFrame && !('ontouchstart' in window)) {
		requestParallax();
		window.addEventListener('scroll', requestParallax);
		window.addEventListener('resize', requestParallax);
		var oldScroll = window.scroll;
		window.scroll = function(x, y) {
			requestParallax();
			oldScroll.bind(window)(x, y);
		};
	}

	// Smooth scroll
	var cancelScroll;
	if (window.requestAnimationFrame)
		document.body.addEventListener('click', function(e) {
			var href = e.target.getAttribute('href');
			if (/^#/.test(href) && href != '#about') {
				e.preventDefault();
				var anchors = document.getElementsByTagName('a'),
					scrollTarget = null;
				for (var i = 0; i < anchors.length && !scrollTarget; ++i)
					if (anchors[i].getAttribute('name') == href.substr(1))
						scrollTarget = anchors[i];
				if (cancelScroll)
					cancelScroll();
				cancelScroll = animate(
					getScrollPosition,
					function (y) { window.scroll(0, y); },
					trueYPos(scrollTarget.parentElement),
					300);
			}
		});

	// About
	if (window.requestAnimationFrame)
		makeExpandable('about', 300);

	// Expand tips on icon click
	if (window.requestAnimationFrame) {
		var tips = document.getElementsByClassName('tooltip'),
			expandables = [];
		for (var i = 0; i < tips.length; ++i)
			expandables.push(getOrRegisterExpandable(tips[i], 300));
		document.body.addEventListener('click', function(e) {
			for (var el = e.target; el; el = el.parentElement)
				if (el.classList.contains('icon')) {
					var id = el.getAttribute('data-slug') + '-tip',
						c = el.getAttribute('data-class'),
						ex = getOrRegisterExpandable(id);
					if (ex) {
						expandables.forEach(function (exp) {
							if (exp.element.classList.contains(c) && exp != ex)
								exp.close();
						});
						ex.toggle();
						e.preventDefault();
					}
				}
		});
	}

	// Hover text in the footer
	var ids = ['leeds', 'uom', 'ms'],
		imgs = [],
		ps = [],
		otherwise = document.getElementById('otherwise');
	for (var i = ids.length - 1; i >= 0; i--) {
		imgs[i] = document.getElementById(ids[i]);
		ps[i] = document.getElementById(ids[i] + '-p');

		imgs[i].addEventListener('mouseover', function() {
			for (var j = ids.length - 1; j >= 0; j--) {
				var classname = (this.id == ids[j]) ? 'over' : 'other';
				imgs[j].className = classname;
				ps[j].className = classname;
			};
			otherwise.className = 'other';
		});
		imgs[i].addEventListener('mouseout', function() {
			for (var j = ids.length - 1; j >= 0; j--) {
				imgs[j].className = 'none';
				ps[j].className = 'none';
			};
			otherwise.className = 'none';
		});
	}

	// Easter egg
	var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
		k = 0;
	window.addEventListener('keydown', function(e) {
		if (e.keyCode != konami[k])
			k = 0;
		else if (++k == konami.length) {
			document.body.className = 'konami';
			var elements = document.getElementsByTagName('*');
			for (var ii = elements.length - 1; ii >= 0; ii--)
				elements[ii].style.backgroundImage = 'none';
			var imgs = document.getElementsByTagName('img');
			for (var ii = imgs.length - 1; ii >= 0; ii--) {
				var i = imgs[ii];
				var canvas = document.createElement('canvas');
				canvas.width = i.width;
				canvas.height = i.height;
			    var ctx = canvas.getContext('2d');
			    ctx.drawImage(i, 0, 0);
				i.parentElement.appendChild(canvas);
				i.parentElement.removeChild(i);
			    var d = ctx.getImageData(0, 0, i.width, i.height);
			    for (var x = 0; x < i.width; x += 4)
			    	for (var y = 0; y < i.height; y += 4) {
			    		var rgba = [0, 0, 0, 0];
					    for (var xi = 0; xi < 4; ++xi)
					    	for (var yi = 0; yi < 4; ++yi)
					    		for (var c = 0; c < 4; ++c)
					   				rgba[c] += d.data[c + (x + xi + (y + yi) * i.width) * 4];
						for (var c = 0; c < 4; ++c)
							rgba[c] = Math.round(rgba[c] / 4080) * 255;
					    for (var xi = 0; xi < 4; ++xi)
					    	for (var yi = 0; yi < 4; ++yi)
					    		for (var c = 0; c < 4; ++c)
					   				d.data[c + (x + xi + (y + yi) * i.width) * 4] = rgba[c];
			    	}
			    ctx.putImageData(d, 0, 0);
			}
			k = 0;
		}
	});
});