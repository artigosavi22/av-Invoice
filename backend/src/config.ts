import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import winston from "winston";
import "winston-daily-rotate-file";
import Ajv from "ajv";

class Configuration {
  private static instance: Configuration;

  public NODE_ENV!: string;
  public HOST!: string;
  public PORT!: string;
  public baseUrl!: string;
  public logDataDIR!: string;
  public prisma!:any;
  public logger !: winston.Logger
  public ajv!: any
  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to access the singleton instance
  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
      Configuration.instance.setUp();
      Configuration.instance.setUpDB();
      Configuration.instance.setUpLogger();
      Configuration.instance.setUpEnvVar();
    }

    return Configuration.instance;
  }

  private setUp() {
    this.HOST = process.env.HOST ? process.env.HOST : "localhost";
    this.PORT = process.env.PORT ? process.env.PORT : "4000";
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
    this.baseUrl = `http://${Configuration.instance.HOST}:${Configuration.instance.PORT}`;
    this.logDataDIR = path.join(process.cwd(), "/log");
    this.ajv = new Ajv;
  }

  private async setUpDB(){
    try{
      const globalForPrisma = global as unknown as { prisma : PrismaClient}
      this.prisma = globalForPrisma.prisma || new PrismaClient();
      if(process.env.MODE_ENV !== "production")
        globalForPrisma.prisma = this.prisma;
        const data = await this.prisma.$queryRaw`SELECT 1 + 1`;

      if(!data){
        console.error("DB connection error!");
      }else{
        console.log("DB connected...!");
        this.logger.error(`DB connected ${process.env.DATABASE_URL } `);
      }

    }catch(error){
      console.error("DB connection error!", error);
      this.logger.error(`DB connection error! ${error} `);
    }
  }

  private setUpLogger(){
    const logDIR = this.logDataDIR;
    if(!fs.existsSync(logDIR)) fs.mkdirSync(logDIR)

    const filename = path.join(logDIR, "ApplicationLog-")
    let transport = new winston.transports.DailyRotateFile({
      filename:filename,
      datePattern:"YYYY-MM_DD",
      level: "info",
      utc:true,
      extension:".log",
      json:true,
      dirname:logDIR
    });

    this.logger= winston.createLogger({
      level:"info",
      transports:[transport]
    });
    this.logger.info(`Log filepath is set to ${filename}`);
  }

  private setUpEnvVar(){
    const envPath= path.resolve(__dirname,"..", ".env");
    if(fs.existsSync(envPath)){
      console.log(envPath + ">> .env file Exits");
      dotenv.config({
        path:envPath,
      });
    }else{
      console.error("ERROR >> .env file does not exits. check config.ts");
      dotenv.config();
    }
  }
}

// Destructuring the singleton instance to get the properties
const { NODE_ENV, HOST, PORT, baseUrl,logger,prisma ,ajv } = Configuration.getInstance();

export { NODE_ENV, HOST, PORT, baseUrl ,logger,prisma , ajv};
  