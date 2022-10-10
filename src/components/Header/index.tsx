import { Appbar, Button } from 'react-native-paper';
import { getDrawerStatusFromState } from '@react-navigation/drawer';

const Header = ({ navigation, route, options }) => {

  const handleToggel = ()=>{
    getDrawerStatusFromState(navigation.getState()) === 'open' ? navigation.closeDrawer() : navigation.openDrawer();

  }


  return(
    <Appbar.Header elevated={true}>
      <Appbar.Action icon="menu" onPress={handleToggel}
      />
      <Appbar.Content title='Bring Your Own Server' />
      <Appbar.Action icon="refresh" />
    </Appbar.Header>
);

}

export default Header