import { syncModels } from './models'

syncModels(true).then(() => console.log('Models successfully synced!'));
