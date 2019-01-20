import React from 'react'
import ReactDOM from 'react-dom'
import * as Navi from 'navi'
import './index.css'
import App from './App'
import { defaultDocComponents, Doc } from '@frontarm/doc'
import { Tweet } from './Tweet'


defaultDocComponents.Tweet = ({ className='', ...props }) =>
    <Doc.Block className={'document-Tweet '+className}>
      <Tweet {...props} />
    </Doc.Block>
  

let pages = Navi.createSwitch({
  paths: {
    '/': Navi.createPage({
      title: 'Home',
      content: '',
    })
  }
})


let navigation = Navi.createBrowserNavigation({ pages })


ReactDOM.render(<App navigation={navigation} />, document.getElementById('root'))
