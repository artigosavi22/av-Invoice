import dotenv from "dotenv";
import path from "path";
import fs from "fs";


class Configuration {
  private static instance: Configuration;

  public NODE_ENV!: string;
  public HOST!: string;
  public PORT!: string;
  public baseUrl!: string;
  public logDataDIR!: string;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to access the singleton instance
  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
      Configuration.instance.setUp();
    }

    return Configuration.instance;
  }

  private setUp() {
    this.HOST = process.env.HOST ? process.env.HOST : "localhost";
    this.PORT = process.env.PORT ? process.env.PORT : "4000";
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
    this.baseUrl = `http://${Configuration.instance.HOST}:${Configuration.instance.PORT}`;
    this.logDataDIR = path.join(process.cwd(), "/log");
    // this.ajv = new Ajv;
  }
}

// Destructuring the singleton instance to get the properties
const { NODE_ENV, HOST, PORT, baseUrl } = Configuration.getInstance();

export { NODE_ENV, HOST, PORT, baseUrl };
