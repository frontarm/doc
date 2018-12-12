import * as React from 'react'
import { NavLink, NavProvider, NavRoute, NavNotFoundBoundary } from 'react-navi'

class App extends React.Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              <NavLink href='/'>Navi</NavLink>
            </h1>
          </header>
          <NavNotFoundBoundary render={renderNotFound}>
            <NavRoute />
          </NavNotFoundBoundary>
        </div>
      </NavProvider>
    );
  }
}

function renderNotFound() {
  return (
    <div className='App-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
} 

export default App;