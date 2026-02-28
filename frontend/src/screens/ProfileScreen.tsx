import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/icons/profile.png')} // add a placeholder image
            style={styles.avatar}
          />
          <Text style={styles.name}>Traveler</Text>
          <Text style={styles.location}>📍 Trivandrum</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Places</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Plans</Text>
          </View>
        </View>

        {/* Saved Itineraries */}
        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>📌 Saved Itineraries</Text>
          <Text style={styles.sectionText}>
            Your generated itineraries will appear here.
          </Text>
        </View>

        {/* Settings */}
        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Travel Preferences</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#111F2C',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  location: {
    fontSize: 14,
    color: '#B5C2D1',
    marginTop: 4,
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#C8F000',
  },

  statLabel: {
    fontSize: 13,
    color: '#C7D3E0',
    marginTop: 4,
  },

  /* Glass Cards */
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  sectionText: {
    fontSize: 14,
    color: '#C7D3E0',
  },

  /* Options */
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },

  optionText: {
    fontSize: 15,
    color: '#EAF1FA',
  },

  /* Logout */
  logoutBtn: {
    backgroundColor: 'rgba(255,0,0,0.15)',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
});
