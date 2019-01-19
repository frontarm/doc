import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface ImageProps {
  children?: React.ReactNode
  icon?: any
  title?: any
  alt: string
  src: string

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class Image extends React.Component<ImageProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.Image {...this.props} />
  }
}
