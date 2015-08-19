/*global $*/
/*jshint devel:true, freeze:false*/
'use strict';

var almostEqual = require('./almost-equal');
var getCurrentLayout = require('../../../main').getCurrentLayout;
var local = /localhost/.test(document.URL);

var gutters = {
	"default": 10,
	"S": 10,
	"M": 20,
	"L": 20,
	"XL": 20,
};

// ============================================================================
// Polyfills

// https://cdn.polyfill.io/v1/polyfill.js?features=String.prototype.contains
String.prototype.includes = function(string, index) {
	if (typeof string === 'object' && string instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
	return this.indexOf(string, index) !== -1;
};

if (![].includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
		var O = Object(this);
		var len = parseInt(O.length) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1]) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {k = 0;}
		}
		var currentElement;
		while (k < len) {
			currentElement = O[k];
			if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
				return true;
			}
			k++;
		}
		return false;
	};
}

// ============================================================================
// Self-contained stylesheet switcher
(function styleSwitcher() {
	var demoTypes = require('../configurations.json');
	var stylesheet = document.querySelector("link[href*='default']");
	var html = document.documentElement;
	var buttonContainer = document.getElementById("js-demo-switcher");
	var tmp = document.createDocumentFragment();
	var subheading = document.getElementById("subheading");

	Object.keys(demoTypes).forEach(function(type) {
		var button  = document.createElement('button');
		button.classList.add('o-buttons');
		var stylePath = local ? type + '.css' : '/bundles/css?modules=o-grid:/demos/src/scss/' + type + '.scss';
		button.innerHTML = type;
		button.title = demoTypes[type];
		button.addEventListener('click', function() {
			stylesheet.href = stylePath;
			var prev = document.querySelector('[aria-selected=true]');
			if (prev) {
				prev.setAttribute('aria-selected', 'false');
			}
			this.setAttribute('aria-selected', 'true');

			subheading && (subheading.innerHTML = this.title);
			html.className = html.className.replace(/\sstylesheet-(\w|-)+/, '') + ' stylesheet-' + type;

			runTests();
		});
		if (!tmp.childNodes.length) {
			stylesheet.href = stylePath;
			button.setAttribute('aria-selected', 'true');
			html.className += ' stylesheet-' + type;
			subheading && (subheading.innerHTML = button.title);
		}
		tmp.appendChild(button);

	});

	buttonContainer.appendChild(tmp);
}());

function convertKeywordsToSpans(keyword) {
	// If it's a number, return it directly
	if (keyword * 1 >= 0) {
		return keyword * 1;
	}

	switch (keyword) {
		case 'hide':
			return 0;
		case 'one-half':
			return 6;
		case 'one-third':
			return 4;
		case 'two-thirds':
			return 8;
		case 'one-quarter':
			return 3;
		case 'three-quarters':
			return 9;
		case 'full-width':
			return 12;
	}
}

function getExpectedSpans(el) {
	var span = null;
	var layout = getCurrentLayout();

	var rules = $(el).data('oGridColspan') + "";

	var layoutAndKeyword = new RegExp('\\b' + layout + '(1[0-2]|[0-9]|hide|one-half|one-third|two-thirds|one-quarter|three-quarters|full-width)\\b');
	span = rules.match(layoutAndKeyword);

	if (span === null) {
		var numberOfColumns = new RegExp('\\b(1[0-2]|[0-9]|hide|one-half|one-third|two-thirds|one-quarter|three-quarters|full-width)\\b');
		span = rules.match(numberOfColumns);
	}

	if (span === null) {
		return 12;
	}

	return convertKeywordsToSpans(span[1]);
}

// Get offset, pull, push
function getExpectedModifier(el, modifier) {
	var rules = $(el).data('oGridColspan');
	var re = new RegExp(modifier, "g");

	if (!re.test(rules)) {
		return 0;
	}

	var layout = getCurrentLayout();

	var modifiedBy;

	rules.replace(new RegExp('(?:^|\\s)' + layout + modifier + '(\\d{1,2})', 'g'), function($0, $1) {
		modifiedBy = $1;
	});

	if (typeof modifiedBy === 'undefined') {
		rules.replace(new RegExp('(?:^|\\s)' + modifier + '(\\d{1,2})', 'g'), function($0, $1) {
			modifiedBy = $1;
		});
	}

	if (typeof modifiedBy === 'undefined') {
		return 0;
	}

	return modifiedBy / 12 * (parseInt(getComputedStyle(el.parentNode, null).width, 10));
}

function getExpectedMargin(el) {
	var layout = getCurrentLayout();

	var centerModifier = 'center';
	var layoutCenterModifier = layout + 'center';
	var layoutUncenterModifier = layout + 'uncenter';
	var colspan = $(el).data('oGridColspan') + '';
	var modifiers = colspan.split(' ');

	// Offset
	if (colspan.includes('offset')) {
		var offset = getExpectedModifier(el, 'offset');

		return offset;
	}

	// Uncentered
	if (modifiers.includes(layoutUncenterModifier)) {
		return 0;
	}

	// Centered
	if (modifiers.includes(centerModifier) || modifiers.includes(layoutCenterModifier)) {
		// half of the remaining space left by the column
		return 0.5 * (parseInt(getComputedStyle(el.parentNode, null).width, 10) - parseInt(getComputedStyle(el, null).width, 10) - gutters[getCurrentLayout()]);
	}

	return 0;
}

function highlightUnexpectedMargin(el) {
	var expectedMarginLeft = getExpectedMargin(el);
	var actualMarginLeft = parseInt(getComputedStyle(el, null).marginLeft, 10);

	// We verify if margins are "almost equal" because of rounding errors
	if (almostEqual(expectedMarginLeft, actualMarginLeft, 1, 1)) {
		el.className = el.className.replace(/\berror-margin\b/g, '');
	} else {
		/\berror-margin\b/.test(el.className) || (el.className += ' error-margin');
		console.error('Margin error', el, 'Left: ' + expectedMarginLeft + ' (expected) ' + actualMarginLeft  + ' (actual) ');
	}
}

function highlightUnexpectedPosition(el) {
	var expectedPush = getExpectedModifier(el, 'push');
	var expectedPull = getExpectedModifier(el, 'pull');
	var actualPush = getComputedStyle(el, null).left;
	var actualPull = getComputedStyle(el, null).right;

	actualPush = (actualPush === 'auto') ? 0 : parseInt(actualPush, 10);
	actualPull = (actualPull === 'auto') ? 0 : parseInt(actualPull, 10);

	// We verify if positions are "almost equal" because of rounding errors
	if (almostEqual(expectedPush, actualPush, 1, 1) && almostEqual(expectedPull, actualPull, 1, 1)) {
		el.className = el.className.replace(/\berror-position\b/g, '');
	} else {
		/\berror-position\b/.test(el.className) || (el.className += ' error-position');
		console.error('Position error', el, 'Push: ' + expectedPush + ' (expected) ' + actualPush  + ' (actual) ',  'Pull: ' + expectedPull + ' (expected) ' + actualPull  + ' (actual) ');
	}
}

function highlightUnexpectedWidth(el) {
	var expectedPercentage = getExpectedSpans(el) * 100/12;
	var actualPercentage = el.offsetWidth * 100 / (el.parentNode.offsetWidth);

	if (expectedPercentage - actualPercentage > 1 || expectedPercentage - actualPercentage < -1) {
		/\berror-width\b/.test(el.className) || (el.className += ' error-width');
		console.error('Width error', el.attributes['data-o-grid-colspan'], 'Expected: ' + expectedPercentage, 'Actual: ' + actualPercentage);
	} else {
		el.className = el.className.replace(/\berror-width\b/g, '');
	}
}



function tests() {
	console.log('Test suite: starting');
	console.log('Layout: ' + getCurrentLayout());
	console.log('Gutter width: ' + gutters[getCurrentLayout()]);

	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedWidth);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedMargin);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedPosition);
	console.log('Test suite: finished');
}

var resizeTimer = null;

function runTests() {
	setTimeout(tests, 300);

	window.onresize = function(e) {
		if (resizeTimer !== null) {
			clearTimeout(resizeTimer);
		}

		resizeTimer = setTimeout(tests, 300);
	};
}

if (document.documentElement.classList.contains('test')) {
	runTests();
}
