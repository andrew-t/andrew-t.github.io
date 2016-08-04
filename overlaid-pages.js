var Pages = (function() {

	var container,
		pages = [];

	document.addEventListener('DOMContentLoaded', function() {
		container = document.getElementById('page-container');
		container.classList.add('hidden');
		container.addEventListener('click', function(e) {
			if (e.target == container)
				pages.forEach(function(page) { page.hide(); });
		});
	});

	function make(pageId) {
		var page = document.getElementById(pageId);
		page.classList.add('hidden');

		for (var i = 1; i < arguments.length; ++i)
			document.getElementById(arguments[i])
				.addEventListener('click', function(e) {
					e.preventDefault();
					toggle();
				});

		var def = {
			element: page,
			visible: false,
			toggle: toggle,
			show: show,
			hide: hide
		};
		pages.push(def);
		return def;

		function show() {
			pages.forEach(function(page) {
				page.element.classList.add('hidden');
			})
			def.visible = true;
			container.classList.remove('hidden');
			page.classList.remove('hidden');
			container.scrollTop = 0;
		}
		function hide() {
			def.visible = false;
			container.classList.add('hidden');
			page.classList.add('hidden');
		}
		function toggle() {
			if (def.visible) hide();
			else show();
		}
	}

	return {
		make: make
	};

})();
