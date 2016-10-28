document.addEventListener('DOMContentLoaded', function() {

	var grid = document.getElementsByClassName('crossword')[0];
	if (!grid) { console.log('No grid'); return; }

	var width = grid.getAttribute('width'),
		height = grid.getAttribute('height'),
		selected = null,
		direction = 'across';

	var cells = (function() {
		var oneD = document.querySelectorAll('.crossword td'),
			twoD = [];
		for (var y = 0; y < height; ++y) {
			twoD[y] = [];
			for (var x = 0; x < width; ++x) {
				var el = oneD[y * width + x],
					cell = {
						x: x,
						y: y,
						el: el,
						block: el.classList.contains('block')
					};
				twoD[y][x] = cell;
				if (!cell.block)
					cell.el.style.cursor = 'pointer';
				el.setAttribute('data-x', x);
				el.setAttribute('data-y', y);
			}
		}
		return twoD;
	}());

	for (var y = 0; y < height; ++y)
		for (var x = 0; x < width; ++x)
			if (!cells[y][x].isBlock && !selected)
				select(x, y);

	setDirection('across');

	grid.setAttribute('tabindex', 0);
	grid.addEventListener('click', function(e) {
		var td;
		for (td = e.target; td.tagName != 'TD'; td = td.parentElement);
		var y = parseInt(td.getAttribute('data-y'), 10),
			x = parseInt(td.getAttribute('data-x'), 10),
			cell = cells[y][x];
		if (cell == selected)
			setDirection(direction == 'down' ? 'across' : 'down');
		else if (!cell.block)
			select(x, y);
	});

	grid.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case 38: // up;
				move(-1, 0);
				break;
			case 40: // down;
				if (direction == 'down')
					move(1, 0);
				else
					setDirection('down');
				break;
			case 37: // left;
				move(0, -1);
				break;
			case 39: // right;
				if (direction == 'across')
					move(0, 1);
				else
					setDirection('across');
				break;
			case 8: // backspace;
				if (selected.value) {
					selected.value = '';
					draw(selected);
					advance(-1);
				} else {
					advance(-1);
					selected.value = '';
					draw(selected);
				}
				break;
			case 46: // delete;
				selected.value = '';
				draw(selected);
				break;
			default: // typing
				if (e.key.length != 1)
					return;
				selected.value = e.key;
				draw(selected);
				advance(1);
				break;
		}
		e.preventDefault();
	});

	function move(dy, dx) {
		var x = selected.x,
			y = selected.y;
		while (true) {
			x += dx;
			y += dy;
			if (!cells[y] || !cells[y][x])
				return selected;
			else if (cells[y][x].block)
				continue;
			else {
				setDirection(dy ? 'down' : 'across');
				return select(x, y);
			}
		}
	}

	function setDirection(d) {
		grid.classList.remove(direction);
		direction = d;
		grid.classList.add(direction);
	}

	function advance(s) {
		switch (direction) {
			case 'across':
				move(0, s);
				break;
			case 'down':
				move(s, 0);
				break;
		}
	}

	function draw(cell) {
		if (!cell.valueSpan) {
			cell.valueSpan = document.createElement('span');
			cell.valueSpan.classList.add('value');
			cell.el.appendChild(cell.valueSpan);
		}
		cell.valueSpan.innerHTML = '';
		cell.valueSpan.appendChild(document.createTextNode(cell.value));
	}

	function select(x, y) {
		if (selected)
			selected.el.classList.remove('selected');
		selected = cells[y][x];
		selected.el.classList.add('selected');
	}

});
