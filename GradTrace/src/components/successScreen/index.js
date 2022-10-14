import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import styles from './styles';

export default function SuccessScreen({ uploaded }) {
  let animation = React.createRef();

  const [isUploaded, setIsUploaded] = useState(false)

  useEffect(() => {
    console.log('Component mounted')
    animation.current.play();
  }, [])

  const renderDoneAnim = () => {

    return (
      <View>
        <Image
          style={styles.imageStye}
          source={{
            uri: 'https://static.thenounproject.com/png/1276362-200.png'
          }}
        />

      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!uploaded ?
        <LottieView
          ref={animation}
          loop={true}
          style={styles.animationStye}
          source={require('../../../assets/anim/uploading.json')}
        />
        : renderDoneAnim()}
    </View>
  )
}
