import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationDisplayProps {
  initialLocation?: string;
}

export default function LocationDisplay({ initialLocation }: LocationDisplayProps) {
  const [location, setLocation] = useState<string | null>(initialLocation || null);
  const [loading, setLoading] = useState(!initialLocation);

  useEffect(() => {
    if (!initialLocation) {
      // Simulate getting location
      const timer = setTimeout(() => {
        setLocation('123 Main Street, New York, NY 10001');
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [initialLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CURRENT LOCATION</Text>
      <View style={styles.locationRow}>
        <MapPin size={18} color="#e74c3c" />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#e74c3c" />
            <Text style={styles.loadingText}>Determining your location...</Text>
          </View>
        ) : (
          <Text style={styles.locationText}>{location}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 10,
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 10,
  },
});