var Expandables = (function() {

	var expandables = {},
		nextExpandableId = 0;

	return {
		getOrRegister: getOrRegisterExpandable,
		toggle: toggleExpandable,
		make: makeExpandable
	};

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
		e.cancel = Tools.animate(
			function getH() { return e.element.clientHeight; },
			function setH(h) {
				e.element.style.height = h + 'px';
				if (window.requestParallax)
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

})();
