import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useWeather } from './hooks/useWeather';
import { CurrentWeather } from './components/CurrentWeather';
import { CitySelector } from './components/CitySelector';
import type { DailyForecast } from '@study-bff/shared';

/**
 * モバイル天気画面
 *
 * Web版との違い:
 * - BFFから受け取るデータが簡易版 (MobileWeatherResponse)
 * - 予報は日別 (Web版は3時間毎)
 * - UIコンポーネントが少ない (WeatherDetailsやmetaは無い)
 */
export function WeatherScreen() {
  const { data, loading, error, search } = useWeather();

  const renderForecastItem = ({ item }: { item: DailyForecast }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.forecastDate}>{item.date}</Text>
      <Text style={styles.forecastTemp}>
        {Math.round(item.high)}° / {Math.round(item.low)}°
      </Text>
      <Text style={styles.forecastDesc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CitySelector onSelect={search} loading={loading} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 40 }} />}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {data && (
        <>
          <CurrentWeather city={data.city} weather={data.current} />
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <FlatList
            data={data.dailyForecast}
            renderItem={renderForecastItem}
            keyExtractor={(item) => item.date}
            scrollEnabled={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 20,
    paddingBottom: 8,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  forecastDate: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastDesc: {
    fontSize: 14,
    color: '#888',
    width: 100,
    textAlign: 'right',
  },
  errorContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#ffe0e0',
    borderRadius: 8,
  },
  errorText: {
    color: '#c00',
  },
});
