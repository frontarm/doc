import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface VideoProps {
  aside?: boolean
  floatInset?: string

  children?: React.ReactNode
  icon?: any
  restricted?: boolean
  title?: any
  videoId: string

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class Video extends React.Component<VideoProps> {
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props,
      props =>
        <this.context.components.Video
          {...props}
          restricted={!this.context.canAccessRestrictedContent && this.props.restricted}
        />
    )
  }
}

