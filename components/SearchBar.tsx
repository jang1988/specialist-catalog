import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { icons } from '@/constants/icons'

interface Props {
	onPress?: () => void;
	placeholder: string;
}

export default function SearchBar({ onPress, placeholder }: Props) {
	return (
		<View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
			<Image
				source={icons.search}
				className='size-5' resizeMode='contain' tintColor='#ab8bff'
			/>
			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				placeholderTextColor='#a8b5db'
				value=''
				onChangeText={() => {}}
				className='flex-1 ml-2 text-white'
			/>
		</View>
	);
}
