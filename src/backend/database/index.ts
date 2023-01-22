import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export default class Database {
    static moongoseClient: typeof mongoose;
    static MongoClientPromise: Promise<MongoClient>;
    static mongoUri: string =
        process.env.MONGODB_URI ?? "mongodb://localhost:27017";

    static async setup(uri: string = this.mongoUri) {
        try {
            if (!this.moongoseClient) {
                this.moongoseClient = await mongoose.connect(uri);
            }
            return this.moongoseClient;
        } catch (error) {
            throw new Error("Error setting up mongoose connection", { cause: error });
        }
    }

    static async setupAdapterConnection(
        uri: string = this.mongoUri
    ): Promise<MongoClient> {
        try {
            if (!this.moongoseClient) {
                this.MongoClientPromise = MongoClient.connect(uri);
            }
            return this.MongoClientPromise;
        } catch (error) {
            throw new Error("Error setting up mongodb-adapter connection", {
                cause: error,
            });
        }
    }
}
