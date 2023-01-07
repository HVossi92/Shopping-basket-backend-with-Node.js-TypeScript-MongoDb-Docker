import mongoose from "mongoose";

const database = "mongodb://localhost:27017/shopping";
const databaseDevelopment = "mongodb://localhost:27017/shopping";

export function connectToDb(): void {
    console.info("Trying to connect to mongoDb");
    mongoose.set('strictQuery', false);
    mongoose.connect(database, {
        serverSelectionTimeoutMS: 1000
    }).then(() => {
        console.info("Connected to database");
    }).catch(err => {
        console.warn("Unable to connect to production database, trying to connect to development db: ", err);

        mongoose.connect(databaseDevelopment).then(() => {
            console.info("Connected to development database");
        }).catch(err => {
            console.error("Unable to connect to development database: ", err);
            process.exit(1);
        });
    });
}