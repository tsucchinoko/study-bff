import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CitySelectorProps {
  onSelect: (city: string) => void;
  loading: boolean;
}

const CITIES = ['Tokyo', 'Osaka', 'London', 'New York', 'Paris'];

/**
 * モバイル向け都市選択（タップUI）
 *
 * Web版ではテキスト入力だが、
 * モバイルではタップで都市を選択する方がUXが良い
 */
export function CitySelector({ onSelect, loading }: CitySelectorProps) {
  return (
    <View style={styles.container}>
      {CITIES.map((city) => (
        <TouchableOpacity
          key={city}
          style={styles.button}
          onPress={() => onSelect(city)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{city}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0066cc',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
