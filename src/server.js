import app from './app.js';
relationModel
  import {relationModel}  from "./config/database/assosiations.js"
import { authenticated, sincronize } from './config/database/database.js';
import { envs } from './config/environments/environments.js';

async function main() {
  try {
    await authenticated();
    relationModel()
    await sincronize();
  } catch (error) {
    console.log(error);
  }
}
main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});
