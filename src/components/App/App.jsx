import React, { PropTypes } from 'react'

import ComicDrawer from '../ComicDrawer'

function App({ children }) {
  return (
    <div>
      { children }
      <ComicDrawer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
