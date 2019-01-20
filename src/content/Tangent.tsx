import * as React from 'react'
import { DocContext } from '../DocContext'

export interface TangentProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  title?: any
}

export class Tangent extends React.Component<TangentProps> {
  static contextType = DocContext

  render() {
    return <this.context.components.Tangent {...this.props} />
  }
}

