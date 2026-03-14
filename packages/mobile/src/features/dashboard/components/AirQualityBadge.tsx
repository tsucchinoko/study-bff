import { View, Text, StyleSheet } from 'react-native';
import type { AirQualitySimple } from '@study-bff/shared';

interface AirQualityBadgeProps {
  data: AirQualitySimple | null;
}

const aqiColors: Record<number, string> = {
  1: '#4caf50',
  2: '#8bc34a',
  3: '#ff9800',
  4: '#f44336',
  5: '#9c27b0',
};

/**
 * 大気品質バッジ（モバイル版）
 *
 * Web版と比較:
 * - Web: AQI + 各汚染物質の濃度(pm2_5, pm10, no2...)を全て表示
 * - Mobile: AQI数値とラベルのみ（BFFが通信量を削減してくれている）
 */
export function AirQualityBadge({ data }: AirQualityBadgeProps) {
  if (!data) {
    return (
      <View style={styles.unavailable}>
        <Text style={styles.unavailableText}>大気品質: 取得できませんでした</Text>
      </View>
    );
  }

  const color = aqiColors[data.aqi] ?? '#888';

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.aqiNumber}>{data.aqi}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>大気品質: {data.label}</Text>
        <Text style={styles.advice}>{data.healthAdvice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aqiNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  advice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  unavailable: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 10,
  },
  unavailableText: {
    fontSize: 13,
    color: '#e65100',
  },
});
