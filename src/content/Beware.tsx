import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface BewareProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  title?: any
}

export class Beware extends React.Component<BewareProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.Beware title='Beware' {...this.props} />
  }
}