import {MongoClient} from 'mongodb';

export type ProductType = {
  id: number
  title: string
}

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
// const mongoUri = process.env.mongoURI || "";

export const client = new MongoClient(mongoUri);

const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");


export async function runDb() {
  try {
    await client.connect();
    await client.db("products").command({ping: 1});
    console.log("Connected successfully to mongo server");
  } catch {
    console.log(`!!!Can't connect to mongo server!!!`);
    await client.close();
  }
}