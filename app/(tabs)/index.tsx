import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Phone, Ambulance, Shield, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function HomeScreen() {
  const [location, setLocation] = useState('Determining your location...');
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    // Simulate getting location
    const timer = setTimeout(() => {
      setLocation('123 Main Street, New York, NY 10001');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmergency = (type: string) => {
    setIsEmergency(true);
    
    // Simulate emergency response
    setTimeout(() => {
      router.push({
        pathname: '/(tabs)/alerts',
        params: { type, active: 'true' }
      });
      setIsEmergency(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>CURRENT LOCATION</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {isEmergency ? (
        <View style={styles.emergencyActiveContainer}>
          <Text style={styles.emergencyActiveText}>Contacting Emergency Services...</Text>
          <View style={styles.pulsingCircle} />
        </View>
      ) : (
        <View style={styles.emergencyButtonsContainer}>
          <Text style={styles.sectionTitle}>EMERGENCY ASSISTANCE</Text>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, styles.medicalButton]} 
            onPress={() => handleEmergency('medical')}
          >
            <Ambulance size={32} color="#fff" />
            <Text style={styles.emergencyButtonText}>Medical Emergency</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, styles.policeButton]} 
            onPress={() => handleEmergency('police')}
          >
            <Shield size={32} color="#fff" />
            <Text style={styles.emergencyButtonText}>Police Assistance</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, styles.fireButton]} 
            onPress={() => handleEmergency('fire')}
          >
            <AlertTriangle size={32} color="#fff" />
            <Text style={styles.emergencyButtonText}>Fire Emergency</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, styles.sosButton]} 
            onPress={() => handleEmergency('sos')}
          >
            <Phone size={32} color="#fff" />
            <Text style={styles.emergencyButtonText}>SOS Call</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>EMERGENCY TIPS</Text>
        <View style={styles.tipCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
            style={styles.tipImage} 
          />
          <Text style={styles.tipTitle}>Stay Calm During Emergencies</Text>
          <Text style={styles.tipText}>
            Taking deep breaths and focusing on the immediate actions needed can help you respond more effectively.
          </Text>
        </View>
        
        <View style={styles.tipCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
            style={styles.tipImage} 
          />
          <Text style={styles.tipTitle}>Create an Emergency Plan</Text>
          <Text style={styles.tipText}>
            Ensure your family knows what to do and where to meet in case of different emergency scenarios.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  emergencyButtonsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#34495e',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  medicalButton: {
    backgroundColor: '#e74c3c',
  },
  policeButton: {
    backgroundColor: '#3498db',
  },
  fireButton: {
    backgroundColor: '#e67e22',
  },
  sosButton: {
    backgroundColor: '#9b59b6',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emergencyActiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    margin: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyActiveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pulsingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    borderColor: '#fff',
  },
  infoSection: {
    padding: 15,
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipImage: {
    width: '100%',
    height: 150,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 5,
    color: '#2c3e50',
  },
  tipText: {
    fontSize: 14,
    padding: 15,
    paddingTop: 5,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});