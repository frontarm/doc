import React from 'react'
import ReactDOM from 'react-dom'
import * as Navi from 'navi'
import './index.css'
import App from './App'
import { defaultDocumentComponents, Document } from '@frontarm/document'
import { Tweet } from './Tweet'


defaultDocumentComponents.Tweet = ({ className='', ...props }) =>
    <Document.Block className={'document-Tweet '+className}>
      <Tweet {...props} />
    </Document.Block>
  

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
