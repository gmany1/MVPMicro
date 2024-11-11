// Categorías unificadas para toda la plataforma
export const STORE_CATEGORIES = [
  'Ropa y Accesorios',
  'Electrónica',
  'Alimentos y Bebidas',
  'Frutas y Verduras',
  'Carnicería',
  'Panadería',
  'Servicios Profesionales',
  'Belleza y Cuidado Personal',
  'Hogar y Decoración',
  'Deportes',
  'Juguetes',
  'Mascotas',
  'Libros y Papelería',
  'Artesanías',
  'Joyería',
  'Ferretería',
  'Farmacia',
  'Servicios de Salud',
  'Servicios Educativos',
  'Servicios de Limpieza',
  'Servicios de Transporte',
  'Servicios de Mantenimiento',
  'Otros'
] as const;

export type StoreCategory = typeof STORE_CATEGORIES[number];