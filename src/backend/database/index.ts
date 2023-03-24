import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const defaultUri: string = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
mongoose.set("strictQuery", true);
export default class Database {
	static moongoseClient: typeof mongoose;
	static MongoClientPromise: Promise<MongoClient>;

	static async setup(uri: string = defaultUri): Promise<mongoose.Mongoose> {
		if (!this.moongoseClient) {
			this.moongoseClient = await mongoose.connect(uri).catch((error) => {
				throw new Error("Error setting up mongoose connection", { cause: error });
			});
		}

		return this.moongoseClient;
	}


	static async setupAdapterConnection(uri: string = defaultUri): Promise<MongoClient> {
		if (!this.MongoClientPromise) {
			this.MongoClientPromise = MongoClient.connect(uri).catch((error) => {
				throw new Error("Error setting up mongodb-adapter connection", { cause: error });
			});
		}

		return this.MongoClientPromise;
	}

	static async disconnect(): Promise<void> {
		if (this.moongoseClient) {
			await this.moongoseClient.disconnect();
		}
	}
}

