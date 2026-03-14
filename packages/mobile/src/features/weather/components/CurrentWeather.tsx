import { View, Text, Image, StyleSheet } from 'react-native';
import type { CurrentWeatherSimple } from '@study-bff/shared';

interface CurrentWeatherProps {
  city: string;
  weather: CurrentWeatherSimple;
}

/**
 * モバイル向け現在天気コンポーネント
 *
 * Web版と比較すると:
 * - 表示項目が少ない (気温、天気、アイコンのみ)
 * - BFFが返すデータ自体が少ないため、UIもシンプルになる
 */
export function CurrentWeather({ city, weather }: CurrentWeatherProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.description}>{weather.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  icon: {
    width: 80,
    height: 80,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
