// From https://github.com/andrewsuzuki/react-twitter-widgets/blob/cf5de878cd204db660fe0071db3c1c4cb67e5737/src/components/AbstractWidget.js

import * as React from 'react'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import script from 'scriptjs'

export class Tweet extends React.Component {
  static defaultProps = {
    options: {},
    onLoad: () => {},
  }

  shouldComponentUpdate(nextProps) {
    const changed = (name) => !isEqual(this.props[name], nextProps[name])
    return changed('tweetId') || changed('options')
  }

  ready = (tw, element, done) => {
    const { tweetId, options, onLoad } = this.props

    // Options must be cloned since Twitter Widgets modifies it directly
    tw.widgets.createTweet(tweetId, element, cloneDeep(options))
    .then(() => {
      // Widget is loaded
      done()
      onLoad && onLoad()
    })
  }

  render() {
    return React.createElement(AbstractWidget, {
      ready: this.ready,
      ...this.props
    })
  }
}


class AbstractWidget extends React.Component {
  static removeChildren(node) {
    if (node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild)
      }
    }
  }

  static removeChildrenExceptLast(node) {
    if (node) {
      while (node.childNodes.length > 1) {
        node.removeChild(node.firstChild)
      }
    }
  }

  componentWillMount() {
    this.willUnmount = false
  }

  componentDidMount() {
    script('https://platform.twitter.com/widgets.js', 'twitter-widgets')

    this.loadWidget()
  }

  componentDidUpdate() {
    this.loadWidget()
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  loadWidget = () => {
    script.ready('twitter-widgets', () => {
      const twttr = window.twttr
      if (!twttr) {
        // If the script tag fails to load, scriptjs.ready() will still trigger.
        // Let's avoid the JS exceptions when that happens.
        console.error('Failure to load window.twttr, aborting load.') // eslint-disable-line no-console
        return
      }

      // Delete existing
      AbstractWidget.removeChildren(this.widgetWrapper)

      // Create widget
      this.props.ready(twttr, this.widgetWrapper, this.done)
    })
  }

  done = () => {
    if (this.willUnmount) {
      AbstractWidget.removeChildrenExceptLast(this.widgetWrapper)
    }
  }

  render() {
    return React.createElement('div', {
      className: this.props.className,
      style: this.props.style,
      id: this.props.id,
      ref: (c) => {
        this.widgetWrapper = c
      },
    })
  }
}