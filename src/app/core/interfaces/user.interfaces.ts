export interface Coords {
  latitude: number;
  longitude: number;
}

export interface User {
  email: string;
  password: string;
}

export interface AuthInfo extends User {
  returnSecureToken: true;
}

export interface FbAuthResponse {
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
}

export interface RefreshRequest {
  grant_type: 'refresh_token';
  refresh_token: string;
}

export interface RefreshResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface RefreshResponseCapitalized {
  expiresIn: string;
  tokenType: string;
  refreshToken: string;
  idToken: string;
  userId: string;
  projectId: string;
}
