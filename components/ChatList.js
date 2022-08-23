import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import {useTailwind} from 'tailwind-rn';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import ChatRow from '../components/ChatRow';


const ChatList = () => {
    const tw = useTailwind();
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(
      () => 
        onSnapshot(
          query(
            collection(db, 'matches'),
            where('usersMatched', 'array-contains', user.uid)
          ),
          (snapshot) => 
            setMatches(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              }))
            )
        ),
      [user]
    );


    return (
      matches.length > 0 ? (
        <FlatList
            style={tw('h-full')}
            data={matches}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ChatRow matchDetails={item} />}
            
        />
      ) : (
          <View style={tw('p-5')}>
              <Text style={tw('text-center text-lg')}>No matches at the moment 😢</Text>
          </View>
      )
    );
};

export default ChatList