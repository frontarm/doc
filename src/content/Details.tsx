import * as React from 'react'
import { DocContext } from '../DocContext'
import { wrapWithAsideOrFloat } from './helpers'

export interface DetailsProps extends React.HTMLAttributes<any> {
  aside?: boolean
  floatInset?: string
  floatMinWidth?: string

  children: React.ReactNode
  icon?: any
  title?: any
}

export class Details extends React.Component<DetailsProps> {
  static contextType = DocContext

  render() {
    return wrapWithAsideOrFloat(
      this.props,
      props => <this.context.components.Details {...props} />
    )
  }
}