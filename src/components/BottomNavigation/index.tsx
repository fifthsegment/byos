import * as React from 'react';
import { BottomNavigation as InternelBottomNavigation} from 'react-native-paper';
import { Configuration } from '../../pages/Configuration/index'
import Dashboard from '../../pages/dashboard';

const BottomNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'assets', title: 'Assets', focusedIcon: 'folder'},
    { key: 'api_configuration', title: 'API Configuration', focusedIcon: 'cogs' }
  ]);

  const renderScene = InternelBottomNavigation.SceneMap({
    assets: Dashboard,
    api_configuration: Configuration    
  });

  return (
    <InternelBottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigation;