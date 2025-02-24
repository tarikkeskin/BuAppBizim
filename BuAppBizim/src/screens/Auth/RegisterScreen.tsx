import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useAuth } from '../../hooks/auth/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { registerSchema, type RegisterFormData } from '../../utils/validation/auth';
import { z } from 'zod';

interface RegisterScreenProps {
  navigation: any; // We'll type this properly later
}

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    try {
      const validatedData = registerSchema.parse(formData);
      await register(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
      console.error(error);
    }
  };

  return (
    <SafeContainer>
      <FormContainer>
        <Input
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          error={errors.name}
          autoCapitalize="words"
        />
        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
          error={errors.password}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
          error={errors.confirmPassword}
          secureTextEntry
        />
        <Button 
          title="Register" 
          onPress={handleRegister}
          isLoading={isLoading}
        />
        <Button 
          title="Back to Login" 
          onPress={() => navigation.replace('Login')}
          variant="secondary"
        />
      </FormContainer>
    </SafeContainer>
  );
}

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FormContainer = styled(View)`
  flex: 1;
  padding: 20px;
  justify-content: center;
`; 