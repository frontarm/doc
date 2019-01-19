/* eslint-disable import/no-webpack-loader-syntax */
import * as React from 'react'
import { NavProvider } from 'react-navi'
import { Document } from '@frontarm/document'

export default class App extends React.Component {
  render() {
    let { default: Component, demoboardHelpers } = require('!babel-loader!mdx-loader!./document.md')

    return (
      <NavProvider navigation={this.props.navigation}>
        <Document
          MDXComponent={Component}
          demoboardHelpers={demoboardHelpers}
        />
      </NavProvider>
    )
  }
}
