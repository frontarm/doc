/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import { NavProvider } from 'react-navi'
import { Document } from '@frontarm/document'

export default class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <Document
          Component={require('!babel-loader!mdx-loader!./document.md').default}
        />
      </NavProvider>
    )
  }
}
