import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface YouTubeProps {
  aside?: boolean
  floatInset?: string
  floatMinWidth?: string

  children?: React.ReactNode
  icon?: any
  title?: any
  videoId: string

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class YouTube extends React.Component<YouTubeProps> {
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props,
      props => <this.context.components.YouTube {...props} />
    )
  }
}

