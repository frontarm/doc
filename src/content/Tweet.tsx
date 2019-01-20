import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface TweetProps {
  aside?: boolean
  floatInset?: string

  tweetId: string
  options?: object
  onLoad?: Function

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class Tweet extends React.Component<TweetProps> {
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props,
      props => <this.context.components.Tweet {...props} />
    )
  }
}
