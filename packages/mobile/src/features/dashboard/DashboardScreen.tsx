import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDashboard } from './hooks/useDashboard';
import { CurrentWeather } from '../weather/components/CurrentWeather';
import { CitySelector } from '../weather/components/CitySelector';
import { AirQualityBadge } from './components/AirQualityBadge';
import { NewsTicker } from './components/NewsTicker';
import type { DailyForecast } from '@study-bff/shared';

/**
 * モバイル ダッシュボード画面
 *
 * BFFの /mobile/dashboard エンドポイントから、
 * 3つのサービスのデータを1回のリクエストで取得。
 *
 * Web版との違い:
 * - 天気: 3項目のみ + 日別予報（Web版は3時間毎の詳細）
 * - 大気品質: AQI数値のみ（Web版は各汚染物質の濃度も表示）
 * - ニュース: 最新3件のタイトルのみ（Web版は全文+URL）
 */
export function DashboardScreen() {
  const { data, loading, error, search } = useDashboard();

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
          <CurrentWeather city={data.city} weather={data.weather.current} />
          <AirQualityBadge data={data.airQuality} />
          <NewsTicker articles={data.news} />
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <FlatList
            data={data.weather.dailyForecast}
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
