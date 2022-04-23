import FarmsModel from './Farms';
import DeliveryZonesModel from './DeliveryZones';
import EventsModel from './Events';
import RolesModel from './Roles';
import SubscriptionsModel from './Subscriptions';
import VendorsModel from './Vendors';
import ProductsModel from './Products';
import UsersModel from './Users';
import DietaryRestrictionsModel from './DietaryRestrictions';
import OrdersModel from './Orders';
import RSVPModel from './Rsvps';

export const syncModels = async (dropTables = false) => {
  const options = { force: dropTables };
  try {
    await FarmsModel.sync(options);
    await DeliveryZonesModel.sync(options);
    await EventsModel.sync(options);
    await RolesModel.sync(options);
    await SubscriptionsModel.sync(options);
    await VendorsModel.sync(options);
    await ProductsModel.sync(options);
    await UsersModel.sync(options);
    await DietaryRestrictionsModel.sync(options);
    await OrdersModel.sync(options);
    await RSVPModel.sync(options);
    console.log("models synced!")
  } catch (err) {
    console.error(err);
  }
};

syncModels();

export const Farms = FarmsModel;
export const DeliveryZones = DeliveryZonesModel;
export const Events = EventsModel;
export const Roles = RolesModel;
export const Subscriptions = SubscriptionsModel;
export const Vendors = VendorsModel;
export const Products = ProductsModel;
export const Users = UsersModel;
export const DietaryRestrictions = DietaryRestrictionsModel;
export const Orders = OrdersModel;
export const RSVP = RSVPModel;
