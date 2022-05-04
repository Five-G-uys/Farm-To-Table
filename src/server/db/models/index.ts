/* eslint-disable @typescript-eslint/no-var-requires */
// import FarmsModel from "./Farms";
import DeliveryZonesModel from "./DeliveryZones";
import EventsModel from "./Events";
import RolesModel from "./Roles";
import VendorsModel from "./Vendors";
import ProductsModel from "./Products";
import UsersModel from "./Users";
import SubscriptionsModel from "./Subscriptions";
import SubscriptionEntriesModel from "./SubscriptionEntries";
import DietaryRestrictionsModel from "./DietaryRestrictions";
import OrdersModel from "./Orders";
import RSVPModel from "./Rsvps";
// const { dummyFarm } = require('./dummyUser');
// const { dummyRole } = require('./dummyUser');
// const { dummyUser } = require('./dummyUser');

export const syncModels = async (dropTables = false) => {
  const options = { force: dropTables };
  try {
    await DeliveryZonesModel.sync(options);
    await EventsModel.sync(options);
    await RolesModel.sync(options);
    await VendorsModel.sync(options);
    await UsersModel.sync(options);
    await SubscriptionsModel.sync(options);
    await ProductsModel.sync(options);
    await DietaryRestrictionsModel.sync(options);
    await SubscriptionEntriesModel.sync(options);
    await OrdersModel.sync(options);
    await RSVPModel.sync(options);
    console.log("models synced!");
    EventsModel.belongsToMany(UsersModel, { through: RSVPModel });
    UsersModel.belongsToMany(EventsModel, { through: RSVPModel });
  } catch (err) {
    console.error(err);
  }
};

syncModels();

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
export const SubscriptionEntries = SubscriptionEntriesModel;
