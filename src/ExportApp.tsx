import React from 'react'
import BAap from './App'
import { Provider } from './providers/Provider'

const ExportApp: React.FC = () => {
  return (
    <Provider>
      <BAap />
    </Provider>
  )
}

export default ExportApp
