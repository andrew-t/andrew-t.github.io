document.addEventListener('DOMContentLoaded', function() {

	// Expand tips on icon click
	var tips = document.getElementsByClassName('tooltip');
	if (window.requestAnimationFrame) {
		var expandables = [];
		for (var i = 0; i < tips.length; ++i)
			expandables.push(Expandables.getOrRegister(tips[i], 300));
		document.body.addEventListener('click', function(e) {
			for (var el = e.target; el; el = el.parentElement)
				if (el.classList.contains('icon')) {
					var id = el.getAttribute('data-slug') + '-tip',
						c = el.getAttribute('data-class'),
						ex = Expandables.getOrRegister(id);
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
	} else
		for (var i = 0; i < tips.length; ++i)
			tips[i].style.height = '0';
	// Expandable pages
	Pages.make('about-page', 'about-link');
	Pages.make('fractals-page', 'fractals-link');
	Pages.make('snake-page', 'snake-link');

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
});