function bind() {
	var ids = ['leeds', 'uom', 'ms'];
	var imgs = [];
	var ps = [];
	for (var i = ids.length - 1; i >= 0; i--) {
		imgs[i] = document.getElementById(ids[i]);
		ps[i] = document.getElementById(ids[i] + '-p');

		imgs[i].addEventListener('mouseover', function() {
			for (var j = ids.length - 1; j >= 0; j--) {
				var classname = (this.id == ids[j]) ? 'over' : 'other';
				imgs[j].className = classname;
				ps[j].className = classname;
			};
		});
		imgs[i].addEventListener('mouseout', function() {
			for (var j = ids.length - 1; j >= 0; j--) {
				imgs[j].className = 'none';
				ps[j].className = 'none';
			};
		});
	}

	var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	var k = 0;
	window.addEventListener('keydown', function(e) {
		if (e.keyCode != konami[k])
			k = 0;
		else if (++k == konami.length) {
			document.body.className = 'konami';
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
}