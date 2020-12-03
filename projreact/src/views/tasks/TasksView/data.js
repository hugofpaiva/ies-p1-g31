import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016406000,
    place: 'Fruits',
    status: 'Pending',
  },
  {
    id: uuid(),
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016405000,
    place: 'Reception',
    status: 'Pending'
  },
  {
    id: uuid(),
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930200000,
    place: 'Entrance Gate Nr. 4',
    status: 'Pending'
  },
  {
    id: uuid(),
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757210700,
    place: 'Tech',
    status: 'Customer left'
  },
  {
    id: uuid(),
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670809000,
    place: 'Dairy Products',
    status: 'Resolved'
  },
  {
    id: uuid(),
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670803000,
    place: 'Frozen Foods',
    status: 'Customer left'
  }
];