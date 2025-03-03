import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Settings, User, MapPin, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    locationSharing: true,
    notifications: true,
    soundAlerts: true,
    vibration: true,
    autoEmergencyCall: false,
    darkMode: false,
    biometricAuth: true,
    dataSync: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const renderSettingItem = (
    icon: JSX.Element,
    title: string,
    description: string,
    settingKey: keyof typeof settings
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={settings[settingKey]}
        onValueChange={(value) => updateSetting(settingKey, value)}
        trackColor={{ false: '#bdc3c7', true: '#3498db' }}
        thumbColor={settings[settingKey] ? '#fff' : '#ecf0f1'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <User size={24} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        {renderSettingItem(
          <MapPin size={20} color="#3498db" />,
          'Location Sharing',
          'Allow the app to access your location for emergency services',
          'locationSharing'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderSettingItem(
          <Bell size={20} color="#e74c3c" />,
          'Push Notifications',
          'Receive alerts about emergencies and updates',
          'notifications'
        )}
        {renderSettingItem(
          <Bell size={20} color="#e74c3c" />,
          'Sound Alerts',
          'Play sound when emergency notifications arrive',
          'soundAlerts'
        )}
        {renderSettingItem(
          <Bell size={20} color="#e74c3c" />,
          'Vibration',
          'Vibrate when emergency notifications arrive',
          'vibration'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Settings</Text>
        {renderSettingItem(
          <Shield size={20} color="#9b59b6" />,
          'Auto Emergency Call',
          'Automatically call emergency services in critical situations',
          'autoEmergencyCall'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        {renderSettingItem(
          <Settings size={20} color="#2c3e50" />,
          'Dark Mode',
          'Use dark theme throughout the app',
          'darkMode'
        )}
        {renderSettingItem(
          <Shield size={20} color="#2c3e50" />,
          'Biometric Authentication',
          'Use fingerprint or face ID to secure the app',
          'biometricAuth'
        )}
        {renderSettingItem(
          <Settings size={20} color="#2c3e50" />,
          'Data Synchronization',
          'Sync your data across multiple devices',
          'dataSync'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.supportItem}>
          <HelpCircle size={20} color="#7f8c8d" />
          <Text style={styles.supportItemText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportItem}>
          <HelpCircle size={20} color="#7f8c8d" />
          <Text style={styles.supportItemText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportItem}>
          <HelpCircle size={20} color="#7f8c8d" />
          <Text style={styles.supportItemText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Emergency Help App v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileEmail: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  settingIcon: {
    width: 35,
  },
  settingContent: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 16,
    color: '#2c3e50',
  },
  settingDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  supportItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    marginHorizontal: 15,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#7f8c8d',
  }
});