import { Roles, syncModels } from './models';
import Farms from './models/Farms';

syncModels(true).then(async () => {
  console.log('Models successfully synced!');
  await Farms.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      name: 'Cinco Gajues',
      description: 'A great farm',
    },
  });
  await Roles.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      role: "user",
    }
  })
});
