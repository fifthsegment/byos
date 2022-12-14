import React from 'react'
import { Appbar } from 'react-native-paper'
import { PortalHost } from '@gorhom/portal'
const Header = (props: any): JSX.Element => (
  <Appbar.Header mode="center-aligned" elevated={true}>
    <PortalHost name="Back" />
    <Appbar.Content title={props.title} />
    <PortalHost name="Reloader" />
  </Appbar.Header>
)

export default Header
