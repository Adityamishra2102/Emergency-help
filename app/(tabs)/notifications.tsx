import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity } from 'react-native';
import { Bell, BellOff, Check, Clock, Info } from 'lucide-react-native';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Emergency Alert',
      message: 'Medical emergency reported at your location. Help is on the way.',
      time: '2 hours ago',
      read: false,
      type: 'alert',
    },
    {
      id: '2',
      title: 'Contact Added',
      message: 'Jane Smith has been added to your emergency contacts.',
      time: '1 day ago',
      read: true,
      type: 'success',
    },
    {
      id: '3',
      title: 'System Update',
      message: 'Emergency Help App has been updated with new features.',
      time: '3 days ago',
      read: true,
      type: 'info',
    },
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const getIconForType = (type: string, size: number) => {
    switch (type) {
      case 'alert':
        return <Bell size={size} color="#e74c3c" />;
      case 'success':
        return <Check size={size} color="#27ae60" />;
      case 'info':
        return <Info size={size} color="#3498db" />;
      default:
        return <Bell size={size} color="#7f8c8d" />;
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>{getIconForType(item.type, 24)}</View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <View style={styles.notificationTimeContainer}>
          <Clock size={12} color="#7f8c8d" />
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.notificationToggle}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#bdc3c7', true: '#3498db' }}
            thumbColor={notificationsEnabled ? '#fff' : '#ecf0f1'}
          />
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllReadButton} onPress={markAllAsRead}>
            <Text style={styles.markAllReadText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {!notificationsEnabled && (
        <View style={styles.disabledNotice}>
          <BellOff size={24} color="#7f8c8d" />
          <Text style={styles.disabledText}>Notifications are currently disabled</Text>
          <Text style={styles.disabledSubtext}>
            You won't receive alerts about emergencies or app updates
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Bell size={64} color="#bdc3c7" />
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubtext}>
              You'll see notifications about emergencies and app updates here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  notificationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  markAllReadButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  markAllReadText: {
    color: '#3498db',
    fontWeight: '500',
  },
  disabledNotice: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 10,
  },
  disabledSubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
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
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  readNotification: {
    opacity: 0.8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
  },
  notificationTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 10,
  },
});