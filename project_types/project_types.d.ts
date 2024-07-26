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

  interface UserSelectionAniList extends UserSelection {
    animeTitle: string,
    searchAttributes: AniListSelectionAttributes
  }

  interface UserSelection {
    areDetailsCorrect: boolean
  }

  type AniListSelectionAttributes = {
    genre: boolean
    "main_character": boolean
    "supporting character": boolean
    description: boolean
    averageScore: boolean
    popularity: boolean
  }
}
