import * as React from 'react'
import { Platform } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import { ApiConfiguration } from '../ApiConfiguration/index'
import Dashboard from '../../pages/dashboard'
import Header from '../Header'

const MobileNavigation: React.FC = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'assets', title: 'Assets', focusedIcon: 'folder' },
    {
      key: 'api_configuration',
      title: 'API Configuration',
      focusedIcon: 'cogs'
    }
  ])

  const renderScene = BottomNavigation.SceneMap({
    assets: Dashboard,
    api_configuration: ApiConfiguration
  })

  if (Platform.OS === 'web') {
    return null
  }

  return (
    <>
      <Header title="BYOS" />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  )
}

export default MobileNavigation
