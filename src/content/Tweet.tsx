import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface TweetProps {
  tweetId: string
  options?: object
  onLoad?: Function

  className?: string
  id?: string
  style?: React.CSSProperties
}

export class Tweet extends React.Component<TweetProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.Tweet {...this.props} />
  }
}
