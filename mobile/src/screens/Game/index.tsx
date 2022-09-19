import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { Text } from 'react-native';
import { styles } from './styles';

export function Game() {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text>Hello world!!!!</Text>
      </SafeAreaView>
      ;
    </Background>
  );
}
