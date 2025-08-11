import { ExclusiveResponse } from '../types/exclusive';

export const mockExclusiveProperties = [
  {
    id: '1',
    title: 'Virrey Loreto 1740',
    address: 'Virrey Loreto 1740',
    neighborhood: 'Belgrano',
    description: '3 y 4 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_5.png',
    isLarge: true
  },
  {
    id: '2',
    title: 'Sanchez de Bustamante 1745',
    address: 'Sanchez de Bustamante 1745',
    neighborhood: 'Barrio Norte',
    description: '3 y 4 ambientes',
    price: 'U$S 83.504',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_1.png'
  },
  {
    id: '3',
    title: 'Ciudad de la Paz 450',
    address: 'Ciudad de la Paz 450',
    neighborhood: 'Belgrano',
    description: '3 y 4 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_1.png'
  },
  {
    id: '4',
    title: 'Aguilar 2118',
    address: 'Aguilar 2118',
    neighborhood: 'Belgrano',
    description: '3 y 4 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_2.png'
  },
  {
    id: '5',
    title: 'Migueletes 1080',
    address: 'Migueletes 1080',
    neighborhood: 'Belgrano',
    description: '1 y 2 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_3.png'
  },
  {
    id: '6',
    title: 'Aguilar 2365',
    address: 'Aguilar 2365',
    neighborhood: 'Belgrano',
    description: '1, 2, 3 y 4 ambientes',
    price: 'U$S 83.504',
    status: 'Disponible',
    possession: 'Diciembre 2025',
    image: '/exclusive_1.png'
  },
  {
    id: '7',
    title: 'Olleros 1881',
    address: 'Olleros 1881',
    neighborhood: 'Belgrano',
    description: '4 ambientes',
    price: 'U$S 940.000',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_4.png',
    isLarge: true
  },
  {
    id: '8',
    title: 'Ciudad de la Paz 450',
    address: 'Ciudad de la Paz 450',
    neighborhood: 'Belgrano',
    description: '3 y 4 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_1.png'
  },
  {
    id: '9',
    title: 'Aguilar 2118',
    address: 'Aguilar 2118',
    neighborhood: 'Belgrano',
    description: '3 y 4 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_2.png'
  },
  {
    id: '10',
    title: 'Migueletes 1080',
    address: 'Migueletes 1080',
    neighborhood: 'Belgrano',
    description: '1 y 2 ambientes',
    price: 'U$S 150.480',
    status: 'Disponible',
    possession: 'Inmediata',
    image: '/exclusive_3.png'
  }
];

export const mockExclusiveServices = [
  {
    id: '1',
    title: 'Venta',
    description: 'Contamos con más de 20 agentes inmobiliarios expertos en inversiones inmobiliarias.',
    icon: '/services_2.svg'
  },
  {
    id: '2',
    title: 'Tasaciones',
    description: 'En 48 horas tasamos tu propiedad con la efectividad que nos caracteriza.',
    icon: '/services_1.svg'
  },
  {
    id: '3',
    title: 'Adm. de alquileres',
    description: 'Gestionamos la administración de tu alquiler de forma fácil, rápida y eficaz.',
    icon: '/services_4.svg'
  }
];

export const mockExclusiveResponse: ExclusiveResponse = {
  results: mockExclusiveProperties,
  services: mockExclusiveServices,
  count: mockExclusiveProperties.length
}; 