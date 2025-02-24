import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useAuth } from '../../hooks/auth/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { loginSchema, type LoginFormData } from '../../utils/validation/auth';
import { z } from 'zod';

interface LoginScreenProps {
  navigation: any; // We'll type this properly with navigation types later
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      const validatedData = loginSchema.parse(formData);
      await login(validatedData.email, validatedData.password);
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
        <Button 
          title="Login" 
          onPress={handleLogin}
          isLoading={isLoading}
        />
        <Button 
          title="Register" 
          onPress={() => navigation.replace('Register')}
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