* don't use classes 'light', 'main', 'shadow', in your project as might collide with widget's settings on classes
* to avoid unwanted overlapping of textComponents change z-index of subElements using <layer> in CSS if necessary
* getBBox() on whole use
* use use.main.getBBox() to keep relation of text if splitting elements
* text STYLE on use, but letterSpacing, textAnchor on use.main !!
* text-length in CSS, but only works on class _3DText (so same for ALL instances)