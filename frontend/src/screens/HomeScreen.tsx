import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['Beach', 'Temple', 'Nature', 'Food'];

const places = [
  {
    id: '1',
    name: 'Kovalam Beach',
    image: require('../assets/onboarding1.png'),
    rating: '4.8',
    destinationId: 'kovalam',
  },
  {
    id: '2',
    name: 'Padmanabhaswamy Temple',
    image: require('../assets/onboarding2.png'),
    rating: '4.9',
    destinationId: 'padmanabhaswamy',
  },
  {
    id: '3',
    name: 'Ponmudi Hills',
    image: require('../assets/onboarding2.png'),
    rating: '4.7',
    destinationId: 'ponmudi',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 170 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.greeting}>Hello, Traveler 👋</Text>
        <Text style={styles.subtitle}>Explore Trivandrum</Text>

        {/* Travel Tip */}
        <View style={styles.glassCard}>
          <Text style={styles.tipTitle}>🧭 Travel Tip</Text>
          <Text style={styles.tipText}>
            Early mornings are best for temples and beaches.
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Chatbot')}
          >
            <Text style={styles.tipCTA}>Ask Travel Guide →</Text>
          </TouchableOpacity>
        </View>

        {/* Generate Itinerary */}
        <View style={styles.itineraryCard}>
          <Text style={styles.itineraryTitle}>🗺️ Generate Itinerary</Text>
          <Text style={styles.itineraryText}>
            Create a personalized one-day travel plan instantly.
          </Text>

          <TouchableOpacity
            style={styles.itineraryButton}
            onPress={() =>
              navigation.navigate('Chatbot', {
                intent: 'itinerary',
                city: 'Trivandrum',
              })
            }
          >
            <Text style={styles.itineraryButtonText}>
              Generate Itinerary
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
        >
          {categories.map((cat, index) => (
            <View key={index} style={styles.category}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Popular Places */}
        <Text style={styles.sectionTitle}>Popular Places</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {places.map(place => (
            <TouchableOpacity
              key={place.id}
              style={styles.placeCard}
              onPress={() =>
                navigation.navigate('Destination', {
                  destinationId: place.destinationId,
                })
              }
            >
              <Image source={place.image} style={styles.placeImage} />

              <View style={styles.overlay}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.rating}>⭐ {place.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#111F2C',
  },

  container: {
    padding: 20,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 15,
    color: '#B5C2D1',
    marginBottom: 18,
  },

  /* Travel Tip */
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  tipText: {
    fontSize: 14,
    color: '#C7D3E0',
    lineHeight: 20,
  },

  tipCTA: {
    marginTop: 8,
    color: '#8FD3FF',
    fontWeight: '600',
  },

  /* Itinerary */
  itineraryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  itineraryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },

  itineraryText: {
    fontSize: 14,
    color: '#C7D3E0',
    lineHeight: 20,
    marginBottom: 12,
  },

  itineraryButton: {
    backgroundColor: '#C8F000',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },

  itineraryButtonText: {
    color: '#111F2C',
    fontSize: 15,
    fontWeight: '700',
  },

  /* Categories */
  categoryRow: {
    marginBottom: 22,
  },

  category: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  categoryText: {
    fontSize: 13,
    color: '#E2EBF5',
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  /* Places */
  placeCard: {
    width: 220,
    height: 280,
    borderRadius: 20,
    marginRight: 14,
    overflow: 'hidden',
  },

  placeImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  placeName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  rating: {
    color: '#D1DCE8',
    marginTop: 2,
    fontSize: 13,
  },
});
