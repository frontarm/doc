import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface TangentProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  title?: any
}

export class Tangent extends React.Component<TangentProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.Tangent {...this.props} />
  }
}

