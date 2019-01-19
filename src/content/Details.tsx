import * as React from 'react'
import { DocumentContext } from '../DocumentContext'

export interface DetailsProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  icon?: any
  title?: any
}

export class Details extends React.Component<DetailsProps> {
  static contextType = DocumentContext

  render() {
    return <this.context.components.Details {...this.props} />
  }
}