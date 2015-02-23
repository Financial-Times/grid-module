# o-grid [![Build Status](https://travis-ci.org/Financial-Times/o-grid.svg?branch=master)](https://travis-ci.org/Financial-Times/o-grid)

## About

o-grid defines a 12 column responsive, nestable grid system for laying out documents and modules.

It works in browsers that support *CSS @media queries* and *box-sizing*, as well as Internet Explorer 8.

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

[![Grid system](https://rawgit.com/Financial-Times/o-grid/master/img/grid-system.png)](https://rawgit.com/Financial-Times/o-grid/master/img/grid-system.png)

## Browser support

This module has been verified in Internet Explorer 8+, modern desktop browsers (Chrome, Safari, Firefox, …) and mobile browsers (Android browser, iOS safari, Chrome mobile).

Older browsers: you may use a [box-sizing polyfill](https://github.com/Schepp/box-sizing-polyfill) to support give better support to IE < 8.

### Grid dimensions

#### General settings

* Minimum width: 240px
* Maximum width: 1210px
* Gutter width: 10px
* Number of columns: 12

#### Layouts:

* **Default (no layout name)** 240px - …
* **Small (S)** 490px - 729px
* **Medium (M)** 730px - 969px
* **Large (L)** 970px to 1209px
* **Extra large (XL)** 1210px

## General use

### Utility classes

```html
<div class="o-grid-row">
	<!-- two divs, spanning a total of 12 columns -->
	<div data-o-grid-colspan="8">A div, 8 columns wide</div>
	<div data-o-grid-colspan="4">Another div, 4 columns wide</div>
</div>
```

### Responsive column widths

A different number of columns can be specified for each size of layout individually:

```html
<div class="o-grid-row">
	<div data-o-grid-colspan="6 L8">
		Half by default, then 8 columns wide on Large layout and up
	</div>
	<div data-o-grid-colspan="6 L4">
		Half by default, then 4 columns wide on Large layout and up
	</div>
</div>
```

#### Using numbers

* `{0-12}` - number of columns to span by default
* `S{0-12}` - number of columns to span at the small layout and up
* `M{0-12}` - number of columns to span at the medium layout and up
* `L{0-12}` - number of columns to span at the large layout and up
* `XL{0-12}` - number of columns to span at the extra large layout and up

e.g. `<div data-o-grid-colspan="6 L8"></div>`

#### Using keywords<a name="keywords"></a>

* `hide`
* `one-half`
* `one-third`, `two-thirds`
* `one-quarter`, `three-quarters`

e.g. `<div data-o-grid-colspan="one-half Ltwo-thirds"></div>`

### Examples

A full width column for all sizes except large screens and up, where it spans on 9 columns:

```html
<div data-o-grid-colspan="L9"></div>
```

A half width column that becomes full-width on medium screens and up

```html
<div data-o-grid-colspan="one-half M12"></div>
```

A column which gradually takes up a greater portion of horizontal space as the screen gets smaller

```html
<div data-o-grid-colspan="4 M3 L2 XL1"></div>
```

A column which has width: auto on extra-small screens, and then takes half the available space on medium screens and up

```html
<div data-o-grid-colspan="M6"></div>
```

### Utilities

#### Hiding elements

e.g. `data-o-grid-colspan="Mhide Shide"` will hide the given element for medium and small screen sizes even if the element isn't laid out as a column

#### Centering a column

e.g. `data-o-grid-colspan="center Luncenter"` will `center` the column and `uncenter` it at Large (L) layout size.

```html
<div data-o-grid-colspan="center Luncenter"></div>
```

```scss
.my-column {
	@include oGridCenter;

	@include oGridRespondTo(L) {
		@include oGridUncenter;
	}
}
```

#### Push and pull columns

```html
<div data-o-grid-colspan="8 push4"></div>
<div data-o-grid-colspan="4 pull8"></div>

<div data-o-grid-colspan="L8 Lpush4"></div>
<div data-o-grid-colspan="L4 Lpull8"></div>
```

```scss

// Content is first in the source
.content {
	width: oGridColspan(8);
	@include oGridPush(4); // outputs left: -33.333333333%;
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	width: oGridColspan(4);
	@include oGridPull(8); // outputs right: -66.666666667%;
}
```

#### Add space before a column

```html
<div data-o-grid-colspan="8 offset4"></div>

<div data-o-grid-colspan="L8 Loffset4"></div>
```

```scss
.my-element {
	width: oGridColspan(8);
	@include oGridOffset(4); // outputs margin-left: 33.333333333%;
}
```

#### Snappy mode

In fluid mode (see `$o-grid-mode`), a set of rows may snap between fixed layouts as the viewport gets larger:

```html
<!-- Make one row snappy -->
<div class="o-grid-row o-grid-snappy"></div>

<!--Make multiple rows snappy -->
<div class="o-grid-snappy">
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
</div>
```

#### Compact, gutterless rows

To remove gutters from all columns in a row use the class `o-grid-row--compact`, e.g.

```html
<div class="o-grid-row o-grid-row--compact">
	<div data-o-grid-colspan="6">Look 'ma, no gutters</div>
	<div data-o-grid-colspan="6">Look 'pa, no gutters here either</div>
</div>
```

##### Fine-grained gutter removal

Remove gutters with these helper classes:

```html
<div class="o-grid-remove-gutters[--side][--layout]"></div>
<!-- Remove gutters -->
<div data-o-grid-colspan="one-half" class="o-grid-remove-gutters"></div>

<!-- Remove right gutters -->
<div class="o-grid-remove-gutters--right"></div>

<!-- Remove gutters for the small layout -->
<div data-o-grid-colspan="3" class="o-grid-remove-gutters--S"></div>

<!-- Remove left gutters for the large layout -->
<div class="o-grid-row o-grid-remove-gutters--left--L"></div>
```

```css
.o-grid-remove-gutters[--{left|right}][--{S|M|L|XL}]
```

Or, in Sass files, remove gutters on a row or a column using these helpers:

```scss
oGridRemoveGutters(); // Remove gutters on both sides
oGridRemoveGutters($side: 'left'); // Remove gutters on the left side
oGridRemoveGutters('right'); // Remove gutters on the right (`$side` is optional)
```

Example:

```scss
.my-component {
	// Remove gutters for all layouts
	@include oGridRemoveGutters();

	// Remove left gutter at Large layout size and up
	@include oGridRespondTo(L) {
		@include oGridRemoveGutters('left');
	}
	// Remove right gutter at eXtra Large layout size and up
	@include oGridRespondTo(XL) {
		@include oGridRemoveGutters('right');
	}
	// Remove left and right gutters until medium layout size
	@include oGridRespondTo($until: M) {
		@include oGridRemoveGutters();
	}
}
```


#### Responsive layout helper

```scss
@include oGridRespondTo($from, $until) {
	// Styles
}
```

To create styles that respond to the same breakpoints as the grid, this Sass mixin can be used to wrap the styles in the appropriate media query. It should be passed `S`, `M`, `L` or `XL` depending on which layout size the style should apply to e.g.

```scss
@include oGridRespondTo(S) {
	.o-example-module .item-subheading {
		font-size: 0.5em;
	}
}
.o-example-module .item-subheading {
	@include oGridRespondTo(XL) {
		color: red;
	}
}
.o-example-module .item-subheading {
	@include oGridRespondTo($until: L) {
		width: auto;
	}
}
```

It relies on [Sass MQ](http://git.io/sass-mq) to output mobile-first @media queries.


#### *Unstyle* a row or a column

```scss
.un-rowify {
	@include oGridResetRow;
}

.de-columnify {
	@include oGridResetColumn;
}
```

#### Variables

Some of the variables used by the grid (see [_variables.scss](https://github.com/Financial-Times/o-grid/blob/master/src/scss/_variables.scss)) can be used to customise the grid system.

Here are the most useful ones:

```scss
// Switch Silent mode off
$o-grid-is-silent: false;

// Show the currently active breakpoint and output loaded settings
$o-grid-debug-mode: true;

// Gutter size, in pixels
// Useful to use for spacing in product
$o-grid-gutter: 10px;

// Grid mode
// - fluid: full width until $o-grid-max-width (default: 1210px)
// - snappy: fluid width until the layout defined in $o-grid-start-snappy-mode-at (default: M),
//           and then snaps into a larger fixed layout at each breakpoint
//           (used by Next FT)
// - fixed: always fixed-width with the layout defined by
//          $o-grid-fixed-layout (default: L)
$o-grid-mode: fluid (default), snappy, fixed;

// Default layouts
$o-grid-layouts: (
	S:  490px,
	M:  730px,
	L:  970px,
	XL: 1210px
);
```

### JavaScript Helper

#### `getCurrentLayout()`

Returns the name of the layout currently displayed.

```js
var oGrid = require('o-grid/main');

console.log(oGrid.getCurrentLayout());
// > default, S, M, L, XL
```


### Grid Bookmarklet

1. Create a new Bookmark with this URL:
	```js
	javascript:(function(){var s=document.createElement("script");s.src="https://rawgit.com/Financial-Times/o-grid/master/bookmarklet/bookmarklet.js";document.head.appendChild(s);})();
	```

2. Load a website
3. Click the bookmarklet (the overlay should appear)
4. Check the alignment of the layout with the grid

![ ](https://cloud.githubusercontent.com/assets/85783/6125746/732fe9c0-b111-11e4-88d2-5031493cfec0.png)
