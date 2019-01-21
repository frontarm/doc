/* eslint-disable import/no-webpack-loader-syntax */
import * as React from 'react'
import { NavProvider } from 'react-navi'
import { Doc } from '@frontarm/doc'

export default class App extends React.Component {
  render() {
    let { default: Component, demoboardHelpers } = require('!babel-loader!mdx-loader!./document.mdx')

    return (
      <NavProvider navigation={this.props.navigation}>
        <Doc
          MDXComponent={Component}
          alignWhenNarrow='left'
          demoboardHelpers={demoboardHelpers}
        />
      </NavProvider>
    )
  }
}
