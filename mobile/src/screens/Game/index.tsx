import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';

import { THEME } from '../../theme';
import { styles } from './styles';
import { Background } from '../../components/Background';

import { Entypo } from '@expo/vector-icons';
import { Heading } from '../../components/Heading';
import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { getAds } from '../../services/api';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const [ads, setAds] = useState<DuoCardProps[]>([]);

  useEffect(() => {
    getAds(game.id, setAds);
  }, []);

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            ads.length > 0 ? styles.contentList : styles.emptyListContent
          }
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => console.log('abriu modal')} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
