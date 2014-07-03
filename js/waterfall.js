/**
 * waterfall.js v1.0.0
 * http://www.zoneky.com
 *
 *
 * Copyright 2014, Kayson Li
 * http://www.zoneky.com
 */
;
(function(window) {

	window.onload = function() {
		// generateElements();
	}
	waterfall('grid-gallery');

	window.onresize = function() {
		waterfall('grid-gallery');
	}

	function generateElements() {
		var container = document.getElementById('container');
		for (var i = 0; i < 22; i++) {
			var box = document.createElement('div');
			box.className = 'box';
			box.innerHTML = '<div class="pic"><img src="images/' + (i + 1) + '.jpg" /></div>';
			container.appendChild(box);
		};
	}

	function waterfall(containerId) {
		var container = document.getElementById(containerId);
		var targets = getElementsByClass(container, 'box');
		var boxWidth = targets[0].offsetWidth;
		var cols = ~~ (document.documentElement.clientWidth / boxWidth);
		container.style.width = cols * boxWidth + 'px';

		var hArr = [];
		for (var i = 0; i < targets.length; i++) {
			if (i < cols) {
				hArr.push(targets[i].offsetHeight);
				targets[i].style.top = '0px';
				targets[i].style.left = boxWidth * i + 'px';
			} else {
				// var min = findMin(hArr);
				// var minH = min.value, index = min.index;
				console.log(hArr);
				var minObj = findMin(hArr);
				var minH = minObj.element,
					index = minObj.index;
				targets[i].style.position = 'absolute';
				targets[i].style.top = minH + 'px';
				targets[i].style.left = boxWidth * index + 'px';
				hArr[index] = minH + targets[i].offsetHeight;
			}
		};
		var maxH = Math.max.apply(null, hArr);
		container.style.height = maxH + 'px';
		console.log(hArr);
	}

	function findMin(array) {
		var min = array[0],
			index = 0;
		for (var i = 0; i < array.length; i++) {
			var elem = array[i];
			if (elem < min) {
				min = elem;
				index = i;
			}
		};
		return {
			element: min,
			index: index
		};
	}

	function getElementsByClass(parent, className) {
		var children = parent.getElementsByTagName('*'),
			targets = [];
		for (var i = 0; i < children.length; i++) {
			if (children[i].className == className) {
				targets.push(children[i]);
			}
		};
		return targets;
	}
	window.waterfallLayout = waterfall;
})(window);