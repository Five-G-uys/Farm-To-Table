/* eslint-disable @typescript-eslint/no-var-requires */
import FarmsModel from './Farms';
import DeliveryZonesModel from './DeliveryZones';
import EventsModel from './Events';
import RolesModel from './Roles';
import VendorsModel from './Vendors';
import ProductsModel from './Products';
import UsersModel from './Users';
import SubscriptionsModel from './Subscriptions';
import DietaryRestrictionsModel from './DietaryRestrictions';
import OrdersModel from './Orders';
import RSVPModel from './Rsvps';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyFarm } = require('./dummyUser');
const { dummyRole } = require('./dummyUser');
const { dummyUser } = require('./dummyUser');

export const syncModels = async (dropTables = false) => {
  const options = { force: dropTables };
  try {
    await FarmsModel.sync(options);
    await DeliveryZonesModel.sync(options);
    await EventsModel.sync(options);
    await RolesModel.sync(options);
    await VendorsModel.sync(options);
    await ProductsModel.sync(options);
    await UsersModel.sync(options);
    await SubscriptionsModel.sync(options);
    await DietaryRestrictionsModel.sync(options);
    await OrdersModel.sync(options);
    await RSVPModel.sync(options)
      .then(() =>
        Promise.all(
          dummyFarm.map((txn: unknown) => {
            console.log('Line 34 db/models/index.tsx', txn);
            return Farms.create(txn);
          })
        )
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((arr: string | any[]) =>
        console.log(
          '\x1b[32m',
          `\nDatabase (PostgreSQL): Successfully seeded Farms with ${arr.length} entries!\n`,
          '\x1b[37m'
        )
      )
      .then(() =>
        Promise.all(dummyRole.map((txn: unknown) => Roles.create(txn)))
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((arr: string | any[]) =>
        console.log(
          '\x1b[32m',
          `\nDatabase (PostgreSQL): Successfully seeded Roles with ${arr.length} entries!\n`,
          '\x1b[37m'
        )
      )
      .then(() =>
        Promise.all(dummyUser.map((txn: unknown) => Users.create(txn)))
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((arr: string | any[]) =>
        console.log(
          '\x1b[32m',
          `\nDatabase (PostgreSQL): Successfully seeded subscribers with ${arr.length} entries!\n`,
          '\x1b[37m'
        )
      );
  } catch (err) {
    console.error(err);
  }
};

syncModels();

export const Farms = FarmsModel;
export const DeliveryZones = DeliveryZonesModel;
export const Events = EventsModel;
export const Roles = RolesModel;
export const Vendors = VendorsModel;
export const Products = ProductsModel;
export const Users = UsersModel;
export const Subscriptions = SubscriptionsModel;
export const DietaryRestrictions = DietaryRestrictionsModel;
export const Orders = OrdersModel;
export const RSVP = RSVPModel;
