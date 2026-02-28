import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { destinations } from '../data/destinations';

/* ---------- TYPES ---------- */
type DestinationRouteParams = {
  Destination: {
    destinationId: keyof typeof destinations;
  };
};

/* ---------- SCREEN ---------- */
const DestinationScreen = () => {
  const route =
    useRoute<RouteProp<DestinationRouteParams, 'Destination'>>();
  const navigation = useNavigation<any>();

  /* ✅ SAFE ACCESS */
  const destinationId = route.params?.destinationId;
  const destination = destinationId
    ? destinations[destinationId]
    : undefined;

  /* ✅ FAIL-SAFE UI (NO CRASH) */
  if (!destination) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          No destination selected
        </Text>

        <TouchableOpacity
          style={styles.backFallback}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backFallbackText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroWrapper}>
        <Image source={destination.image} style={styles.heroImage} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Title Overlay */}
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>
            {destination.name}
          </Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.glassCard}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {destination.description}
        </Text>
      </View>

      {/* Things To Do */}
      <Text style={styles.sectionTitle}>Things to Do</Text>

      {destination.thingsToDo.map((item, index) => (
        <View key={index} style={styles.todoCard}>
          <Text style={styles.todoText}>• {item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DestinationScreen;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A25',
  },

  center: {
    flex: 1,
    backgroundColor: '#0E1A25',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },

  backFallback: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#C8F000',
  },

  backFallbackText: {
    color: '#000',
    fontWeight: '700',
  },

  /* Hero */
  heroWrapper: {
    height: 300,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },

  backBtn: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#fff',
    fontSize: 20,
  },

  /* Glass Card */
  glassCard: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    color: '#C7D3E0',
    fontSize: 14,
    lineHeight: 22,
  },

  /* Things To Do */
  todoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  todoText: {
    color: '#EAF1FA',
    fontSize: 14,
  },
});
