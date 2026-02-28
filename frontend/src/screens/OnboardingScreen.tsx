import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Plan your trips with ease\nand confidence',
    description: 'Build your itinerary in minutes, not hours.',
    image: require('../assets/onboarding1.png'),
    type: 'full',
  },
  {
    id: '2',
    title: 'Find perfect destination\nfor every mood',
    description: 'Explore places you never knew before.',
    images: [
      require('../assets/onboarding2.png'),
      require('../assets/onboarding3.png'),
      require('../assets/onboarding1.png'),
      require('../assets/onboarding2.png'),
    ],
    type: 'grid',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const renderSlide = ({ item }: any) => {
    if (item.type === 'full') {
      return (
        <View style={styles.slide}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
          </View>
          <Text style={styles.titleDark}>{item.title}</Text>
          <Text style={styles.subtitleDark}>{item.description}</Text>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <View style={styles.gridCard}>
          <View style={styles.grid}>
            {item.images.map((img: any, index: number) => (
              <Image key={index} source={img} style={styles.gridImage} />
            ))}
          </View>
        </View>
        <Text style={styles.titleDark}>{item.title}</Text>
        <Text style={styles.subtitleDark}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={renderSlide}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (currentIndex === slides.length - 1) {
            // FIXED: Changed 'Main' to 'Home' to match AppNavigator
            navigation.replace('Home');
          } else {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
          }
        }}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    paddingTop: 80,
  },
  /* CARD IMAGE */
  card: {
    width: width - 60,
    height: height * 0.45,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  /* GRID CARD */
  gridCard: {
    width: width - 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 12,
    elevation: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImage: {
    width: (width - 100) / 2,
    height: 150,
    borderRadius: 16,
    marginBottom: 10,
  },
  /* TEXT */
  titleDark: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 30,
    textAlign: 'center',
    color: '#1E1E1E',
    paddingHorizontal: 30,
  },
  subtitleDark: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  /* DOTS */
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 110,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#BFDFFF',
    margin: 6,
  },
  activeDot: {
    backgroundColor: '#1B9CFC',
    width: 18,
  },
  /* BUTTON */
  button: {
    backgroundColor: '#1B9CFC',
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: width - 80,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});