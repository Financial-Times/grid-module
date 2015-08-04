# o-grid [![Build Status](https://travis-ci.org/Financial-Times/o-grid.svg?branch=master)](https://travis-ci.org/Financial-Times/o-grid)

A 12 column responsive grid system for laying out documents, templates and modules.

> Living off the grid and being kind of an outlaw brings a dangerous reality.  *Ron Perlman*

[![Grid system](https://rawgit.com/Financial-Times/o-grid/master/img/grid-system.png)](https://rawgit.com/Financial-Times/o-grid/master/img/grid-system.png)

## Quick Start

Using the [Origami Build Service](https://build.origami.ft.com/v1/):

```html
<head>
	…
	<link rel="stylesheet" href="https://build.origami.ft.com/bundles/css?modules=o-grid@^3.0.0" />
</head>
```

Or, to install it manually:

```sh
bower install o-grid --save
```

```scss
// your-app/main.scss
$o-grid-is-silent: false;
@import 'o-grid/main';
```

```js
// your-app/main.js
var getCurrentLayout = require('o-grid').getCurrentLayout;

// Return the current layout (e.g. default, S, M, L, XL)
console.log(getCurrentLayout());
```

## Browser support

o-grid works in browsers that support *CSS @media queries* and *box-sizing*, as well as Internet Explorer 8.

Older browsers: you may use a [box-sizing polyfill](https://github.com/Schepp/box-sizing-polyfill) to support give better support to IE < 8.

## Grid dimensions

### General settings

* Minimum width: 240px
* Maximum width: 1210px
* Gutter width: 10px
* Number of columns: 12

### Layout sizes

* **Default (no layout name)** 240px - …
* **Small (S)** 490px - 729px
* **Medium (M)** 730px - 969px
* **Large (L)** 970px to 1209px
* **Extra large (XL)** 1210px

## Quick start

### Utility classes

```html
<div class="o-grid-row">
	<!-- two divs, spanning a total of 12 columns -->
	<div data-o-grid-colspan="8">A div, 8 columns wide</div>
	<div data-o-grid-colspan="4">Another div, 4 columns wide</div>
</div>
```

### Responsive columns

Set a number of columns per layout:

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

```scss
div {
	@include oGridRow();

	> div {
		// Half by default, then 8 columns wide on Large layout and up
		@include oGridColumn((default: 6, L: 8));
	}
	> div + div {
		// Half by default, then 4 columns wide on Large layout and up
		@include oGridColumn((default: 6, L: 4));
	}
}
```

#### Using numbers

* `{0-12}` - number of columns to span by default
* `S{0-12}` - number of columns to span at the small layout and up
* `M{0-12}` - number of columns to span at the medium layout and up
* `L{0-12}` - number of columns to span at the large layout and up
* `XL{0-12}` - number of columns to span at the extra large layout and up

```html
<div data-o-grid-colspan="6 L8"></div>
```

```scss
div { @include oGridColumn((default: 6, L: 8)); }
```

#### Using keywords<a name="keywords"></a>

* `hide`
* `one-half`
* `one-third`, `two-thirds`
* `one-quarter`, `three-quarters`

```html
<div data-o-grid-colspan="one-half Ltwo-thirds"></div>
```

```scss
div { @include oGridColumn((default: one-half, L: two-thirds)); }
```

### Examples

A full width column for all sizes except large screens and up, where it spans on 9 columns:

```html
<div data-o-grid-colspan="full-width L9"></div>
```

```scss
div { @include oGridColumn((default: full-width, L: 9)); }
```

A half width column that becomes full-width on medium screens and up:

```html
<div data-o-grid-colspan="one-half M12"></div>
```

```scss
div { @include oGridColumn((default: one-half, M: 12)); }
```

A column which gradually takes up a greater portion of horizontal space as the screen gets smaller:

```html
<div data-o-grid-colspan="4 M3 L2 XL1"></div>
```

```scss
div { @include oGridColumn((default: 4, M: 3, L: 2, XL: 1)); }
```

A column which has `width: auto` on small screens, and then takes half the available space on medium screens and up:

```html
<div data-o-grid-colspan="M6"></div>
```

```scss
div { @include oGridColumn((M: 6)); }
```

## Advanced usage

### Utilities

#### Hiding elements

`hide` the column, show it again at Large (`L`) layout size, and hide it at the largest (`XL`) layout size:

```html
<div data-o-grid-colspan="hide L12 XLhide"></div>
```

```scss
div { @include oGridColumn((default: hide, L: 12, XL: hide)); }
```

#### Centering a column

`center` the column and `uncenter` it at Large (`L`) layout size:

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
```

```scss
// Content is first in the source
.content {
	@include oGridColumn(8);
	@include oGridPush(4); // outputs left: -33.333333333%;
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	@include oGridColumn(4);
	@include oGridPull(8); // outputs right: -66.666666667%;
}
```

Responsively:
```html
<div data-o-grid-colspan="L8 Lpush4"></div>
<div data-o-grid-colspan="L4 Lpull8"></div>
```

```scss
// Content is first in the source
.content {
	@include oGridColumn((L: 8));
	@include oGridRespondTo(L) {
		@include oGridPush(4); // outputs left: -33.333333333%;
	}
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	@include oGridColumn((L: 4));
	@include oGridRespondTo(L) {
		@include oGridPull(8); // outputs right: -66.666666667%;
	}
}
```



#### Add space before a column

```html
<div data-o-grid-colspan="8 offset4"></div>

<div data-o-grid-colspan="L8 Loffset4"></div>
```

```scss
div {
	@include oGridColumn(8);
	@include oGridOffset(4); // outputs margin-left: 33.333333333%;
}

div {
	@include oGridColumn((L: 8));

	@include oGridRespondTo(L) {
		@include oGridOffset(4); // outputs margin-left: 33.333333333%;
	}
}
```

#### Snappy mode

In fluid mode (see `$o-grid-mode`), a set of rows may snap between fixed layouts as the viewport gets larger:

```html
<!-- Make one row snappy -->
<div class="o-grid-row o-grid-row--snappy"></div>

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

#### Fine-grained gutter removal

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

#### Responsive column helper

For simplicity, examples below don't show the output code that brings support for Internet Explorer.

##### Give column properties to an element

```scss
el { @include oGridColumn(); }
```

Outputs:

```css
el {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  box-sizing: border-box;
}
```

##### Give a width to an element

```scss
el { @include oGridColumn($span: 4); }
```

Outputs:
```css
el {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  box-sizing: border-box;
}
@media only screen {
  el {
    width: 33.33333%;
  }
}
```

##### Responsive width for different layouts

```scss
el {
	@include oGridColumn((
		default: full-width,
		M: 6
	));
}
```

Outputs:

```css
el {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  box-sizing: border-box;
}
@media only screen {
  el {
    display: block;
    width: 100%;
  }
}
@media (min-width: 45.625em) {
  el {
    display: block;
    width: 50%;
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
// - fluid: full width up to the largest layout's width
// - snappy: fluid width until the layout defined in $o-grid-start-snappy-mode-at (default: M),
//           and then snaps into a larger fixed layout at each breakpoint
//           (used by Next FT)
// - fixed: always fixed-width with the layout defined by
//          $o-grid-fixed-layout (default: L)
$o-grid-mode: fluid (default) | snappy | fixed;

// Default layouts
$o-grid-layouts: (
	S:  490px,
	M:  730px,
	L:  970px,
	XL: 1210px
);
```

#### Adding a layout

Products who need to add other breakpoints/layouts should use the helper `oGridAddLayout()`:

```scss
@import 'o-grid/main';

// Add various layouts
@include oGridAddLayout($layout-name: XS, $column-width: 20px);
@include oGridAddLayout($layout-name: P, $column-width: 36px);
@include oGridAddLayout($layout-name: D, $layout-width: 300px);

// Layouts are now:
//   D: 300px,
//   XS: 370px,
//   S: 490px,
//   P: 562px,
//   M: 730px,
//   L: 970px,
//   XL: 1210px

// Surface the layout currently displayed to make it readable in JS
@include oGridSurfaceCurrentLayout;

// Generate grid helpers classes and data attributes
@include oGridGenerate;
```

#### Debug mode

Enable debug mode to see the currently active breakpoint in the top-right corner of the page (based on [sass-mq's show-breakpoints](https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint) feature).

```scss
$o-grid-debug-mode: true;
```

![show-breakpoints demo](https://raw.githubusercontent.com/sass-mq/sass-mq/65b00c7be6dba7de24173cc445eec7aaca036ceb/show-breakpoints.gif)

## JavaScript Helper

### `getCurrentLayout()`

Returns the name of the layout currently displayed. This does **not** work in silent mode.

```js
var oGrid = require('o-grid/main');

console.log(oGrid.getCurrentLayout());
// > default | S | M | L | XL
```

## Grid Bookmarklet

1. Create a new Bookmark with this URL:
	```js
	javascript:(function(){var s=document.createElement("script");s.src="https://rawgit.com/Financial-Times/o-grid/master/bookmarklet/bookmarklet.js";document.head.appendChild(s);})();
	```

2. Load a website
3. Click the bookmarklet (the overlay should appear)
4. Check the alignment of the layout on the grid

![ ](https://cloud.githubusercontent.com/assets/85783/6125746/732fe9c0-b111-11e4-88d2-5031493cfec0.png)

----

## How to upgrade from 2.x.x?

- Layouts are now mobile first. It means that the `S` reads "S layout and up" instead of "S layout only". For example, the equivalent of `<div data-o-grid-colspan="6 S12 M12">` (old) is `<div data-o-grid-colspan="6 S12 L6">` (new)
- Placeholder selector `@extend %o-grid-…` are deprecated. Use the equivalent mixins instead
- `<div class="o-grid-row" o-grid-colspan="12">` is deprecated (a row can't be a column at the same time). Use two elements instead
- Search `oGridColumnWidth` and replace with `oGridColspan`
- Search `o-grid-row-compact` and replace with `o-grid-row--compact`

----

## License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
