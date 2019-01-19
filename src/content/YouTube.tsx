import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface YouTubeProps {
  children?: React.ReactNode
  icon?: any
  title?: any
  videoId: string

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class YouTube extends React.Component<YouTubeProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.YouTube {...this.props} />
  }
}

