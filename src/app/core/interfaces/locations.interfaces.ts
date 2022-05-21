export interface Mark {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface MarkWithID extends Mark {
  locationID: string;
}

export interface MarkCreateResponse {
  name: string;
}

export interface GetMarksResponse {
  [key: string]: Mark;
}
