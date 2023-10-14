import { Image, SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors, Images } from '../../constant'
import { TextInput } from 'react-native-gesture-handler'
import { AppDispatch } from '../../store/store'
import { useDispatch } from 'react-redux'
import { addPostData } from '../../store/reducers/post'

interface PostDataProps {
  userName?: string,
  caption? : string,
  tags? : string[]
}

const initialState: PostDataProps[] = [{
  
  caption : '',
  tags: []
}]


const CreatePage = ({navigation} :  any) => {

  const dispatch = useDispatch<AppDispatch>()

  const [postData, setPostData] = useState<PostDataProps[]>([])

  const [postState, setPostState] = useState({
    caption: '',
    tags: '',
  });

  const [tagData, setTagsData] = useState<string[]>([])


  const { caption, tags} = postState

  const handleChange = (name: string, value: string) => {

    setPostState({
      ...postState,
      [name]: value,
    });
  };


  const handleAdd = useCallback( () => {
    if(tags !== ""){
      setTagsData([...tagData, tags])
      setPostState({
        caption : caption,
        tags : ''
      })
    }
  },[tagData, postState])

  const handlePostData = useCallback(() => {

    const dataToSent = {
      userName : "Musthafa",
      caption : caption,
      tags : tagData,
    }

    if(caption !== "") {
      dispatch(addPostData(dataToSent))
      navigation.navigate("Home")
    } else {
      Alert.alert("Enter the Value")
    }

   

   
  },[tagData, caption])

  


  function renderHeaderBar() {
    return (
      <View style={{ padding: 10, marginTop: 50, }}>
        <View
          style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
          <TouchableOpacity
          >
            <Image
              source={Images.profile}
              resizeMode="contain"
              style={{ width: 40, height: 40, }}

            />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={handlePostData}
          style={styles.postButton}>
            <Text style={{ color: Colors.text_main, fontSize: 16, fontWeight: 'bold', }}>post</Text>
          </TouchableOpacity>

        </View>

      </View>
    )

  }

  function renderPostTextContent() {
    return (
      <View style={styles.postTextContainer}>
        <View >
          <Text style={styles.headerText}>Create</Text>
          <TextInput
            value={caption}
            placeholder='Whats on your mind?'
            placeholderTextColor={Colors.border}
            onChangeText={(e) => handleChange("caption", e)}
            style={styles.textField}
          />
        </View>

        <View style={{ marginTop: 40, }}>
         
          <Text style={styles.headerText}>Add Tags</Text>
          <View style ={{ 
            flexDirection:'row',
            alignItems:"center",
            justifyContent: "space-between"
            }}>
          <TextInput

            value={tags}
            placeholder='write tags'
            placeholderTextColor={Colors.border}
            onChangeText={(e) => handleChange("tags", e)}
            style={styles.textField}
          />
          {
            tags !== "" && (
              <TouchableOpacity onPress={handleAdd}>
              <Text style={{ fontSize: 16, color: '#fff'}}>Add</Text>
            </TouchableOpacity>
            )
          }
           
        </View>
        <View style={{ 
          flexWrap: 'wrap',
         alignItems:'center',
         flexDirection: "row",
        marginTop: 30
         }}>
        {
          tagData.map((item, index) => {
            return (
              <View 
               key={index}
              style={{ 
                  
                backgroundColor: Colors.hash_box, 
                padding:5,
                 alignItems:'center',
                 justifyContent:'center',
                 borderRadius:5,
                marginHorizontal: 10,
                marginTop: 5

                }}>
                <Text style={{  color : Colors.text_secondary, fontSize: 15,}}>#{item}</Text>
               </View>
            )
          })
        }
        </View>
     

        </View>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.mainContainer}>


      {renderHeaderBar()}
      {renderPostTextContent()}


    </SafeAreaView>
  )
}

export default CreatePage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.primary
  },
  postButton: {
    padding: 5,
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postTextContainer: {
    padding: 20,
    marginTop: 30
  },
  textField : {
    color: Colors.text_secondary,
    fontSize: 20
  },

  headerText: {
    color: "#fff",
    fontSize: 25
  }

})