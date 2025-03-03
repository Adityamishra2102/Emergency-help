import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock, MapPin } from 'lucide-react-native';

type Alert = {
  id: string;
  type: string;
  status: 'active' | 'resolved';
  location: string;
  time: string;
  responders?: string[];
  eta?: string;
};

export default function AlertsScreen() {
  const params = useLocalSearchParams();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  useEffect(() => {
    // Initial alerts
    const initialAlerts: Alert[] = [
      {
        id: '1',
        type: 'medical',
        status: 'resolved',
        location: '123 Main St, New York, NY',
        time: '2023-05-15 14:30',
      },
      {
        id: '2',
        type: 'police',
        status: 'resolved',
        location: '456 Park Ave, New York, NY',
        time: '2023-05-10 09:15',
      }
    ];
    
    setAlerts(initialAlerts);
    
    // Add new alert if coming from emergency button
    if (params.type && params.active === 'true') {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: params.type as string,
        status: 'active',
        location: '123 Main Street, New York, NY 10001',
        time: new Date().toLocaleString(),
        responders: ['Ambulance #42', 'Dr. Smith'],
        eta: '5 minutes',
      };
      
      setAlerts(prev => [newAlert, ...prev]);
    }
  }, [params.type, params.active]);

  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, status: 'resolved' } 
          : alert
      )
    );
  };

  const renderAlertItem = ({ item }: { item: Alert }) => {
    const isActive = item.status === 'active';
    
    const getTypeLabel = (type: string) => {
      switch (type) {
        case 'medical': return 'Medical Emergency';
        case 'police': return 'Police Assistance';
        case 'fire': return 'Fire Emergency';
        case 'sos': return 'SOS Call';
        default: return 'Emergency';
      }
    };
    
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'medical': return '#e74c3c';
        case 'police': return '#3498db';
        case 'fire': return '#e67e22';
        case 'sos': return '#9b59b6';
        default: return '#2c3e50';
      }
    };
    
    return (
      <View style={[
        styles.alertItem, 
        isActive ? styles.activeAlert : styles.resolvedAlert
      ]}>
        <View style={styles.alertHeader}>
          <View style={[styles.alertTypeTag, { backgroundColor: getTypeColor(item.type) }]}>
            <Text style={styles.alertTypeText}>{getTypeLabel(item.type)}</Text>
          </View>
          <Text style={styles.alertStatus}>
            {isActive ? 'ACTIVE' : 'RESOLVED'}
          </Text>
        </View>
        
        <View style={styles.alertDetails}>
          <View style={styles.alertDetailRow}>
            <MapPin size={16} color="#7f8c8d" />
            <Text style={styles.alertDetailText}>{item.location}</Text>
          </View>
          
          <View style={styles.alertDetailRow}>
            <Clock size={16} color="#7f8c8d" />
            <Text style={styles.alertDetailText}>{item.time}</Text>
          </View>
        </View>
        
        {isActive && item.responders && (
          <View style={styles.respondersContainer}>
            <Text style={styles.respondersTitle}>Responders:</Text>
            {item.responders.map((responder, index) => (
              <Text key={index} style={styles.responderText}>• {responder}</Text>
            ))}
            {item.eta && (
              <Text style={styles.etaText}>ETA: {item.eta}</Text>
            )}
          </View>
        )}
        
        {isActive && (
          <TouchableOpacity 
            style={styles.resolveButton}
            onPress={() => resolveAlert(item.id)}
          >
            <CheckCircle size={16} color="#fff" />
            <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {alerts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AlertCircle size={64} color="#bdc3c7" />
          <Text style={styles.emptyText}>No alerts to display</Text>
          <Text style={styles.emptySubtext}>
            Your emergency alerts will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={alerts}
          renderItem={renderAlertItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  alertItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeAlert: {
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  resolvedAlert: {
    borderLeftWidth: 5,
    borderLeftColor: '#27ae60',
    opacity: 0.8,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertTypeTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  alertTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  alertStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  alertDetails: {
    marginBottom: 10,
  },
  alertDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  alertDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#34495e',
  },
  respondersContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  respondersTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#2c3e50',
  },
  responderText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 3,
  },
  etaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
  resolveButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  resolveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 10,
  },
});