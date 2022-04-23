const dummyFarm = [
  {
    id: 1,
    name: "Baby's First Farm",
    description:
      'Broccoli and brussels sprouts and bell peppers and bananas and bok-choy',
  },
];

const dummyRole = [
  {
    id: 1,
    role: 'subscriber',
    farm_id: 1,
  },
];

const dummyUser = [
  {
    id: 1,
    name: 'Ingeborg Pipes',
    address: '9041 Crownhardt Alley',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Postira',
  },
  {
    id: 2,
    name: 'Guido Fruchter',
    address: '230 Del Mar Point',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Rovira',
  },
  {
    id: 3,
    name: 'Gui Grain',
    address: '85348 Daystar Crossing',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'El Gouna',
  },
  {
    id: 4,
    name: 'Hatty McCallam',
    address: '4981 Declaration Pass',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Moscavide',
  },
  {
    id: 5,
    name: 'Rossie Norcliff',
    address: '6217 Waywood Plaza',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Kavýli',
  },
  {
    id: 6,
    name: 'Kiersten Matusson',
    address: '4 Reindahl Alley',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Sebadelhe',
  },
  {
    id: 7,
    name: 'Jodee Stubbeley',
    address: '7 Sycamore Place',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Gaojia',
  },
  {
    id: 8,
    name: 'Tommy Lenox',
    address: '447 Hayes Circle',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Vũ Thư',
  },
  {
    id: 9,
    name: 'Chicky Pagden',
    address: '86735 Garrison Park',
    subscribed: true,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'San Diego',
  },
  {
    id: 10,
    name: 'Roxine Emmens',
    address: '05 Ryan Circle',
    subscribed: false,
    farm_id: 1,
    role_id: 1,
    delivery_zone: 'Bang Pakong',
  },
];

module.exports = { dummyFarm, dummyRole, dummyUser };
