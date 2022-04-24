import { Roles, Subscriptions, syncModels } from './models';
import Farms from './models/Farms';

syncModels(true).then(async () => {
  console.log('Models successfully synced!');
  await Farms.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      name: 'Cinco Gajues Farm',
      description:
        'Cinco Gajues Farm is a 20 acre family farm on the south shore of Lake Ponchatrain. We deliver our fresh seasonal all-natural produce straight to your doorstep',
    },
  });
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
  })
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
  })
})
  .catch((err) => {
    console.log(err);
})
