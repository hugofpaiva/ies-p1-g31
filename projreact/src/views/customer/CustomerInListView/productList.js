import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    price: '1.99',
    description: 'Golden apples are pale green to golden yellow in color and speckled with small lenticels (spots). They are small to medium in size, and tend to be conical or oblong in shape. Golden Delicious apples are firm, crisp, and white-fleshed. These apples have a balanced sweet-tart aromatic flavor, which has been described as honeyed. The flavor varies depending on where these apples are grown; in a cool climate, the amount of acid increases, actually creating a sweeter flavor. When grown in warmer areas, the acid content is lower, creating a milder flavor.',
    media: '/static/images/products/product_1.jpg',
    title: 'Golden Apple',
    quantity: '0.5'
  },
  {
    id: uuid(),
    price: '1.74',
    description: 'The pear is a fruit that has expanded all over the world; it is consumed both fresh as cooked, and that is available all throughout the year. There are multiple varieties cultivated, ranging in shape, size and colour.',
    media: '/static/images/products/product_2.jpg',
    title: 'Pear',
    quantity: 2
  },
  {
    id: uuid(),
    price: '3.99',
    description: 'The broccoli is a vegetable that belongs the cabbage family. Its consumption increases constantly, since it is a healthy food with multiple culinary uses. It has a pleasant taste and it is rich in mineral and vitamins. It is also low in calories.',
    media: '/static/images/products/product_3.jpg',
    title: 'Broccoli',
    quantity:1
  }
];
