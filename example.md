# My Story

_By J. Doe_

A thrilling tale of adventure and choices.

The story file begins with a first level heading containing the title.

* [Begin](#start)

---

## Start

This is the first page. A story file is written in [Markdown][]. Each page
begins with a second level heading `##` and ends with a horizontal rule `---`.
The horizontal rule must be written using hyphens.

* [Another Page]

[Markdown]: https://daringfireball.net/projects/markdown/

-------

## Another Page

Choices for each page may be formatted as an unordered list of links. The link
text is enclosed in square brackets `[]`. Choices that have the same name as a
page heading will open that page.

To open a page with a different heading than the choice text, include the ID of
the page heading in parentheses like so: `(#heading-id)`. The ID of a heading is
the same as the heading text using lower case letters and replacing spaces with
hyphens `-`. Avoid using "Cover" as a page heading - it is used internally for
the cover page.

* [Choice 1]
* [A Second Choice](#choice-2)

-----

## Choice 1

Choices can go to any page. The second choice here goes backwards in page order.

Choices do not have to be formatted as a list, they can also be used inline.
From here you can go to [The End](#end) or back to [Another Page].

---

## Choice 2

This page is one ending because it has no choices. Readers can still go back to
the previous page, or to the cover page to start over.

### Note

Pages **can** _contain_ any `Markdown` formatting or elements.

1. They can include
2. ordered lists

_or_

* Unordered
* lists

******

Horizontal rules can be used on a page, but they must be written with asterisks
`*` or undersctores `_`.

---

## The End {#end}

This is an ending page and the last page in the story file. The last page must
end with a horizontal rule `---`.

The heading on this page shows how to set a custom ID, by following the heading
curly braces like so: `{#id}`

::[**The End**]{.center .large}

---
