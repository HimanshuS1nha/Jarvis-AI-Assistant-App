import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import tw from 'twrnc';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {MessageType} from '../types';
import Message from '../components/Message';
import LoadingDots from 'react-native-loading-dots';

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({model: 'gemini-pro'});

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (input === '') {
      return;
    }
    setInput('');
    Keyboard.dismiss();
    setMessages(prev => [
      ...prev,
      {
        by: 'human',
        message: input,
      },
    ]);
    try {
      setIsLoading(true);
      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();

      setMessages(prev => [
        ...prev,
        {
          by: 'assistant',
          message: text,
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Some error occured. Please try again later!');
    } finally {
      setIsLoading(false);
    }
  }, [input]);
  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`my-2 flex-row items-center justify-center gap-x-4`}>
        <Image
          source={require('../assets/logo.jpeg')}
          style={tw`rounded-full w-10 h-10`}
        />
        <Text style={tw`text-lg font-bold text-white`}>Jarvis</Text>
      </View>
      {messages.length > 0 ? (
        <ScrollView contentContainerStyle={tw`bg-black pb-[50px]`}>
          {messages.map((message, i) => {
            return <Message message={message} key={i} />;
          })}

          {isLoading && (
            <View style={tw`w-32 px-4 mt-7`}>
              <LoadingDots />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 justify-center items-center gap-y-6`}>
          <Image
            source={require('../assets/logo.jpeg')}
            style={tw`rounded-full w-40 h-40`}
          />
          <View style={tw`items-center gap-y-1`}>
            <Text style={tw`text-white text-xl font-bold`}>Jarvis</Text>
            <Text style={tw`text-gray-300`}>Your personal AI assistant</Text>
          </View>
        </View>
      )}
      <View
        style={tw`flex-row items-center w-full bottom-0 px-4 gap-x-4 bg-black z-10 h-[50px]`}>
        <TextInput
          style={tw`w-[85%] px-1.5 rounded-lg border-b border-b-white text-white`}
          placeholder="Type here..."
          placeholderTextColor={'#d1d5db'}
          value={input}
          onChangeText={text => setInput(text)}
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity onPress={handleSend} disabled={isLoading}>
          <Text style={tw`text-blue-600 font-bold text-base`}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
