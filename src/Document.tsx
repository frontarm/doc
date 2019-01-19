import * as React from 'react'
import { MDXTag, MDXProvider } from '@mdx-js/tag'
import { DocumentComponents, DocumentContext } from './DocumentContext'
import { extractInlineDemoboardProps } from './extractInlineDemoboardProps'
import { shallowCompare } from './shallowCompare'

import { HideWhenStatic } from './conditional/HideWhenStatic'
import { Restricted } from './conditional/Restricted'

import { Beware } from './content/Beware'
import { Demoboard } from './content/Demoboard'
import { Details } from './content/Details'
import { Image } from './content/Image'
import { Video } from './content/Video'
import { Spoiler } from './content/Spoiler'
import { Tangent } from './content/Tangent'
import { Tweet } from './content/Tweet'
import { YouTube } from './content/YouTube'

import { Aside } from './layout/Aside'
import { AsideOrAfter } from './layout/AsideOrAfter'
import { Block } from './layout/Block'
import { Gutter } from './layout/Gutter'

import styles from './DocumentLayout.module.scss'


export interface DocumentProps<DocumentComponentProps = any> {
  /**
   * The MDX Document component to render.
   */
  MDXComponent?: React.ComponentType
  children?: React.ReactNode

  /**
   * Allows configuration of the components used to render different parts of
   * the document.
   */
  components?: Partial<DocumentComponents>

  /**
   * Props that will be passed through to the rendered Document Component
   */
  documentProps?: DocumentComponentProps

  /**
   * Helper files that will be available to use within inline live editors
   */
  demoboardHelpers?: { [name: string]: string }

  /**
   * Magic files that will be available to the build system within all live
   * editors, without appearing as a tab.
   */
  demoboardMagicFiles?: { [name: string]: string }

  /**
   * If true, any editors/videos with the `isRestricted` attribute will be
   * usable
   */
  canAccessRestrictedContent?: boolean

  /**
   * If true, any nested `<HideWhenStatic>` blocks will not be shown.
   */
  isStatic?: boolean

  className?: string
  style?: React.CSSProperties,
  id?: string
}

/**
 * A component that wraps an MDX Document function, maintaining a table of
 * contents and the current position within the document. It also allows
 * scrolling within the document by hash.
 */
export class Document extends React.Component<DocumentProps> {
  static HideWhenStatic = HideWhenStatic
  static Restricted = Restricted

  static Beware = Beware
  static Demoboard = Demoboard
  static Details = Details
  static Image = Image
  static Spoiler = Spoiler
  static Tangent = Tangent
  static Tweet = Tweet
  static Video = Video
  static YouTube = YouTube

  static Aside = Aside
  static AsideOrAfter = AsideOrAfter
  static Block = Block
  static Gutter = Gutter

  static contextType = DocumentContext

  private getComponentType(type: string) {
    return (
      (this.props.components && this.props.components[type]) ||
      (this.context as DocumentContext).components[type] ||
      type
    )
  }

  private createBlockRenderer(type: string) {
    return props =>
      React.createElement(this.getComponentType(type), {
        ...props,
        className: styles.Block
      })
  }

  components = {
    code: ({ dangerouslySetInnerHTML: html, children, ...props }) => {
      let { __html: highlightedSource } = html || { __html: children }
      let el = document.createElement('pre')
      el.innerHTML = highlightedSource
      let source = el.innerText

      // TODO: match live editors in the raw highlighted source, and extract
      // the first file's highlighted source, so it can be displayed after
      // page load until the editor is loaded.

      let fenceString = props.className ? props.className.replace(/^language-/, '') : null
      let bracketIndex = fenceString && fenceString.indexOf('{')
      let language = fenceString && (bracketIndex === -1 ? fenceString : fenceString.slice(0, bracketIndex))

      let demoboardProps = extractInlineDemoboardProps(source, highlightedSource, this.props.demoboardHelpers)
      
      return (
        demoboardProps
          ? <Demoboard {...demoboardProps} />
          : React.createElement(this.context.components.code, {
            ...props,
            className: styles.Block+' '+(props.className || ''),
            highlightedSource,
            language,
          })
      )
    },

    // Live editors don't need to be wrapped in a <pre>, so leave rendering
    // this up to the code renderer.
    pre: ({ className='', ...props }) => {
      let PreComponent = this.getComponentType('pre')

      return (
        props.children && props.children.type === MDXTag && props.children.props.name === 'code'
          ? props.children
          : <PreComponent {...props} className={styles.Block+' '+className} />
      )
    },

    wrapper: (props) => (
      React.createElement(this.getComponentType('wrapper'), {
        ...props,
        className: styles.Document+' '+this.props.className,
        id: this.props.id,
        style: this.props.style,
      })
    ),

    // Inject 
    p: this.createBlockRenderer('p'),
    ul: this.createBlockRenderer('ul'),
    ol: this.createBlockRenderer('ol'),
    img: this.createBlockRenderer('img'),
    hr: this.createBlockRenderer('hr'),
    blockquote: this.createBlockRenderer('blockquote'),

    h1: this.createBlockRenderer('h1'),
    h2: this.createBlockRenderer('h2'),
    h3: this.createBlockRenderer('h3'),
    h4: this.createBlockRenderer('h4'),
    h5: this.createBlockRenderer('h5'),
    h6: this.createBlockRenderer('h6'),
  }

  // Documents can be pretty heavy, and should be pure,
  // so we want to avoid re-rendering them where possible.
  shouldComponentUpdate(nextProps: DocumentProps) {
    let lastProps = this.props

    return (
      lastProps.MDXComponent !== nextProps.MDXComponent ||
      lastProps.children !== nextProps.children ||
      lastProps.canAccessRestrictedContent !== nextProps.canAccessRestrictedContent ||
      lastProps.className !== nextProps.className ||
      !shallowCompare(lastProps.documentProps, nextProps.documentProps) ||
      !shallowCompare(lastProps.demoboardHelpers, nextProps.demoboardHelpers) ||
      !shallowCompare(lastProps.demoboardMagicFiles, nextProps.demoboardMagicFiles) ||
      lastProps.id !== nextProps.id ||
      lastProps.isStatic !== nextProps.isStatic ||
      !shallowCompare(lastProps.style, nextProps.style)
    )
  }

  render() {
    // Separate our custom components from the MDX components
    let components = {
      ...(this.context as DocumentContext).components,
      ...this.props.components!,
    } as DocumentComponents

    let {
      wrapper,
      code,
      headingLink,

      Beware,
      Demoboard,
      Details,
      Image,
      Spoiler,
      Tangent,
      Tweet,
      Video,
      YouTube,

      ...mdxComponents
    } = components

    // Add in hard-coded MDX components to handle code blocks and pass through
    // styling props
    Object.assign(mdxComponents, this.components)

    let content = this.props.MDXComponent ? (
      <MDXProvider components={mdxComponents}>
        <this.props.MDXComponent {...this.props.documentProps} />
      </MDXProvider>
    ) : (
      this.components.wrapper({
        children: this.props.children || null,
      })
    )

    return (
      <DocumentContext.Provider value={{
        canAccessRestrictedContent: !!this.props.canAccessRestrictedContent,
        components,
        isStatic: !!this.props.isStatic,
      }}>
        {content}
      </DocumentContext.Provider>
    )
  }
}
