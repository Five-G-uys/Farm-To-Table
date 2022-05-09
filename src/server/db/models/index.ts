/* eslint-disable @typescript-eslint/no-var-requires */
// import FarmsModel from "./Farms";
import RolesModel from "./Roles";
import UsersModel from "./Users";
import DeliveryZonesModel from "./DeliveryZones";
import EventsModel from "./Events";
import VendorsModel from "./Vendors";
import ProductsModel from "./Products";
import SubscriptionsModel from "./Subscriptions";
import SubscriptionEntriesModel from "./SubscriptionEntries";
import DietaryRestrictionsModel from "./DietaryRestrictions";
import OrdersModel from "./Orders";
import RSVPModel from "./Rsvps";
import OrderContentsModel from "./OrderContents";
// const { dummyFarm } = require('./dummyUser');
// const { dummyRole } = require('./dummyUser');
// const { dummyUser } = require('./dummyUser');

export const syncModels = async (dropTables = false) => {
  const options = { force: dropTables };
  try {
    await RolesModel.sync(options);
    await UsersModel.sync(options);
    await DeliveryZonesModel.sync(options);
    await EventsModel.sync(options);
    await VendorsModel.sync(options);
    await SubscriptionsModel.sync(options);
    await ProductsModel.sync(options);
    await SubscriptionEntriesModel.sync(options);
    await DietaryRestrictionsModel.sync(options);
    await OrdersModel.sync(options);
    await RSVPModel.sync(options);
    await OrderContentsModel.sync(options);
    console.log("models synced!");

    await UsersModel.belongsToMany(EventsModel, { through: RSVPModel });
    await EventsModel.belongsToMany(UsersModel, { through: RSVPModel });

    await ProductsModel.belongsTo(SubscriptionsModel);

    //////////////////////////////////////////////////////////////////////
    await RolesModel.hasMany(UsersModel, {
      foreignKey: "roleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await UsersModel.belongsTo(RolesModel, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    //////////////////////////////////////////////////////////////////////

    await SubscriptionsModel.hasMany(SubscriptionEntriesModel, {
      foreignKey: "subscriptionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await SubscriptionEntriesModel.belongsTo(SubscriptionsModel, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    //////////////////////////////////////////////////////////////////////

    await SubscriptionEntriesModel.hasMany(OrdersModel, {
      foreignKey: "subscriptionEntryId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await OrdersModel.belongsTo(SubscriptionEntriesModel, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    //////////////////////////////////////////////////////////////////////
    await UsersModel.hasMany(SubscriptionEntriesModel, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await SubscriptionEntriesModel.belongsTo(UsersModel, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    //////////////////////////////////////////////////////////////////////

    await ProductsModel.belongsToMany(OrdersModel, {
      through: OrderContentsModel,
    });
    await OrdersModel.belongsToMany(ProductsModel, {
      through: OrderContentsModel,
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
