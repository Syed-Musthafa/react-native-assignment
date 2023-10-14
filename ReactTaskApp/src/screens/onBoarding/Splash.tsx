import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Display } from '../../utils'
import { Colors, Images,  } from '../../constant'

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() =>{
            navigation.navigate('Home')
        }, 2000)
    }, [])

  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />
    <Image source={Images.splash_Logo} resizeMode="contain" style={styles.image} />

</View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
      },
    

})