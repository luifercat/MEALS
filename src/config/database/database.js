import { Sequelize } from 'sequelize';

import { envs } from '../environments/environments.js';

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function authenticated() {
  try {
    await sequelize.authenticate();
    console.log('db, connection ok!💀');
  } catch (error) {
    throw new Error('Authentication Error', error);
  }
}

export async function sincronize() {
  try {
    //await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log('db, connection ok!💀');
  } catch (error) {
    throw new Error('synchronization error');
  }
}

export default sequelize;
