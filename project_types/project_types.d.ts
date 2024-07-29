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
    genres: boolean
    mainCharacters: boolean
    supportingCharacters: boolean
    description: boolean
    averageScore: boolean
    popularity: boolean
  }

  type AniListAPIResponse = {
    success: boolean,
    data: AniListData
  }

  type AniListData = {
     __typename: 'Media'
    genres?: Array<string>
    averageScore?: Number
    popularity?: Number
    description?: string
    mainCharacters?: {
      __typename: string
      nodes: Array<{name: {full:string}}>
    }
    supportingCharacters?: {
      __typename: string
      nodes: Array<{name: {full:string}}>
    }
  }
}
