import { MongoClient } from "../../deps.ts";
const MONGO_URI = "mongodb://127.0.0.1:27017/denoDB";
const client = new MongoClient();

try {
  await client.connect(MONGO_URI);
  console.log(`Base de datos conectada ${MONGO_URI}`);
} catch (error) {
  console.log(error);
}

const dbConn = client.database("denoDB");
export default dbConn;