import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolioDB";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

/* ---------- TYPE FOR GLOBAL ---------- */
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/* ---------- DECLARE GLOBAL ---------- */
declare global {
  var mongoose: MongooseGlobal | undefined;
}

/* ---------- CACHE ---------- */
const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;