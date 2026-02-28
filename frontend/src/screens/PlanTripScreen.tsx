import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const interestsList = ['Beach', 'Temple', 'Nature', 'Food', 'Adventure'];
const durations = ['Half Day', 'Full Day', '2 Days', '3 Days'];
const budgets = ['Low', 'Medium', 'High'];
const groups = ['Solo', 'Couple', 'Family', 'Friends'];
const locations = ['Thampanoor', 'PMG', 'East Fort', 'Airport'];

const PlanTripScreen = () => {
  const [duration, setDuration] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [group, setGroup] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [startLocation, setStartLocation] = useState('Thampanoor');

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(i => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.heading}>Plan Your Trip 🧭</Text>
        <Text style={styles.subHeading}>
          Tell us your preferences
        </Text>

        {/* Duration */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>⏱ Trip Duration</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={duration}
              onValueChange={setDuration}
              dropdownIconColor="#C7D3E0"
            >
              <Picker.Item label="Select Duration" value="" />
              {durations.map(d => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Starting Location */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>📍 Starting Location</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={startLocation}
              onValueChange={setStartLocation}
              dropdownIconColor="#C7D3E0"
            >
              {locations.map(loc => (
                <Picker.Item key={loc} label={loc} value={loc} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Return Time */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>⏰ Return Time</Text>
          <TextInput
            placeholder="Eg: 6:30 PM"
            placeholderTextColor="#8FA1B5"
            value={returnTime}
            onChangeText={setReturnTime}
            style={styles.input}
          />
        </View>

        {/* Interests */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>
            🎯 Interests (Select multiple)
          </Text>
          <View style={styles.rowWrap}>
            {interestsList.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  selectedInterests.includes(item) &&
                    styles.selectedChip,
                ]}
                onPress={() => toggleInterest(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedInterests.includes(item) &&
                      styles.selectedChipText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>💰 Budget</Text>
          <View style={styles.rowWrap}>
            {budgets.map(b => (
              <TouchableOpacity
                key={b}
                style={[
                  styles.option,
                  budget === b && styles.selectedOption,
                ]}
                onPress={() => setBudget(b)}
              >
                <Text
                  style={[
                    styles.optionText,
                    budget === b && styles.selectedOptionText,
                  ]}
                >
                  {b}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Group */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>👥 Travel Group</Text>
          <View style={styles.rowWrap}>
            {groups.map(g => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.option,
                  group === g && styles.selectedOption,
                ]}
                onPress={() => setGroup(g)}
              >
                <Text
                  style={[
                    styles.optionText,
                    group === g && styles.selectedOptionText,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate */}
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>
            ✨ Generate Itinerary
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanTripScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#111F2C',
    padding: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subHeading: {
    fontSize: 14,
    color: '#B5C2D1',
    marginBottom: 20,
  },

  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
  },

  pickerBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    overflow: 'hidden',
  },

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedChip: {
    backgroundColor: '#1B9CFC',
  },

  chipText: {
    color: '#C7D3E0',
  },

  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  option: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedOption: {
    backgroundColor: '#1B9CFC',
  },

  optionText: {
    color: '#C7D3E0',
    fontWeight: '500',
  },

  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  generateBtn: {
    backgroundColor: '#C8F000',
    padding: 18,
    borderRadius: 18,
    marginTop: 16,
  },

  generateText: {
    color: '#111F2C',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
});
