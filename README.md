# o-grid

## About

o-grid defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all browsers with support for *css media queries*, with two sizes of fixed-width fallback for browsers that don't support them (specifically ie7/8).

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

[Report a bug](https://github.com/Financial-Times/o-grid-issues/issues)

### Grid dimensions

Four layout sizes are defined:

* **Small**  
For screen widths less than 600px wide, including pretty much all mobiles  
Top level grid rows are fluid, ranging from 240px to 600px in width

* **Medium**  
For screen widths between 600px and 1000px, small tablets and tablets in portrait mode  
Top level grid rows are a fixed 780px width

* **Large**  
For screen widths between 1000px and 1400px, larger tablets and desktop  
Top level grid rows are a fixed 960px width

* **Extra Large**  
For screen widths above 1400px, large desktop  
Top level grid rows are a fixed 1360px width

For each of these the available horizontal width is separated into 12 columns. In addition, for nested grids the parent box's width is divided into 12 columns

### Demos

In order to view the demos you will need to [install o-grid locally](#local-setup). To force the demos to respond to resizing of your desktop browser window you will need to enable [device metrics overrides](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation#emulate-device-viewports).

* [Responsive grid](grid-responsive.html)  *Use this for cross-device testing*  
    Demonstrates the behaviour of a page using the recommended installation of o-grid

* [Non-fluid grid](grid-non-fluid.html)  
    Demonstrates the behaviour of a page using a non-fluid version of the responsive grid

* [Resized grid](grid-resized.html)  
    Responsive grid with breakpoints reallocated to 400px, 800px and 1200px and gutters halved

* [Disabled breakpoint](grid-disabled.html)  
    Responsive grid with the extra large layout disabled

* [Always fixed](grid-always-fixed.html)  
    Fixed grid at 960px across all browsers and devices

*The following two demos mock behaviour of the grid when browsers meet certain conditions, and are included purely as a convenient resource for developers*

* [Always responsive grid](grid-always-responsive.html)  
    Responsive grid that responds to window rather than device width (mainly to make development easier)

* [Default grid](grid-default.html)  
    Fluid grid with max width of 600px - mocks behaviour if media queries not supported

* [Legacy grid](grid-legacy.html)  
    Fixed grid with width of 960px - mocks behaviour if media queries are not supported and the viewport is large enough for a desktop experience


## Installation

### For developers

1. Add the following to your module's bower dependencies
   
        "o-grid": "0.2.x"

2. Include the following in your app's styles

        // makes the grid respond to window rather than device width, so useful for development. 
        // For modules, and most products, this should be removed in production
        $o-grid-mq-type: width; 
        
        @import "o-grid/main.scss";  
  Make sure that `o-grid` is in your sass include path (see the [origami docs](http://financial-times.github.io/o-origami/docs/syntax/scss/) for more details). For products you can also simply use the [build service](http://financial-times.github.io/o-origami/docs/build-service/)

For other steps only relevant to product/page development see the [Product developers guide](#product-developers-guide)

###For designers

1. From terminal run the following commands (you will need to have [bower](http://bower.io/) already installed)

        cd /Users/{your username}/the/directory/your/protoype/is/in
        bower install http://git.svc.ft.com:9080/git/origami/o-grid.git

2. Include the responsive grid css file in your html prototype's `<head>` directly

        <link rel='stylesheet' href='bower_components/o-grid/docs/css/grid-responsive.css' /> 


### For testers

You must already have [git](http://git-scm.com/downloads) and [python](http://www.python.org/download/) installed to run o-grid's test pages locally (OSX normally has these installed by default)

1. Open an instance of terminal
2. `cd /the/directory/you/want/to/install/in`
3. `git clone http://git.svc.ft.com:9080/git/origami/o-grid.git`
4. Do one of the following
    * `cd o-grid/docs; python -m SimpleHTTPServer` and go to http://localhost:8000 in your browser (necessary to access the demos over wifi)
    * in finder open /the/directory/you/want/to/install/in/docs/index.html


The main test page is /grid-responsive.html and it should be tested across all available devices and browsers (resizing the window to test responsive behaviour). 

The other demo pages are to demonstrate other possible configurations and need only be checked on desktop.


## General use

### Base classes
Grid styles are typically applied to the html using two types of class declaration:

* An `o-grid-row` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* An `o-grid-col` class, added to the element intended to conform to the grid's columns.  
`o-grid-col` by itself floats and element to the left. To make it conform to the grid additional width rules need to be appended to it e.g. `o-grid-col|6|s12|` (see below for more details)  

So, for example

    <div class="o-grid-row">
        <div class="o-grid-col|6|">A div spanning 6 grid columns</div>
    </div>

### Specifying column widths
The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually, as well as a default number of columns. To do this append one or more 'subclasses' to the `o-grid-col` using the following structure:

    o-grid-col[|{default width}|][layout size identifier}{number of columns}|]

i.e. `o-grid-col` followed by an optional default width and widths for specific layouts, all separated (and trailed) by '|' characters, e.g. `o-grid-col|6|s12|xl4|`

### Layout size identifiers

* **s** - *Small* layout

* **m** - *Medium* layout

* **l** - *Large* layout

* **xl** - *Extra Large* layout

In general prefer to set the default for larger layouts and override for smaller ones as this means your module will probably display better if the grid is ever updated to allow additional larger layouts. If no default value is specified the element will simply take `width:auto` at any layout for which an explicic rule is not defined.

### Examples
    
    //A full width column for all sizes except large screens, where takes up 9 columns
    <div class="o-grid-col|12|xl9|"></div>  
  
    //A half width column for all sizes except small screens, where takes up full width
    <div class="o-grid-col|6|s12|"></div>  
  
    //A column which gradually takes up a greater portion of horizontal space as the screen gets smaller
    <div class="o-grid-col|s4|m3|l2|xl1|"></div>  

    //A column which has width:auto except on small screens, where it takes up half the available width
    <div class="o-grid-col|s6|"></div>  
  
### Utilities

#### Shorthand for single column layout
To avoid having to use the following inefficient markup

    <div class="o-grid-row">
       <div class="o-grid-col|12|">
       </div>
    </div>

The following markup can be used instead

    <div class="o-grid-row-col o-grid-col|12|">
    </div>

#### Hiding elements

e.g. `o-grid|mhide|shide|` will hide the given element for medium and small screen sizes even if the element isn't laid out as a column


#### Placeholder classes/`@extend`

[Placeholder classes](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholders) can be extended in your sass and enable styling of elements according to the grid without having to add classes to the html. *Note - don't use these inside a media query - the placeholder classes are already included within the appropriate media query*

##### Applying column layouts

These placeholders are of the format `%o-grid-{layout identifier}{number of columns|hide}` e.g.
        
        // hides secondary images on small and medium sized displays
        .main-article img:not(.primary) {
            @extend %o-grid-shide;
            @extend %o-grid-mhide;
        }

*In general use `o-grid-col|...` classes and only use `@extend` for cases where significant simplification of code is achieved or editing the templates is not possible. Be very careful your css does not become bloated as a result.*

##### Gutterless columns  
To remove either the left or the right gutter from a column extend these placeholders which have the following structure (the parts in square brackets are optional).

    %o-grid-no[-{left|right}]-gutter[-{s|m|l|xl}]

e.g. 

        // no left gutter at large and extra large layouts. No gutter at all at small size
        .my-component {
            @extend %o-grid-no-left-gutter-l;
            @extend %o-grid-no-left-gutter-xl;
            @extend %o-grid-no-gutter-s;
        }

        //No gutter at any size
        .my-other-component {
            @extend %o-grid-no-gutter;
        }  

#### Mixins
* `oGridRespondTo($layoutSize)`  
To create styles that respond to the same breakpoints as the grid this sass mixin can be used to wrap the styles in the appropriate media query. It should be passed `s`, `m`, `l` or `xl` depending on which layout size the style should apply to e.g.

        @include oGridRespondTo(s) {
            .o-example-module .item-subheading {
                font-size: 0.5em
            }
        }
More than one layout can be passed in at once (enabling applying the same styles to e.g. both extra large and large layouts). To do this combine the styles in a [list variable](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) beforehand.
        
        @include oGridRespondTo((l xl)) {
            .o-example-module .item-subheading {
                font-size: 0.5em
            }
        }

#### Variables
All the variables used by the grid (see src/scss/_variables.scss) can be used in your own sass stylesheets but *must not* be over-written at the component/module level.*


### Gotchas

#### 'Leaky' selectors
Using a different prefix instead of `o-grid-col`, e.g. `not-really|6|-a-column` will still apply the grid width so in general it's best to avoid classes which contain `|{letter}{number}|` or `|{number}|` in your module's class names. Conversely, don't use this feature/bug deliberately by using e.g. `o-mymodule|6|` to layout your module as this behaviour is just a side effect and not a supported feature

#### Fixed/Absolute positioning
The grid specifies widths in percentages, which will not work for fixed or absolute positioned elements (The grid can still be used to layout elements within an absolute/fixed position container). Currently supporting fixed/absolute positioning is considered out of scope. If you need to support fixed/absolutely position elements please leave a comment on the [github issue](https://github.com/Financial-Times/o-grid-issues/issues/9). If you develop your own solution to the problem (you'll probably need to use javascript) please leave a comment and it will be considered for inclusion in a future release. Be aware that if developing a solution for a module already/likely to be included in multiple projects your solution shouldn't assume that the configuration of the grid module will be consistent from product to product (see below).

## Product developers guide<a id="product-developers-guide" style="visibility:hidden">&nbsp;</a>

### Laying out entire pages with the grid
If your entire page is to be laid out using the grid add the class `o-grid-page` to the `body`/ wrapper and then build up the layout using nested rows and columns. The html head *must* include the following metatag (or equivalent) to disable user scaling

    <meta name="viewport" content="width=device-width, initial-scale=1">

### Including grid-based components in an existing, non-grid page

1. Wrap the entire component in an element with the class `o-grid-box` to ensure the module is laid out correctly. 

2. See the section below on *Things you can do (but in most cases probably shouldn't)* to make the grid's behaviour conform to the behaviour of the rest of the page's styles e.g. if your page isn't at all responsive you'll want to set `$o-grid-is-responsive: false` to prevent the component behaving in a responsive manner

### Supporting legacy browsers
By default, any browser that doesn't support media queries will be served the small layout. This can be over-ridden so the large layout is shown instead. The default for triggering this large fixed layout is ie7/8 on desktop, but this is configurable using one of two variables

* `$o-grid-fixed-layout-useragents: ie7 ie8 !default` - useragent names compatible with [o-useragent](http://git.svc.ft.com/tree/origami%2Fo-useragent.git/HEAD)
* `$o-grid-fixed-layout-selector: null !default` - css selector. If specified will be used instead of the useragent targeting

#### Box sizing in ie7
For ie7 the `boxsizing.htc` polyfil provided by [o-useragent](http://git.svc.ft.com/tree/origami%2Fo-useragent.git/HEAD) is also needed. See [o-assets](http://git.svc.ft.com/tree/origami%2Fo-assets.git/HEAD) for details of how to configure the path to this file.

### Things you *can* do (but in most cases probably shouldn't)
The grid is quite easy to configure by overwriting the default values of many of the sass variables. To do so simply specify a value for the given variable before you include o-grid's main.scss file. A few notable uses are as follows:

#### Changing how responsive the grid is
The following flags can be used to change the responsive behaviour *\[defaults in square brackets\]*

* `$o-grid-is-responsive`: \[true\] If set to false only the default is used. This greatly reduces the stylesheet file size and should be used for mobile only products
* `$o-grid-is-fluid`: \[false\] Switches to fully fluid layouts
* `$o-grid-is-fixed-desktop`: \[false\] Forces the site to always use the large layout
* `$o-grid-fixed-layout-selector`: \[$lt-ie9\] Can be set to any class/selector so that the layout can be enabled for criteria other than the browser being ie7/8
* `$o-grid-mq-type` : \[device-width\] By default only responds to device rather than window width. To change this set this variable to `width`

#### Resizing the grid
By overwriting the values of any of the `$...Width`, `$...Break` or `$...Gutter` variables the width and spacing of the grid at any of the layout sizes can be decreased or increased as required

#### Disabling larger layouts
By setting the value of a breakpoint (`$o-grid-small-to-medium-break`, `$o-grid-medium-to-large-break` or `$o-grid-large-to-extra-large-break`) to `false` the breakpoint is disabled, and its styles will not be included. *This only works when disabling a breakpoint **and** all those larger than it so, e.g. `$o-grid-medium-to-large-break: false;` will have unexpected efects on your layout unless you also specify `$o-grid-large-to-extra-large-break: false;`.*

## Developing o-grid

### TDD
The demo pages (docs/grid-{grid-type}.html) are intended to perform a similar role to unit tests i.e. they contain examples which cover all significant variants of applying the grid's classes. Therefore a TDD/BDD approach can be taken to fixing bugs/adding functionality by first adding a representative failing example to these pages and afterwards writing the code to fix it.

#### Adding an example to all demo pages
Add a new object literal to `docs-generator/examples.json` with the following properties

* description: Description of how the elemnts in this grid should behave at various screen sizes 
* title: Short description of what this example is intended to illustrate,
* wrapper *[optional]*: Object defining the html to wrap the columns in (defaults to `<div class="o-grid-page"><div class="o-grid-row">{columns}</div></div>`)
    * start: html to insert before the columns (opening tags)
    * end: html to insert after the columns (closing tags)

and one of the following:

* columns: A (possibly nested) array of objects each of which is either  
    * An object of the form `{"tagname": "class"}`
    * An object of the form `{"columns": [An array of the same format as this one]}`
* rows: An array of 'columns' arrays (as defined above)

Then in terminal run `grunt`
    
#### Adding a new demo page
1. Choose a one word name for your new demo page (let's call it 'widescreen' in this example)
2. Create a new file `src/scss/bundles/widescreen.scss`
3. Edit the contents of `widescreen.scss` to include the styles you need. You'll probably want to start it off with the content

        @import "default.scss";
        @import "../components/grid-responsive.scss";
        @import "../components/grid-fixed.scss";

4. Edit docs-generator/partials/head.hbs to include the correct stylesheet & classes when the variable `widescreen` is truthy (i.e wrap in `{{#widescreen}}{{\widescreen}}`)
5. In Gruntfile.js append `widescreen` to ` demoPageTypes`
6. Add a link to the demo page to the demos section of `README.md`
7. In terminal run the command `grunt`


### Pre-release steps
* Comment any new mixins/functions in the sass
* Re-write `README.md` to reflect your changes
* Run `grunt` (to republish the docs)
* After commiting add a tag as follows and push (TODO - needs reviewing)
    * increment the patch version for bug fixes
    * increment the minor version for changes to the grid's appearance
    * increment the major version for changes to how modules should implement the grid