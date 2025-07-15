/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/modules/user/seedSuperAdmin";


let server: Server;

const main = async () => {
  try {
    await mongoose.connect(
      envVars.DB_URL
    );
    console.log("Connected to DB!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
(async()=>{
  await main()
  await seedSuperAdmin()
})()

process.on("SIGTERM",(err)=>{
    console.log("SIGTERM recieved... server shuting down!",err);
    if(server){
        server.close();
        process.exit(1)
    }
    process.exit(1)
})
process.on("SIGINT",(err)=>{
    console.log("SIGTERM recieved... server shuting down!",err);
    if(server){
        server.close();
        process.exit(1)
    }
    process.exit(1)
})

process.on("unhandledRejection",(err)=>{
    console.log("unhandledRejection Detected... server shuting down!",err);
    if(server){
        server.close();
        process.exit(1)
    }
    process.exit(1)
})

process.on("uncaughtException",(err)=>{
    console.log("uncaughtException Detected... server shuting down!",err);
    if(server){
        server.close();
        process.exit(1)
    }
    process.exit(1)
})
// Promise.reject(new Error("I forgot to catch this promise!"))
// throw new Error("I forgot to handle this local error")
