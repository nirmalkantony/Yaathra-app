import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const BOTTOM_NAV_SPACE = 120;

/* Categories */
const categories = ['All', 'Beach', 'Temple', 'Nature'];

/* Places with destinationId */
const PLACES = {
  Featured: [
    {
      id: '1',
      name: 'Kovalam Beach',
      destinationId: 'kovalam',
      image: require('../assets/onboarding1.png'),
    },
    {
      id: '2',
      name: 'Ponmudi Hills',
      destinationId: 'ponmudi',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '3',
      name: 'Padmanabhaswamy Temple',
      destinationId: 'padmanabhaswamy',
      image: require('../assets/onboarding2.png'),
    },
  ],

  Beach: [
    {
      id: '4',
      name: 'Kovalam Beach',
      destinationId: 'kovalam',
      image: require('../assets/onboarding1.png'),
    },
    {
      id: '5',
      name: 'Shanghumukham Beach',
      destinationId: 'shanghumukham',
      image: require('../assets/onboarding1.png'),
    },
    {
      id: '6',
      name: 'Varkala Cliff',
      destinationId: 'varkala',
      image: require('../assets/onboarding1.png'),
    },
  ],

  Temple: [
    {
      id: '7',
      name: 'Padmanabhaswamy Temple',
      destinationId: 'padmanabhaswamy',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '8',
      name: 'Attukal Bhagavathy Temple',
      destinationId: 'attukal',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '9',
      name: 'Vizhinjam Cave Temple',
      destinationId: 'vizhinjam',
      image: require('../assets/onboarding2.png'),
    },
  ],

  Nature: [
    {
      id: '10',
      name: 'Ponmudi Hills',
      destinationId: 'ponmudi',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '11',
      name: 'Peppara Dam',
      destinationId: 'peppara',
      image: require('../assets/onboarding2.png'),
    },
    {
      id: '12',
      name: 'Meenmutty Waterfalls',
      destinationId: 'meenmutty',
      image: require('../assets/onboarding2.png'),
    },
  ],
};

const ExploreScreen = () => {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const renderSlider = (title: string, data: any[]) => {
    return (
      <View style={{ marginBottom: 28 }}>
        <Text style={styles.sectionTitle}>{title}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(place => (
            <TouchableOpacity
              key={place.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.getParent()?.navigate('Destination', {
                  destinationId: place.destinationId,
                })
              }
            >
              <Image source={place.image} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardText}>{place.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: BOTTOM_NAV_SPACE }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.smallTitle}>Explore ✈️</Text>
      <Text style={styles.heading}>New Journey</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search destinations"
          placeholderTextColor="#9BB1C8"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.category,
              activeCategory === cat && styles.categoryActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      {activeCategory === 'All' && (
        <>
          {renderSlider('🔥 Featured', PLACES.Featured)}
          {renderSlider('🌊 Beaches', PLACES.Beach)}
          {renderSlider('🛕 Temples', PLACES.Temple)}
          {renderSlider('🌿 Nature & Hills', PLACES.Nature)}
        </>
      )}

      {activeCategory !== 'All' &&
        renderSlider(
          activeCategory,
          PLACES[activeCategory as keyof typeof PLACES],
        )}
    </ScrollView>
  );
};

export default ExploreScreen;

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A25',
    padding: 20,
  },

  smallTitle: {
    color: '#9BB1C8',
    fontSize: 14,
  },

  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },

  category: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 12,
    marginBottom: 22,
  },

  categoryActive: {
    backgroundColor: '#C8F000',
  },

  categoryText: {
    color: '#ccc',
    fontSize: 14,
  },

  categoryTextActive: {
    color: '#000',
    fontWeight: '600',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 14,
  },

  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 22,
    marginRight: 16,
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '100%',
  },

  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 14,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
