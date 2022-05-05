/* eslint-disable @typescript-eslint/no-var-requires */
// import FarmsModel from "./Farms";
import RolesModel from './Roles';
import UsersModel from './Users';
import EventsModel from './Events';
import DeliveryZonesModel from './DeliveryZones';
import VendorsModel from './Vendors';
import SubscriptionsModel from './Subscriptions';
import ProductsModel from './Products';
import DietaryRestrictionsModel from './DietaryRestrictions';
import SubscriptionEntriesModel from './SubscriptionEntries';
import OrdersModel from './Orders';
import RSVPModel from './Rsvps';

export const syncModels = async (dropTables = false) => {
  const options = { force: dropTables };
  try {
    await RolesModel.sync(options);
    await UsersModel.sync(options);
    await EventsModel.sync(options);
    await DeliveryZonesModel.sync(options);
    await VendorsModel.sync(options);
    await SubscriptionsModel.sync(options);
    await ProductsModel.sync(options);
    await DietaryRestrictionsModel.sync(options);
    await SubscriptionEntriesModel.sync(options);
    await OrdersModel.sync(options);
    await RSVPModel.sync(options);
    console.log('models synced!');
    await UsersModel.belongsToMany(EventsModel, { through: RSVPModel });
    await EventsModel.belongsToMany(UsersModel, { through: RSVPModel });

    await UsersModel.hasOne(RolesModel, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await RolesModel.hasMany(UsersModel, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await UsersModel.belongsToMany(SubscriptionsModel, {
      through: SubscriptionEntriesModel,
    });
    await SubscriptionsModel.belongsToMany(UsersModel, {
      through: SubscriptionEntriesModel,
    });

    OrdersModel.belongsToMany(SubscriptionsModel, {
      through: SubscriptionEntriesModel,
    });
    SubscriptionsModel.belongsToMany(OrdersModel, {
      through: SubscriptionEntriesModel,
    });
  } catch (err) {
    console.error(err);
  }
};

syncModels();

export const Roles = RolesModel;
export const Users = UsersModel;
export const Events = EventsModel;
export const DeliveryZones = DeliveryZonesModel;
export const Vendors = VendorsModel;
export const Subscriptions = SubscriptionsModel;
export const Products = ProductsModel;
export const DietaryRestrictions = DietaryRestrictionsModel;
export const SubscriptionEntries = SubscriptionEntriesModel;
export const Orders = OrdersModel;
export const RSVP = RSVPModel;
