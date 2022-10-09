import { Appbar, Button } from 'react-native-paper';

const Header = (props: any) => (
  <Appbar.Header mode='center-aligned' elevated={true}>
    <Appbar.Content title={props.title} />
  </Appbar.Header>
);

export default Header