exports.getExamples = function () {
	"use strict";
	var examples = [

		{
			title: "The 12 column grid",
			description: "The grid is made up of 12 virtual columns. Actual columns can span 1 to 12 virtual columns.",
			columns: [{ span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }, { span: "d1" }]
		},

		{
			title: "Two equal columns",
			description: "Two divs, each spanning 6 columns.",
			columns: [{ span: "d6" }, { span: "d6" }]
		},

		{
			title: "Three equal columns",
			description: "Three divs, each spanning 4 columns.",
			columns: [{ span: "d4" }, { span: "d4" }, { span: "d4" }]
		},

		{
			title: "Four equal columns",
			description: "Four divs, each spanning 3 columns.",
			columns: [{ span: "d3" }, { span: "d3" }, { span: "d3" }, { span: "d3" }]
		},

		{
			title: "A large and small column",
			description: "Two divs, spanning 9 and 3 columns.",
			columns: [{ span: "d9" }, { span: "d3" }]
		},

		{
			title: "A large and small column",
			description: "Two divs, spanning 7 and 5 columns.",
			columns: [{ span: "d7" }, { span: "d5" }]
		},

		{
			title: "Using nesting to create more complex layouts",
			description: "Divs can be broken down into a further 12 columns, by nesting another <code>grid-row</code> containing more <code>grid-col</code>s",
			columns: [
				{
					span: "d8",
					columns: [{ span: "d4" }, { span: "d4" }, { span: "d4" }]
				},
				{
					span: "d4",
					columns: [{ span: "d6" }, { span: "d6" }]
				}
			]

		},

		{
			title: "Variable column spans",
			description: "These columns are set to default to 12 columns (full width), but span 6 at the large mode, and 4 at the extra-large mode.",
			columns: [{ span: "d12-xl3-l6" }, { span: "d12-xl3-l6" }, { span: "d12-xl3-l6" }, { span: "d12-xl3-l6" }]
		},

		{
			title: "Usage on existing pages",
			description: "The grid can be applied within components on a page which doesn't use grid-module for its global layout by wrapping in a container with class <code>ft-grid-box</code>",
			wrapper: {
				start: "<div style=\"max-width: 700px; min-width: 300px; margin:auto; background:#ccc;\"><div class=\"ft-grid-box\"> ",
				end: "<div style=\"clear:both\"></div></div>"
			},
			columns: [
				{
					span: "d8-s12",
					columns: [{ span: "d4" }, { span: "d4" }, { span: "d4" }]
				},
				{
					span: "d4-s12"
				}
			]
		},

		{
			title: "Complex variable layouts",
			description: "Complex layouts can be created by using variable column spans in combination with nesting.",
			columns: [
				{
					span: "d8",
					columns: [{
						span: "d2-m12-s12",
						columns: [{ span: "d12-m4-s4" }, { span: "d12-m4-s4" }, { span: "d12-m4-s4" }]
					}, {
						span: "d8-m10-s12",
						minHeight: "210px"
					}, {
						span: "d2-s12"
					}]
				},
				{
					span: "d4",
					minHeight: "250px"
				}
			]
		}



	];
	return examples;
};