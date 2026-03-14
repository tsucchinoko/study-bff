import { View, Text, StyleSheet } from 'react-native';
import type { NewsArticleSimple } from '@study-bff/shared';

interface NewsTickerProps {
  articles: NewsArticleSimple[];
}

const categoryColors: Record<string, string> = {
  weather_alert: '#e53935',
  local_event: '#1e88e5',
  tourism: '#43a047',
};

/**
 * ニュースティッカー（モバイル版）
 *
 * Web版と比較:
 * - Web: 全記事の本文(summary)・URL・日時を表示
 * - Mobile: 最新3件のタイトルのみ（BFFが件数制限 + 不要フィールドを除去）
 */
export function NewsTicker({ articles }: NewsTickerProps) {
  if (articles.length === 0) {
    return (
      <View style={styles.unavailable}>
        <Text style={styles.unavailableText}>ニュース: 取得できませんでした</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>News</Text>
      {articles.map((article) => (
        <View key={article.id} style={styles.item}>
          <View
            style={[
              styles.dot,
              { backgroundColor: categoryColors[article.category] ?? '#888' },
            ]}
          />
          <Text style={styles.title} numberOfLines={1}>
            {article.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  title: {
    flex: 1,
    fontSize: 13,
    color: '#333',
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
