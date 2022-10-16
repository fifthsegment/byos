import React, { useState, useContext } from 'react'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'
import { Block } from '../../services/rn-responsive-design'
import { Asset } from '../../services/types'
import { ThemeContextInternal } from '../../contexts/theme/ThemeContextInternal'
// import { deleteAsset } from '../../services/s3'

export interface PreviewPropsType {
  asset: Asset
  onClose: () => void
}

const Preview = ({ asset, onClose }: PreviewPropsType): JSX.Element => {
  const [theme] = useContext(ThemeContextInternal)
  const [isEditing, setIsEditing] = useState(false)
  const [updateAsset, setUpdateAsset] = useState(asset)
  const [text, setText] = useState(asset.fileName)

  const handleSave = (): any => {
    setIsEditing(false)
    setUpdateAsset((asset) => ({
      ...asset,
      fileName: text
    }))
  }

  /* const handleDelete = () => {
    deleteAsset()
  } */

  const handleDelete = (): void => {}

  return (
    <>
      <Block hidden={['xs', 'md']}>
        <View style={styles.main}>
          <IconButton
            theme={theme}
            icon="close"
            onPress={onClose}
            style={styles.closeButton}
          />
          <View style={[styles.section2, styles.centered]}>
            <Text
              variant="headlineSmall"
              style={[styles.textCenter, styles.marginBottom]}
            >
              <Feather theme={theme} name="file" size={100} />
            </Text>
            <Text variant="headlineSmall" style={styles.textCenter}>
              {isEditing
                ? (
                <TextInput
                  value={isEditing ? text : updateAsset?.fileName}
                  onChangeText={(text) => setText(text)}
                />
                  )
                : (
                    updateAsset?.fileName
                  )}
            </Text>
            <View style={[styles.centered, styles.horizontal]}>
              {isEditing
                ? (
                <IconButton theme={theme} icon="check" onPress={handleSave} />
                  )
                : (
                <IconButton
                  theme={theme}
                  icon="pencil"
                  onPress={() => setIsEditing(true)}
                />
                  )}
              <IconButton
                theme={theme}
                icon="trash-can"
                onPress={handleDelete}
              />
            </View>
          </View>
        </View>
      </Block>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexGrow: 1
  },
  closeButton: {
    display: 'flex',
    textAlign: 'right',
    height: 50
  },
  marginBottom: {
    marginBottom: 10
  },
  textCenter: {
    textAlign: 'center'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row'
  },
  section2: {
    minWidth: '30vw',
    flex: 1,
    flexGrow: 1,
    margin: 20
  }
})

export { Preview }
