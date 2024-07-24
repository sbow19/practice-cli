export {};

declare global {
  type ConfigCheck = {
    configDirExists: boolean,
    configFileExists: boolean,
    configSettings: ConfigSettings | null
  }

  type ConfigSettings = {
    name: string,
    country: string,
    city: {
      name: string,
      latitude: number,
      longitude: number
    }
  }
}
