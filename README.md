#grid-module

##About

grid-module defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all browsers with support for *css media queries*, with a fixed-width fallback for browsers that don't support them (specifically ie7/8).

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

###Grid dimensions

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

###Demos

*In order to view the demos you will need to [install grid-module locally](#local-setup)*

* [Responsive grid](grid-responsive.html)  
    Demonstrates the behaviour of a page using the recommended installation of grid-module

* [Fluid grid](grid-fluid.html)  
    Demonstrates the behaviour of a page using a fully fluid version of the responsive grid

* [Default grid](grid-default.html)  
    Fluid grid with max width of 600px - mocks behaviour if media queries not supported

* [Legacy grid](grid-legacy.html)  
    Fixed grid with width of 960px. Should be loaded if media queries are not supported and the viewport is large enough.

* [Resized grid](grid-resized.html)  
    Responsive grid with breakpoints reallocated to 400px, 800px and 1200px

* [Disabled breakpoint](grid-disabled.html)  
    Responsive grid with the extra large layout disabled

##Installation

###For developers

1. Add the following to your module's bower dependencies
   
        "grid-module": "0.2.x"

2. Include the following in your app's styles 

        @import '/path/to/bower/grid-module/main.scss';  
  Depending on whether you're developing a product or a component where exactly you put this will vary. For a product you can also simply use the [build service](http://financial-times.github.io/ft-origami/docs/build-service/)

For other steps only relevant to product/page development see the [Product developers guide](#product-developers-guide)

###For designers

1. From terminal run the following commands (you will need to have [bower](http://bower.io/) already installed)

        cd /Users/{your username}/the/directory/your/protoype/is/in
        bower install http://git.svc.ft.com:9080/git/origami/grid-module.git

2. Include the responsive grid css file in your html prototype's ``<head>`` directly

        <link rel='stylesheet' href='bower_components/grid-module/docs/css/grid-responsive.css' /> 



##General use

###Base classes
Grid styles are typically applied to the html using two types of class declaration:

* An ``ft-grid-row`` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* An ``ft-grid-col`` class, added to the element intended to conform to the grid's columns.  
``ft-grid-col`` by itself does virtually nothing and needs to have specific width rules appended to it e.g. ``ft-grid-col-d6-s12`` (see below for more details)  

So, for example

    <div class="ft-grid-row">
        <div class="ft-grid-col-d12">A full width column</div>
    </div>


###Specifying column widths
The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually, as well as a default number of columns. To do this append one or more 'subclasses' to the ``ft-grid-col`` class in the following format: 

    -{layout size identifier}{number of columns}

e.g. ``ft-grid-col-d6-s12-xl4``

###Layout size identifiers

* **s** - *Small* layout (use sass variable ``$ftGridSmall``)

* **m** - *Medium* layout (use sass variable ``$ftGridMedium``)

* **l** - *Large* layout (use sass variable ``$ftGridLarge``)

* **xl** - *Extra Large* layout (use sass variable ``$ftGridExtraLarge``)

* **d** - *Default [required unless all four of the above are specified]* (use sass variable ``$ftGridDefault``)
 
In general prefer to set the default for larger layouts and override for smaller ones as this means your module will probably display better if the grid is ever updated to allow additional larger layouts.


###Examples
    
    //A full width column for all sizes except large screens, where takes up 9 columns
    <div class="ft-grid-col-d12-xl9"></div>  
  
    //A half width column for all sizes except small screens, where takes up full width
    <div class="ft-grid-col-d6-s12"></div>  
  
    //A column which gradually takes up a greater portion of horizontal space as the screen gets smaller
    <div class="ft-grid-col-s4-m3-l2-xl1"></div>  
  
###Utilities

####classes
* ``ft-grid-box``  
When using a grid-module based component in a product/page that isn't laid out using grid-module wrap the entire component in an element with the class ``ft-grid-box`` to ensure the module is laid out correctly using the grid

* ``hide``  
e.g. ``grid-mhide-shide`` will hide the given element for medium and small screen sizes even if the element isn't laid out as a column

####mixins
* ``ftGridRespondTo($layoutSize)`` 
To create styles that respond to the same breakpoints as the grid this sass mixin can be used to wrap the styles in the appropriate media query. It should be passed ``$ftGridSmall``, ``$ftGridMedium``, ``$ftGridLarge`` or ``$ftGridExtraLarge`` depending on which layout size the style should apply to e.g.

        @include ftGridRespondTo($ftGridSmall) {
            .ft-example-module .item-subheading {
                font-size: 0.5em
            }
        }

* ``wrapInSelector($selector)``  
Wraps a block of styles in the given selector (or just outputs the styles unwrapped if the ``$selector`` is undefined)

####variables
All the variables used by the grid (see src/scss/_variables.scss) can be used in your own sass stylesheets but *should never be over-written at the component/module level.*


###Gotchas

* Using a different prefix instead of ``ft-grid-col``, e.g. ``not-really-d6-a-column`` will still apply the grid width so in general it's best to avoid classes which contain ``-{letter}{number}`` in your module's class names. Conversely, don't use this feature/bug deliberately by using e.g. ``ft-mymodule-d6`` to layout your module as this behaviour is just a side effect and not a supported feature

##Product developers guide<a id="product-developers-guide" style="visibility:hidden">&nbsp;</a>

###Supporting legacy browsers
To support ie7 & ie8 it's recommended you use the following conditional comments.

    <!--[if IE 7]> <html class="no-js ie7 lt-ie9"> <![endif]-->
    <!--[if IE 8]> <html class="no-js ie8 lt-ie9"> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

If your product/page already has other classes enforced for ie7/8 detection you can pass these in to the sass by including the following in your sass *before* including grid-module's main.scss

    $ftGridFixedLayoutSelector: '{A selector which will target both ie7 & ie8}';

####Boxsizing in ie7
For ie7 you must also specify an absolute path pointing to ``/path/to/bower/grid-module/polyfills`` as a value for ``$ftGridPathToPolyfills`` in your sass (or, if using the [build service](http://financial-times.github.io/ft-origami/docs/build-service/) (and hence not having access to sass) use a method of your choice to point the default path ``/polyfills/boxsizing.htc`` to ``/path/to/bower/grid-module/polyfills/boxsizing.htc``)

###Things you *can* do (but in most cases probably shouldn't)
The grid is quite easy to configure by overwriting the default values of many of the sass variables. To do so simply specify a value for the given variable before you include grid-module's main.scss file. A few notable uses are as follows:

####Changing how responsive the grid is
The following flags can be used to change the responsive behaviour *\[defaults in square brackets\]*

* ``$ftGridIsResponsive``: \[true\] If set to false only the default is used. This greatly reduces the stylesheet file size and should be used for mobile only products
* ``$ftGridIsFluid``: \[false\] Switches to fully fluid layouts
* ``$ftGridIsFixedDesktop``: \[false\] Forces the site to always use the large layout (if ``$ftGridIsResponsive`` is true then this value is ignored)
* ``$ftGridFixedLayoutSelector``: \[$lt-ie9\] Can be set to any class/selector so that the layout can be enabled for criteria other than the browser being ie7/8

####Resizing the grid
By overwriting the values of any of the ``$...Width`` or ``$...Break`` variables the width of the grid at any of the layout sizes can be decreased or increased as required

####Disabling larger layouts
By setting the value of a breakpoint (``$ftGridSmallToMediumBreak``, ``$ftGridMediumToLargeBreak`` or ``$ftGridlargeToXlBreak``) to ``false`` the breakpoint is disabled, and its styles will not be included. *This only works when disabling a breakpoint **and** all those larger than it so, e.g. ``$ftGridMediumToLargeBreak: false;`` will have unexpected efects on your layout unless you also specify ``$ftGridlargeToXlBreak: false;``.*

##Developing grid-module

###BDD/TDD
The demo pages (docs/grid-{grid-type}.html) are intended to perform a similar role to unit tests i.e. they contain examples which cover all significant variants of applying the grid's classes. Therefore a TDD/BDD approach can be taken to fixing bugs/adding functionality by first adding a representative failing example to these pages and afterwards writing the code to fix it.

####Adding an example to all demo pages
Add a new object literal to ``docs-generator/examples.json`` with the following properties

* columns: A (possibly nested) array of objects each of which is either  
    * An object of the form ``{"tagname": "class"}``
    * An object of the form ``{"columns": [An array of the same format as this one]}``
* description: Description of how the elemnts in this grid should behave at various screen sizes 
* title: Short description of what this example is intended to illustrate,
* wrapper *[optional]*: Object defining the html to wrap the columsn in (defaults to ``<div class="ft-grid-row">{columns}</div>``)
    * start: html to insert before the columns (opening tags)
    * end: html to insert after the columns (closing tags)

Then in terminal run ``grunt``
    
####Adding a new demo page
1. Choose a one word name for your new demo page (let's call it 'widescreen' in this example)
2. Create a new file ``src/scss/bundles/widescreen.scss``
3. Edit the contents of ``widescreen.scss`` to include the styles you need. You'll probably want to start it off with the content

        @import "default.scss";
        @import "../components/grid-responsive.scss";
        @import "../components/grid-fixed.scss";

4. Edit docs-generator/partials/head.hbs to include the correct stylesheet & classes when the variable ``widescreen`` is truthy (i.e wrap in ``{{#widescreen}}{{\widescreen}}``)
5. In Gruntfile.js append ``widescreen`` to `` demoPageTypes``
6. In terminal run the command ``grunt``


###Pre-release steps
* Comment any new mixins/functions in the sass
* Re-write ``README.md`` and ``CONTRIBUTING.md`` to reflect your changes
* Run grunt (to republish the docs)
* After commiting add a tag as follows and push (TODO - needs reviewing)
    * increment the patch version for bug fixes
    * increment the minor version for changes to the grid's appearance
    * increment the major version for changes to how modules should implement the grid


##Testing grid-module

###Running the demo pages and docs locally<a id="local-setup" style="visibility:hidden">&nbsp;</a>

You must already have [git](http://git-scm.com/downloads) and [python](http://www.python.org/download/) installed to run grid-module's test pages locally (OSX normally has these installed by default)

1. Open an instance of terminal
2. ``cd /the/directory/you/want/to/install/in``
3. ``git clone http://git.svc.ft.com:9080/git/origami/grid-module.git``
4. Do one of the following
    * ``cd grid-module/docs; python -m SimpleHTTPServer`` and go to http://localhost:8000 in your browser
    * in finder open /the/directory/you/want/to/install/in/docs/index.html


The main test page is /grid-responsive.html and it should be tested across all available devices and browsers (resizing the window to test responsive behaviour). 

The other demo pages are to demonstrate other possible configurations and need only be checked on desktop.
