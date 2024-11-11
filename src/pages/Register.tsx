import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterInput } from '../lib/validation';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [errors, setErrors] = useState<Partial<RegisterInput>>({});
  const [formData, setFormData] = useState<RegisterInput>({
    fullName: '',
    whatsapp: '',
    password: '',
    storeName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validData = registerSchema.parse(formData);
      await register(validData);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ password: error.message });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <AuthLayout 
      title="Crea tu tienda online"
      subtitle="Comienza tu viaje emprendedor hoy mismo"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre completo"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Juan Pérez"
          required
        />
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
        <Input
          label="Nombre de tu tienda"
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          error={errors.storeName}
          placeholder="Mi Tienda Online"
          required
        />
        <Button type="submit" isLoading={isLoading}>
          Registrarse
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
}