export {};

declare global {
  type ConfigCheck = {
    configDirExists: boolean,
    configFileExists: boolean,
    configSettings: ConfigSettings | null
  }

  type ConfigSettings = {
    name: string,
    location: string
  }
}
