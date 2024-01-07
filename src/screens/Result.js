import React, {useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../tailwind';

const Result = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {image, base64} = route.params;
  const [result, setResult] = useState('');

  const predict = useQuery({
    queryFn: () =>
      axios.post('http://127.0.0.1:8000/predict/', {image: String(base64)}),
    queryKey: ['predict'],
    onSuccess: e => {
      console.log('ee', e);
      setResult(e.data.result);
    },
  });
  return (
    <SafeAreaView style={tw`flex-1`} edges={['bottom']}>
      {predict.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Image style={tw`w-full h-78`} source={{uri: image}} />
          <View accessible={true} accessibilityLabel={'result'} style={tw`p-5`}>
            <Text style={tw`text-xl`}>{result}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Result;
