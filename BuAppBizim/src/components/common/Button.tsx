import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', isLoading }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, variant === 'secondary' && styles.secondaryButton]} 
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#007AFF',
  },
}); 