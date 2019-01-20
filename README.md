@frontarm/doc
==================

> A set of components for creating rich, responsive documents built around MDX.

[![NPM](https://img.shields.io/npm/v/@frontarm/doc.svg)](https://www.npmjs.com/package/@frontarm/doc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @frontarm/doc
```


Design notes
-----

- Styles are designed with the assumption that there'll be 250px of sidebar on windows with width of 1101px or up.

- This library is pretty raw, and you can break things by messing with the styles on
  blocks, asides, and gutters. Unfortunately, you need can't escape messing with the styles on blocks.
  so think of this more as a shitty but useful tool for creating websites with documents with a
  two-column layout -- not a self-contained library that is useful for specifying documents without
  any other work. You *will* probably need to use media queries in your theme. You *will* need to
  be careful of your use of "margin". Global margin styles *will* make your life miserable.
  

Main Components
---------------

### `<Doc>`

Expects an MDX component as its `MDXComponent` prop.

Like MDX components, the components that are used to render each type of Document component can be configured, either by passing in a `components` object to your `<Doc>` component, or by using a `<DocProvider>` component.

#### `props

- `MDXComponent`

  The MDX Document component to render.

- `props?: any`

  Props that will be passed through to the rendered MDXComponent

- `demoboardHelpers?: { [name: string]: string }`

  Helper files that will be available to all inline demoboards

- `canAccessRestrictedContent?: boolean`

  If true, any editors/videos with the `isRestricted` attribute will be usable

- `isStatic?: boolean`

  If true, any nested `<HideWhenStatic>` blocks will not be shown.


### `<DocProvider components children>`

Merges in default values for the `components` object of any child `<Component>` elements.


Content Components
------------------

### `<Beware children title="Beware">`

Indicates content that helps the reader from hurting themselves or losing a large amount of time.

Assumes placement within the left column.

### `<Demoboard ...>`

Renders an inline demoboard.

#### `props`

- `persistenceKey`

  If present, any changes will be saved for each user, and loaded when the user navigates back to the page. This key will not be visible to the user, and should be unique across the entire site. It should follow the format `path#keyWithinPage`. A warning will be logged if the path doesn't map to the current path, or if multiple keys are used on the same page.

- `restricted`

  If true, readers won't be able to use the demoboard unless `canAccessRestrictedContent` is also passed to the parent `<Document>` element.

- `sources`

  Accepts a list of sources, with magic sources prefixed by `magic:`, and solution sources prefixed by `solution:`.

  *Future plan: create a loader that allows an entire directory to be smashed in here with a single `require()`...*

- `theme?: "dark" | "light"`

- `maximizeLeftPanel?: boolean`: *defaults to `true`*
- `maximizeRightPanel?: boolean`: *defaults to `false`*
- `leftPanel?: 'transformedSource' | 'solutionSource'`
- `lineCount?: number`
- `rightPanel?: 'console'`
- `tab?: 'editor' | 'viewer'`

### `<Details children title=null>`

Can be placed in either the left or right columns.

### `<Spoiler children title="Spoiler">`

Assumes placement within the left column.

### `<Tangent children title=null>`

Assumes placement within the right column.

### `<Video ...>`

Can be placed anywhere; the left column, right column, both columns or full width are all allowable.

#### `props`

- `TODO`

- `restricted`

  If true, readers won't be able to use the demoboard unless `canAccessRestrictedContent` is also passed to the parent `<Document>` element.


Layout Components
-----------------

Layout components are not configurable

### `<Doc.Block children>`

Renders a block of content in the left column.

### `<Doc.Aside children>`

Floats a block of content right of the following columns, similar to how floats in CSS work, but
can be raise up to the position of the top of the wrapping `<AsideTop>` div.

```
TODO: format this info better:


"Block" (gutterless?):

- center align on single column
- left align on twin column
- add a gutter (i.e. minimum left/right spacing around the element) if one isn't specified around it,
  unless "gutterless?" is specified.
- can *not* have margins added to it, as content needs to have left/right margin of "auto"
  to accomodate horizontal centering without a container, which would (I think) break floated asides
  and full width stuff


"Aside"/"Float":

- will center align on single column, with extra spacing compared to "Block" to accomodate a gutter
- will float right on twin column
- can only have margins added to it when not centered.

  - nested "Block" will have a gutter added, but it can be wrapped in other
    styles and have margins added


"Gutter" (half?) (left?) (right?):

- add a minimum left/right spacing around the element
- can not have margins added to it
- is useful for adding spacing around full-width and aside elements 

  - nested "Block" will have its gutter replaced by this block
```


Conditional Rendering Components
--------------------------------

### `<Doc.HideWhenStatic children>`

Hides its children when the document is being statically built -- useful for parts of the document that vary between guest and pro members.

### `<Doc.Restricted restricted? children>`

Show the children only when the viewer has full access to the Doc. If the viewer doesn't have full access, show the `restricted` element instead.


Code blocks
-----------

When Markdown code blocks begin with the line `//---`, they'll be turned into `<Doc.Demoboard>` elements. Otherwise, they'll be treated as code listings, which are rendered with the standard `codeBlock` component.

Demoboard code blocks will be split into sections denoted by `//---`. The first section contains configuration that will be passed as props to the `<Doc.Demoboard>` component. The following sections will be treated differently depending on how they start:

- `--- filename`

  Treats the following lines as a source file with the specified filename

- `--- filename <-- helperFilename`

  Creates a file, solution or magic file from the helper with the given name.

### Example

```jsx
//---
// name: "Demoboard name"
// description: "Some description about this demoboard"
// isRestricted: true // if true, this will be hidden unless 
// defaultRightPanel: "console"
// consoleIsMaximized: false
// defaultViewerURL: ''
//--- main.js
const isDone = false
//--- helper:main.js
const isDone = true
//--- magic:package.json
{
  name: "magicFile",
  description: "built but not displayed in tabs"
}
//--- styles.css <-- styles-a.css
.test {
  /**
   * Helpers allow files to be shared between demoboards
   */
}
```

Note that while this inline syntax is great for small, quick examples, for bigger examples you might find it easier to manually add a `<Doc.Demoboard>` element.


`components` object
-------------------

The `components` object can be passed to an individual `<Document>`, or can be passed to a `<DocumentProvider>` to set the default components for all child documents. It supports all MDX compnents, along with a number of document-specific components.

- `<wrapper>`

  Like the MDX `wrapper` component, but also receives any `className`, `style` and `id` that were passed to the `<Document>` element itself.

- `<headingLink href>`

  A link within heading elements that points to the heading itself.


### Content components

- `Beware`
- `Demoboard`: *also includes a `hasAccess` boolean*
- `Details`
- `Spoiler`
- `Tangent`
- `Video`: *also includes a `hasAccess` boolean*



## License

MIT © [James K Nelson](https://frontarm.com)
