import {View} from 'react-native';
import React from 'react';
import {MessageType} from '../types';
import tw from 'twrnc';
import Markdown from 'react-native-markdown-display';

const Message = ({message}: {message: MessageType}) => {
  return (
    <View
      style={tw`${
        message.by === 'assistant' ? 'items-start' : 'items-end'
      } mb-2 px-2`}>
      <View
        style={tw`max-w-[90%] border-2 ${
          message.by === 'assistant'
            ? 'bg-blue-600 rounded-tl-none'
            : 'bg-gray-700 rounded-tr-none'
        } p-4.5 rounded-3xl h-auto`}>
        <Markdown
          style={{
            paragraph: {color: '#fff'},
            heading1: {color: '#fff'},
            heading2: {color: '#fff'},
            heading3: {color: '#fff'},
            heading4: {color: '#fff'},
            heading5: {color: '#fff'},
            heading6: {color: '#fff'},
            list_item: {color: '#fff'},
            blockquote: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 10,
            },
            code_inline: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 10,
            },
            code_block: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 10,
            },
            fence: {backgroundColor: '#000', color: '#fff', borderRadius: 10},
          }}>
          {message.message}
        </Markdown>
      </View>
    </View>
  );
};

export default Message;
