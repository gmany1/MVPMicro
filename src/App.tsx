import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import Store from './pages/Store';
import StoreView from './pages/StoreView';
import Stores from './pages/Stores';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/store/:storeId" element={<StoreView />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/store" element={
            <PrivateRoute roles={['seller']}>
              <Store />
            </PrivateRoute>
          } />
          <Route path="/dashboard/products" element={
            <PrivateRoute roles={['seller']}>
              <Products />
            </PrivateRoute>
          } />
          <Route path="/dashboard/orders" element={
            <PrivateRoute roles={['seller']}>
              <Orders />
            </PrivateRoute>
          } />
          <Route path="/dashboard/stores" element={
            <PrivateRoute roles={['admin']}>
              <Stores />
            </PrivateRoute>
          } />
          <Route path="/dashboard/users" element={
            <PrivateRoute roles={['admin']}>
              <Users />
            </PrivateRoute>
          } />
          <Route path="/dashboard/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;