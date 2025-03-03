import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated, Easing } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface EmergencyButtonProps {
  onPress: () => void;
  type: 'medical' | 'police' | 'fire' | 'sos';
  label: string;
  color: string;
  icon: JSX.Element;
}

export default function EmergencyButton({ 
  onPress, 
  type, 
  label, 
  color, 
  icon 
}: EmergencyButtonProps) {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.pulseCircle,
          {
            backgroundColor: color,
            transform: [{ scale: pulseAnim }],
            opacity: 0.3,
          },
        ]}
      />
      <View style={styles.content}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pulseCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});