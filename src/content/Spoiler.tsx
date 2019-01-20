import * as React from 'react'
import { DocContext } from '../DocContext'

export interface SpoilerProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  title?: string
}

export class Spoiler extends React.Component<SpoilerProps> {
  static contextType = DocContext

  render() {
    return <this.context.components.Spoiler title='Spoiler' {...this.props} />
  }
}

