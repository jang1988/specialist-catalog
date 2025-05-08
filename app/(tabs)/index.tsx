import { useRouter } from 'expo-router';
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	Text,
	View,
} from 'react-native';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { images } from '@/constants/images';
import { supabase } from '@/utils/supabase';
import useFetch from '@/utils/useFetch';

const fetchDistributors = async () => {
  const { data, error } = await supabase
    .from('distributors-card')
    .select('*')
		.ilike('name', `%${''}%`)
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
};

export default function Index() {
	const router = useRouter();

	const {
		data: distributorsCard,
		loading: loadingCard,
		error: errorLoadingCard,
	} = useFetch(fetchDistributors);

	return (
		<View className='flex-1 bg-primary'>
			<Image source={images.bg} className='absolute w-full z-0' />
			<ScrollView
				className='flex-1 px-5'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
			>
				<Image
					source={images.logo}
					className='w-[100px] h-[100px] mt-12 mb-5 mx-auto'
				/>

				{loadingCard ? (
					<ActivityIndicator
						size={'large'}
						color='#000fff'
						className='mt-10 self-center'
					/>
				) : errorLoadingCard ? (
					<Text className='text-white text-center mt-10'>ERROR</Text>
				) : (
					<View className='flex-1 mt-5'>
						<SearchBar
							onPress={() => router.push('/search')}
							placeholder='Search product'
						/>
						<>
							<Text className='text-white text-lg font-bold mt-5 mb-3'>
								PRODUCTS
							</Text>
							<FlatList
								data={distributorsCard || []}
								renderItem={({ item }) => <ProductCard {...item} />}
								keyExtractor={item => item.id.toString()}
								numColumns={2}
								columnWrapperStyle={{
									justifyContent: 'center',
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
								}}
								className='mt-2 pb-32'
								scrollEnabled={false}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
