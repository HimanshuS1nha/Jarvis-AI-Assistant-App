import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // @ts-expect-error
      navigation.replace('Home');
    }, 400);

    return () => clearInterval(timeout);
  }, []);
  return (
    <View style={tw`flex-1 bg-black justify-center items-center gap-y-8`}>
      <Image
        source={require('../assets/logo.jpeg')}
        style={tw`w-32 h-32 rounded-full`}
      />
      <View style={tw`gap-y-1`}>
        <Text style={tw`text-5xl text-blue-600 font-bold text-white`}>
          Jarvis
        </Text>
        <Text style={tw`text-gray-300 font-medium`}>
          Your personal assistant
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
