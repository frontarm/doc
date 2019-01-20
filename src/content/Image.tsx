import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface ImageProps {
  aside?: boolean
  floatInset?: string
  floatMinWidth?: string

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
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props, 
      props => <this.context.components.Image {...props} />
    )
  }
}
