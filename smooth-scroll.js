document.addEventListener('DOMContentLoaded', function() {
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
				cancelScroll = Tools.animate(
					Tools.getScrollPosition,
					function (y) { window.scroll(0, y); },
					Tools.trueYPos(scrollTarget.parentElement),
					300);
			}
		});
});