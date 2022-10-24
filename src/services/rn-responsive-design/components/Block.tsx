import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  EmitterSubscription
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { getScreenType, ScreenType } from '../constants'

export interface BlockType {
  hidden?: ScreenType[]
}

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')
const screenType: ScreenType = getScreenType(window.width)
export const Block = ({
  hidden,
  children
}: React.PropsWithChildren<BlockType>): JSX.Element => {
  const [dimensions, setDimensions] = useState({ window, screen, screenType })
  useEffect(() => {
    const subscription: EmitterSubscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        const screenType: ScreenType = getScreenType(window.width)
        setDimensions({ window, screen, screenType })
      }
    )
    return () => subscription?.remove()
  }, [])

  /**
   * A simple function to debug the current dimensions
   * @returns
   */
  // eslint-disable-next-line
  const getDebug: React.FC = () => (
    <>
      <Text>Current type: {dimensions.screenType}</Text>
      <Text style={styles.header}>Window Dimensions</Text>
      {Object.entries(dimensions.window).map(([key, value]) => (
        <Text key={key}>
          {key} - {value}
        </Text>
      ))}
      <Text style={styles.header}>Screen Dimensions</Text>
      {Object.entries(dimensions.screen).map(([key, value]) => (
        <Text key={key}>
          {key} - {value}
        </Text>
      ))}
    </>
  )

  const hideContent = hidden ? hidden.includes(dimensions.screenType) : false

  return <>{!hideContent && <View>{children}</View>}</>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginVertical: 10
  }
})
