import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  ANALITYCS_API_HOST: string | undefined;
  TESTNET_API_KEY: string | undefined;
  MAINNET_API_KEY: string | undefined;
}

interface Config {
  ANALITYCS_API_HOST: string,
  TESTNET_API_KEY: string,
  MAINNET_API_KEY: string,
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    ANALITYCS_API_HOST: process.env.ANALITYCS_API_HOST,
    TESTNET_API_KEY: process.env.TESTNET_API_KEY,
    MAINNET_API_KEY: process.env.MAINNET_API_KEY,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

export const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;