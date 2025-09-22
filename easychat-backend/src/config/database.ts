import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chatify",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions,
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
