import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginInput } from '../lib/validation';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [errors, setErrors] = useState<Partial<LoginInput> & { general?: string }>({});
  const [formData, setFormData] = useState<LoginInput>({
    whatsapp: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validData = loginSchema.parse(formData);
      await login(validData);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: 'Error al iniciar sesión. Por favor, intenta de nuevo.' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  return (
    <AuthLayout 
      title="Bienvenido de vuelta"
      subtitle="Accede a tu tienda online"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {errors.general}
          </div>
        )}
        <Input
          label="WhatsApp"
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          error={errors.whatsapp}
          placeholder="+1234567890"
          required
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          required
        />
        <Button type="submit" isLoading={isLoading}>
          Iniciar sesión
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Regístrate
        </Link>
      </p>
    </AuthLayout>
  );
}