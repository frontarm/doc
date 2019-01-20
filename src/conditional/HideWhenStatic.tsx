import * as React from 'react'
import { DocContext } from '../DocContext'

export interface HideWhenStaticProps {
  children: React.ReactNode
}

export class HideWhenStatic extends React.Component<HideWhenStaticProps> {
  static contextType = DocContext

  render() {
    return this.context.isStatic ? null : this.props.children
  }
}