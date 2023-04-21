import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  TESTNET_API_KEY: string | undefined;
  MAINNET_API_KEY: string | undefined;
  DEBUG: string | undefined | boolean;
}

interface Config {
  TESTNET_API_KEY: string,
  MAINNET_API_KEY: string,
  DEBUG: string | boolean,
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    TESTNET_API_KEY: process.env.TESTNET_API_KEY,
    MAINNET_API_KEY: process.env.MAINNET_API_KEY,
    DEBUG: process.env.DEBUG?.toLowerCase() === "true",
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

// tslint:disable-next-line:no-shadowed-variable
const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

export const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;