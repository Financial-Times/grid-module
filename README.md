# o-grid

## About

o-grid defines a 12 column responsive, nestable grid system for laying out HTML pages and modules.
It supports all browsers with support for *CSS @media queries*, with fixed-width fallback for older browsers.

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

[Report a bug](https://github.com/Financial-Times/o-grid/issues)

## Browser support
This module has been verified in Internet Explorer 7+, modern desktop browsers (Chrome, Safari, Firefox, ...) and mobile browsers (Android browser, iOS safari, Chrome mobile).

### Grid dimensions

#### General settings

* Minimum width: 240px
* Maximum width: 1330px
* Gutter width: 10px
* Number of columns: 12

#### Layouts:

* **Extra small (no layout name)** 240px - 489px
* **Small (S)** 490px - 729px
* **Medium (M)** 730px - 969px
* **Large (L)** 970px to 1209px
* **Extra large (XL)** 1210px

## General use

### Base classes
Grid styles are typically applied to the html using two types declaration:

* A `o-grid-row` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A `data-o-grid-colspan` attribute, added to the element intended to conform to the grid's columns.  
`data-o-grid-colspan=""` by itself floats an element to the left. Specific widths are specified by setting the value of the attribute (see below for more details)

So, for example

```html
<div class="o-grid-row">
	<div data-o-grid-colspan="6">A div spanning 6 grid columns</div>
</div>
```

### Specifying column widths

The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually.

```html
<div data-o-grid-colspan="{values}"></div>
```

* `{0-12}` - number of columns to span by default
* `S{0-12}` - number of columns to span at the small layout and up
* `M{0-12}` - number of columns to span at the medium layout and up
* `L{0-12}` - number of columns to span at the large layout and up
* `XL{0-12}` - number of columns to span at the extra large layout and up

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

`oGridRespondTo($from, $until)`

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

It relies on [sass-mq](http://git.io/sass-mq) to output mobile-first media queries.

#### Variables

All the variables used by the grid (see `src/scss/_variables.scss`) can be used in your own sass stylesheets but *must not* be overwritten at the component/module level.

```scss
// -------------------------------------------------------------------------------------
// Responsive behaviour configuration
// -------------------------------------------------------------------------------------

// Silent mode
$o-grid-is-silent: true;

// Mode: fluid (default), snappy (snaps between layouts), fixed
$o-grid-mode: 'fluid';

// Layout to default to when the grid has a fixed width
$o-grid-fixed-layout: 'L';

// When the grid start snapping between fixed-width layouts
// in the case where a row has the `o-grid-row--snappy` class
// or the grid mode is 'snappy'.
$o-grid-start-snappy-mode-at: 'M' !default;

// Turn the enhanced experience on / off
//
// When set to `false`, the core experience will be displayed
// (useful for debugging purposes)
$o-grid-enable-enhanced-experience: true;

// Show the currently active breakpoint and output loaded settings
$o-grid-debug-mode: false;


// -------------------------------------------------------------------------------------
// Grid settings and dimensions
// -------------------------------------------------------------------------------------

// Number of columns
$o-grid-columns: 12;

// Gutter size, in pixels
$o-grid-gutter: 10px;

// Minimum width, in pixels
$o-grid-min-width: 240px;

// Layouts
$o-grid-layouts: (
	S:  490px,
	M:  730px,
	L:  970px,
	XL: 1210px
);
```

### Gotchas

#### Fixed/Absolute positioning

Widths are specified in percentages, which will not work for fixed or absolute positioned elements (The grid can however be used to layout elements within an absolute/fixed position container). If you need to support fixed/absolutely position elements, or have developed your own solution, please leave a comment on the [GitHub issue](https://github.com/Financial-Times/o-grid-issues/issues/9).
