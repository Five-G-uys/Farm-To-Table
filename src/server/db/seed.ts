import {
  Roles,
  Subscriptions,
  Vendors,
  Products,
  syncModels,
  DeliveryZones,
  Events,
} from './models';
import Farms from './models/Farms';

syncModels(true)
  .then(async () => {
    console.log('Models successfully synced!');

    // Farm Seed Data
    await Farms.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        name: 'Cinco Gajues Farm',
        description:
          'Cinco Gajues Farm is a 20 acre family farm on the south shore of Lake Ponchatrain. We deliver our fresh seasonal all-natural produce straight to your doorstep',
      },
    });

    //Events Seed Data
    // await Events.findOrCreate({
    //   where: { id: 1 },
    //   defaults: {
    //     id: 1,
    //     eventName: 'Saturday Farmers market',
    //     description: "local farmer's market",
    //     thumbnail: 'null',
    //   },
    // });

    // Roles Seed Data
    await Roles.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        role: 'user',
      },
    });
    await Roles.findOrCreate({
      where: { id: 2 },
      defaults: {
        id: 2,
        role: 'subscriber',
      },
    });
    await Roles.findOrCreate({
      where: { id: 3 },
      defaults: {
        id: 3,
        role: 'employee',
      },
    });
    await Roles.findOrCreate({
      where: { id: 4 },
      defaults: {
        id: 4,
        role: 'admin',
      },
    });

    // Vendors Seed Data
    await Vendors.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        name: 'Cinco Gajues Farm',
        contact_information: 'CincoGajuesFarm@example.com',
        farm_id: 1,
      },
    });
    await Vendors.findOrCreate({
      where: { id: 2 },
      defaults: {
        id: 2,
        name: 'Renes Mushroom Munchies',
        contact_information: 'RenesMushroomFarmm@example.com',
        farm_id: 1,
      },
    });
    await Vendors.findOrCreate({
      where: { id: 3 },
      defaults: {
        id: 3,
        name: 'Johns Fine Wines',
        contact_information: 'JohnsFineWines@example.com',
        farm_id: 1,
      },
    });
    await Vendors.findOrCreate({
      where: { id: 4 },
      defaults: {
        id: 4,
        name: 'Santos Micro Greens Garden',
        contact_information: 'SantosMicroGreensGarden.com',
        farm_id: 1,
      },
    });
    await Vendors.findOrCreate({
      where: { id: 5 },
      defaults: {
        id: 5,
        name: 'Rodolfos Honey Shop',
        contact_information: 'RodolfosHoneyShop@example.com',
        farm_id: 1,
      },
    });
    await Vendors.findOrCreate({
      where: { id: 6 },
      defaults: {
        id: 6,
        name: 'Murfs Desert Delights',
        contact_information: 'MurfsDesertDelights@example.com',
        farm_id: 1,
      },
    });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // Products Seed Data
    // await Products.findOrCreate({
    //   where: { id: 1 },
    //   defaults: {
    //     id: 1,
    //     name: 'Cheddar Cheese',
    //     description: 'Organic homestead cheddar cheese',
    //     // vendor_id: 1,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 2 },
    //   defaults: {
    //     id: 2,
    //     name: 'Ground Beef',
    //     description: 'Organic grass fed ground beef',
    //     // vendor_id: 1,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 3 },
    //   defaults: {
    //     id: 3,
    //     name: 'Mushrooms',
    //     description: '6oz of organic local Shitiki mushrooms',
    //     // vendor_id: 2,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 4 },
    //   defaults: {
    //     id: 4,
    //     name: 'Muscadine Wine',
    //     description: 'A bottle of Louisians finest Muscadine Wine',
    //     // vendor_id: 3,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 5 },
    //   defaults: {
    //     id: 5,
    //     name: 'Wheat Grass Shots',
    //     description: '4oz of fresh grown organic wheat grass shots',
    //     // vendor_id: 4,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 6 },
    //   defaults: {
    //     id: 6,
    //     name: 'Honey Quart with Comb',
    //     description: 'Quart of Louisian honey with the comb',
    //     // vendor_id: 5,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    // await Products.findOrCreate({
    //   where: { id: 7 },
    //   defaults: {
    //     id: 7,
    //     name: 'Scoobie Snack Cookie Box',
    //     description:
    //       'A mix of some of the worlds finest snicker-doodle cookies',
    //     // vendor_id: 6,
    //     img_url:
    //       'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    //     plant_date: '01/01/22',
    //     harvest_date: '03/03/22',
    //     subscription_id: 1,
    //   },
    // });
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // Delivery Zones Seed Data
    await DeliveryZones.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        name: 'New Orleans Delivery Zone',
        zip_codes:
          '70112, 70113, 70114, 70115, 70116, 70117, 70118, 70119, 70122, 70124, 70125, 70126, 70127, 70128, 70129, 70130, 70131, 70139, 70163 ',
        farm_id: 1,
      },
    });
    await DeliveryZones.findOrCreate({
      where: { id: 2 },
      defaults: {
        id: 2,
        name: 'North Shore Delivery Zone',
        zip_codes:
          '70401, 70402, 70403, 70404, 70433, 70434, 70448, 70470, 70471, 70447, 70454',
        farm_id: 1,
      },
    });

    // // Subscriptions Seed Data
    await Subscriptions.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        season: 'Spring',
        year: 2022,
        flat_price: 520,
        weekly_price: 40,
        description:
          'All your Spring favorites will be there, from crispy lettuces to zucchini and all types of peppers, and if we’re lucky we’re sure to get at least 6 weeks of fresh blueberries as well.  Pears and and other seasonal goodies will make their usual Summer appearances, along with weekly whole grains artisan breads from the bakery and delectable lagniappes from the farm kitchen.  Of course the creamery will also be in full swing, with fresh Greek Yogurt and Aged Cheddar cheese available weekly',
        start_date: 'April 26th',
        end_date: 'July 29th',
        farm_id: 1,
      },
    });

    await Subscriptions.findOrCreate({
      where: { id: 2 },
      defaults: {
        id: 2,
        season: 'Fall',
        year: 2022,
        flat_price: 520,
        weekly_price: 40,
        description:
          'All your Fall favorites will be there, from crispy lettuces to zucchini and all types of peppers, and if we’re lucky we’re sure to get at least 6 weeks of specialty fall crops as well.  Citrus and and other seasonal goodies will make their usual Late Fall appearances, along with weekly whole grains artisan breads from the bakery and delectable lagniappes from the farm kitchen.  Of course the creamery will also be in full swing, with fresh Greek Yogurt and Aged Cheddar cheese available weekly',
        start_date: 'September 5th',
        end_date: 'December 16th',
        farm_id: 1,
      },
    });

    await Subscriptions.findOrCreate({
      where: { id: 3 },
      defaults: {
        id: 3,
        season: 'Winter',
        year: 2022,
        flat_price: 520,
        weekly_price: 40,
        description:
          'All your Winter favorites will be there, from crispy lettuces to zucchini and all types of peppers, and if we’re lucky we’re sure to get at least 6 weeks of specialty fall crops as well.  Citrus and and other seasonal goodies will make their usual Late Fall appearances, along with weekly whole grains artisan breads from the bakery and delectable lagniappes from the farm kitchen.  Of course the creamery will also be in full swing, with fresh Greek Yogurt and Aged Cheddar cheese available weekly',
        start_date: 'December 19th',
        end_date: 'March 10th',
        farm_id: 1,
      },
    });
  })
  .catch((err) => {
    console.log(err);
  });
