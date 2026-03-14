import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { WeatherScreen } from './features/weather/WeatherScreen';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Weather</Text>
        <Text style={styles.subtitle}>BFF Study - Mobile</Text>
      </View>
      <WeatherScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
});

registerRootComponent(App);
