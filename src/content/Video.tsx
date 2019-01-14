import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface VideoProps {
  children: React.ReactNode
  
  restricted?: boolean

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class Video extends React.Component<VideoProps> {
  static contextType = DocumentContext

  render() {
    return (
      <this.context.components.Video
        {...this.props}
        restricted={!this.context.canAccessRestrictedContent && this.props.restricted}
      />
    )
  }
}

