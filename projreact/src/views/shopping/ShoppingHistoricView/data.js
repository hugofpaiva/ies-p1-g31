import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    store: 'Aveiro Lourenço Peixinho',
    address: {
      country: 'Portugal',
      state: 'Aveiro',
      city: 'Aveiro',
      street: 'Av. Dr. Lourenço Peixinho, N.º3'
    },
    avatarUrl: '/static/images/stores/store_1.jpg',
    createdAt: 1606909810000,
    bill: {
      total: 8.46,
      employee: 'Pedro Paulo',
      products: [
        {
          id: uuid(),
          price: 1.99,
          media: '/static/images/products/product_1.jpg',
          title: 'Golden Apple',
          quantity: '0.5',
          vat: 6,
        },
        {
          id: uuid(),
          price: 1.74,
          media: '/static/images/products/product_2.jpg',
          title: 'Pear',
          quantity: 2,
          vat: 6,
        },
        {
          id: uuid(),
          price: 3.99,
          media: '/static/images/products/product_3.jpg',
          title: 'Broccoli',
          vat: 6,
          quantity: 1
        }
      ]
    }
  },
  {
    id: uuid(),
    store: 'Aveiro Lourenço Peixinho',
    address: {
      country: 'Portugal',
      state: 'Aveiro',
      city: 'Aveiro',
      street: 'Av. Dr. Lourenço Peixinho, N.º3'
    },
    avatarUrl: '/static/images/stores/store_1.jpg',
    createdAt: 1606502230000,
    bill: {
      total: 356.52,
      employee: 'Pedro Paulo',
      products: [
        {
          id: uuid(),
          price: 356.52,
          media: 'https://images-na.ssl-images-amazon.com/images/I/917LEZ%2Bit3L._AC_SX679_.jpg',
          title: 'Panasonic LUMIX FZ80 4K Digital Camera',
          vat: 23,
          quantity: 1
        },
      ]
    }
  }
];
