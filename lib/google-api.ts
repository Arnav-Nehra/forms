import { google } from 'googleapis';

/**
 * Creates an authenticated Google Forms client using an access token
 * @param accessToken - Google OAuth access token from NextAuth session
 * @returns Google Forms API client
 */
export function createFormsClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.forms({
    version: 'v1',
    auth: oauth2Client
  });
}

/**
 * Creates an authenticated Google Drive client using an access token
 * @param accessToken - Google OAuth access token from NextAuth session
 * @returns Google Drive API client
 */
export function createDriveClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.drive({
    version: 'v3',
    auth: oauth2Client
  });
}

/**
 * Validates if an access token is still valid by trying to make a simple API call
 * @param accessToken - Google OAuth access token to validate
 * @returns Promise<boolean> - true if token is valid, false otherwise
 */
export async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const formsClient = createFormsClient(accessToken);
    // Try to create a simple test form to validate the token
    await formsClient.forms.create({
      requestBody: {
        info: {
          title: 'Test Form'
        }
      }
    });
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
} 