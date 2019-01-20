import * as React from 'react'
import { NavLink } from 'react-navi'
import { BewareProps } from './content/Beware'
import { DemoboardProps } from './content/Demoboard'
import { DetailsProps } from './content/Details'
import { ImageProps } from './content/Image'
import { SpoilerProps } from './content/Spoiler'
import { TangentProps } from './content/Tangent'
import { TweetProps } from './content/Tweet'
import { VideoProps } from './content/Video'
import { YouTubeProps } from './content/YouTube'
import { Block } from './layout/Block'
import { Aside } from './layout/Aside'

export interface MDXComponents {
  [name: string]: React.ComponentType<any>
}

export interface DocComponents extends MDXComponents {
  wrapper: React.ComponentType<React.HTMLAttributes<any>>
  code: React.ComponentType<{ highlightedSource?: string, language?: string } & React.HTMLAttributes<any>>
  headingLink: React.ComponentType<{ href: string } & React.HTMLAttributes<any>>

  Beware: React.ComponentType<BewareProps>
  Demoboard: React.ComponentType<DemoboardProps>
  Details: React.ComponentType<DetailsProps>
  Image: React.ComponentType<ImageProps>
  Spoiler: React.ComponentType<SpoilerProps>
  Tangent: React.ComponentType<TangentProps>
  Tweet: React.ComponentType<TweetProps>
  Video: React.ComponentType<VideoProps>
  YouTube: React.ComponentType<YouTubeProps>
}

export interface DocContext {
  components: DocComponents

  canAccessRestrictedContent: boolean
  isStatic: boolean
}

// Get around a circular dependency, where the heading components need to know
// the context, but the context needs this at creation time.
export const defaultDocComponents: DocComponents = {} as any

export const DocContext = React.createContext<DocContext>({
  components: defaultDocComponents,
  canAccessRestrictedContent: false,
  isStatic: true,
})

export interface DocProviderProps {
  children: React.ReactNode
  components: Partial<DocComponents>
}

export function DocProvider(props: DocProviderProps) {
  return (
    <DocContext.Consumer>
      {context => 
        <DocContext.Provider value={{
          ...context,
          components: {
            ...context.components,
            ...props.components,
          } as DocComponents
        }}>
          {props.children}
        </DocContext.Provider>
      }
    </DocContext.Consumer>
  )
}

function createHeadingComponent(level) {
  return class Heading extends React.Component<React.HTMLAttributes<any>> {
    static contextType = DocContext

    render() {
      let props = this.props

      // Change MDX's heading ids by removing anything in parens, and removing
      // any <> characters.
      let simpleId = props.id && props.id.replace(/\(.*/, '').replace(/[<>]/g, '')

      // The component that will be used to render the heading's hash link.
      let HeadingLink = (this.context as DocContext).components.headingLink

      return React.createElement(
        'h' + level,
        { ...props, id: simpleId },
        simpleId && HeadingLink && <HeadingLink href={'#'+simpleId} />,
        props.children,
      )
    }
  }
}

Object.assign(defaultDocComponents, {
  a: (props) => {
    // For internal links, remove any `https` and hostname, as it triggers
    // opening in a new window.
    let href =
      props.href.indexOf(process.env.PUBLIC_URL) === 0
        ? props.href.replace(process.env.PUBLIC_URL, '')
        : props.href

    return (
      <NavLink
        {...props}
        href={href}
        // Open external links in a new window
        target={props.href.slice(0, 4) === 'http' ? '_blank' : props.target}
      />
    )
  },

  // Render the `<pre>` tags within code blocks instead of separately, so that
  // Demoboards don't need to be wrapped by `<pre>` tags.
  code: ({ children, className='', language='text', highlightedSource, ...props }) =>
    <pre className={`Doc-code `+className} {...props}>
      {
        highlightedSource
          ? <code dangerouslySetInnerHTML={{ __html: highlightedSource }} />
          : <code>{children}</code>
      }
    </pre>
  ,

  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),

  // Add a class to the wrapper to add layout-related styles to it
  wrapper: ({ className='', ...props }) =>
    <div {...props} className={'Doc-wrapper '+className} />
  ,

  headingLink: ({ className='', ...props }) =>
    <NavLink href={props.href} className={'Doc-headingLink '+className}>
      #
    </NavLink>
  ,
  
  Beware: ({ children, className='', title, ...props }) =>
    <Block Component='section' {...props} className={'Doc-Beware '+className}>
      <header>
        {title}
      </header>
      {children}
    </Block>
  ,
  Demoboard: ({ className='', id, editorPathname, sources, style }: DemoboardProps) =>
    <Block Component='pre' className={'Doc-Demoboard'+' '+className}>
      <code
        id={id}
        style={style}>
        {sources[editorPathname || Object.keys(sources)[0]]}
      </code>
    </Block>
  ,
  Details: ({ children, className='', icon, title, ...props }) =>
    <Block Component='section' {...props} className={'Doc-Details '+className}>
      <header>
        {title}
      </header>
      {children}
    </Block>
  ,
  Image: ({ children, className='', title, ...props }) =>
    <Block>
      <img {...props} className={'Doc-Image' +className} />
    </Block>
  ,
  Spoiler: ({ children, className='', title, ...props }) =>
    <Block Component='section' {...props} className={'Doc-Spoiler '+className}>
      <header>
        {title}
      </header>
      {children}
    </Block>
  ,
  Tangent: ({ children, className='', ...props }) =>
    <Aside {...props} className={'Doc-Tangent '+className}>
      {children}
    </Aside>
  ,
  Tweet: (props) => <div>Unimplemented.</div>,
  Video: (props) => <div>Unimplemented.</div>,
  YouTube: ({ children, icon, title, videoId, className='', ...props }: YouTubeProps) => 
    <Block className={'Doc-YouTube '+className}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...props}
      />
    </Block>
})