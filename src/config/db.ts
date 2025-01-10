import mongoose from 'mongoose';
import Config from './config';


const connectDB = async (): Promise<void> => {
  try {

    await mongoose.connect(Config.mongo.url as string);

    console.log(`Connected to MongoDB Successfully`);
    console.log('  ▀▄   ▄▀');
    console.log(' ▄█▀███▀█▄');
    console.log('█▀███████▀█');
    console.log('█ █▀▀▀▀▀█ █');
    console.log('   ▀▀ ▀▀');
    console.log('Hello Adventurer, a good day to remind you Cristiano Ronaldo still remains the GOAT !!!!');
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
