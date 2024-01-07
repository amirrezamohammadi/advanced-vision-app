import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import tw from '../../tailwind';

const Home = () => {
  const {navigate} = useNavigation();
  const openImagePickerFromGallery = () => {
    ImageCropPicker.openPicker({
      writeTempFile: true,
      width: 640,
      height: 480,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then(photo => {
      //console.log(photo);
      navigate('Result', {
        base64: photo.data,
        image: `data:${photo.mime};base64,${photo.data}`,
      });
      //   setProfileData(p => ({
      //     ...p,
      //     ['img']: {id: null, url: `data:${photo.mime};base64,${photo.data}`},
      //   }));
    });
  };

  const openImagePickerFromCamera = goBack => {
    ImageCropPicker.openCamera({
      width: 640,
      height: 480,
      cropping: true,
      includeBase64: true,
      //useFrontCamera: true,
    }).then(photo => {
      //   const base64 = `data:${photo.mime};base64,${photo.data}`;
      navigate('Result', {
        base64: photo.data,
        image: `data:${photo.mime};base64,${photo.data}`,
      });
    });
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-5`}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={'Pick From Gallery'}
        onPress={() => openImagePickerFromGallery()}
        style={tw`h-22 w-full border border-2 rounded-lg border-primary justify-center items-center`}>
        <Text style={tw`text-[20px]`}>Pick From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={'Capture a Photo'}
        onPress={() => openImagePickerFromCamera()}
        style={tw`mt-4 h-22 w-full border border-2 rounded-lg border-primary justify-center items-center`}>
        <Text style={tw`text-[20px]`}>Capture a Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
