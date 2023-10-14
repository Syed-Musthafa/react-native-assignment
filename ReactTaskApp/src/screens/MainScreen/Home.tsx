import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Colors, Images } from '../../constant'

import { fetchPostData } from '../../store/reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'



const Home = ({ navigation }): JSX.Element  => {

  const user = useSelector((state: any) => state.post.users)

  const { loading, body} = user

  const dispatch = useDispatch<AppDispatch>()

  const [postData, setPostData] = useState([])

  const [isFetching, setIsFetching] = useState(false)



  useEffect(() => {
    setPostData(body)
  },[user])


  useEffect(() => {
    dispatch(fetchPostData())
  }, [])

  useEffect(() => {
    if(isFetching){

      dispatch(fetchPostData())
    }
  }, [isFetching])

 const onRefresh = useCallback(() => {
      setIsFetching(!isFetching)
 },[])
  


  function renderHeaderBar() {
    return (
      <View style={{ padding : 10, marginTop:50, borderBottomWidth :2, borderBottomColor : Colors.border}}>
      <View
          style={[{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between' }]}>
          <TouchableOpacity
          >
              <Image
                  source={Images.profile}
                  resizeMode="contain"
                  style={{ width: 40, height: 40,}}

              />
          </TouchableOpacity>
          <View >
          <Text style={{ color: Colors.text_main, fontSize: 25, }}>Chirpz</Text>
      </View>
      <View style={{}} />
        
      </View>
    
  </View>
    )
  
  }


  const renderPostContent = ({ item, index }) => {


    return  (
      <View style={{ padding : 30, borderBottomWidth: 1, borderBottomColor : Colors.border}} key={index} >
        <View style={{ display: "flex", flexDirection: 'row', alignItems: "center" , }}>
        <Text style={{ color : Colors.text_main, fontSize: 20}}>{item.userName}</Text>
          <Image 
            source={Images.right}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginLeft: 20 }}
          />
        </View>
        <View style={{ marginTop: 10}}>
          <Text style={{  color : Colors.text_secondary, fontSize: 15,}}>
            {item.caption}
          </Text>
        </View>
        <View style={{ 
          display: "flex", 
         alignItems:'center',
         flexDirection: "row",
        marginTop: 30
         }}>
          {
            item?.tags?.map((item, index) => {
              return (
                 <View style={{ 
                  
                  backgroundColor: Colors.hash_box, 
                  padding:5,
                   alignItems:'center',
                   justifyContent:'center',
                   borderRadius:5,
                  marginHorizontal: 10

                  }}>
                  <Text style={{  color : Colors.text_secondary, fontSize: 15,}}>{item}</Text>
                 </View>
              )
            })
          }
        </View>
      </View>
    ) 

  }




  return (
    <SafeAreaView style={styles.mainContainer}>


    {renderHeaderBar()}
    {/* {renderPostContent()} */}

    {
      !loading ? (
        <FlatList 
        data={postData}
        renderItem={renderPostContent}
        // onRefresh={onRefresh}
        // refreshing={isFetching}
      />
      ) 
        : (
          <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize:20, color: "#fff"}}>Loading..</Text>
          </View>
        )
      
    }
   

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom:40,
          right: 30

        }}
        onPress={() => navigation.navigate("CreatePage")}
      >
        <Image 
        source={Images.addPlus}
          resizeMode="contain"
          style={{ width: 50, height: 50 }} />
        
      </TouchableOpacity>
  
      
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.primary
}
})