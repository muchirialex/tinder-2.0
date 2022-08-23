import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, StyleSheet, StatusBar } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import {useTailwind} from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ModalScreen = () => {
    const tw = useTailwind();
    const { user } = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
      setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        age: age,
        timestamp: serverTimestamp()
      })
        .then(() => {
          navigation.navigate('Home')
        })
        .catch(error => {
          alert(error.message);
        });
    };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[tw('flex-1 items-center pt-1'), styles.AndroidSafeArea, ]}>
        <Image
          style={tw('h-20 w-full')}
          resizeMode='contain'
          source={{ uri: 'https://www.techadvisor.com/cmsdata/features/3515013/tinder_logo_thumb800.png'}}
        />
        <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
            Welcome {user.displayName}
        </Text>

        <Text style={tw('text-center p-4 font-bold text-red-400')}>
            Step 1: The Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={setImage}
          style={tw('text-center text-xl pb-2')}
          placeholder='Enter a profile pic URL' 
        />

        <Text style={tw('text-center p-4 font-bold text-red-400')}>
            Step 2: The Job
        </Text>
        <TextInput
          value={job}
          onChangeText={setJob}
          style={tw('text-center text-xl pb-2')}
          placeholder='Enter your occupation' 
        />

        <Text style={tw('text-center p-4 font-bold text-red-400')}>
            Step 3: The Age
        </Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={tw('text-center text-xl pb-2')}
          placeholder='Enter your age'
          keyboardType='numeric'
          maxLength={2}
        />
        
        <TouchableOpacity
          disabled={incompleteForm}
          style={[tw('w-64 p-3 rounded-xl absolute bottom-10'),
            incompleteForm ? tw('bg-gray-400') : tw('bg-red-400')
          ]}
          onPress={updateUserProfile}
        >
          <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ModalScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  AndroidView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});