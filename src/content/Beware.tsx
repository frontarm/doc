import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface BewareProps extends React.HTMLAttributes<any> {
  aside?: boolean
  floatInset?: string
  floatMinWidth?: string

  children: React.ReactNode
  title?: any
}

export class Beware extends React.Component<BewareProps> {
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props,
      props => <this.context.components.Beware title='Beware' {...props} />
    )
  }
}