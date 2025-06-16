# Google Forms Generator

Convert natural language descriptions into actual Google Forms using AI. This application uses Google's Gemini AI to generate form structures and the official Google Forms API to create forms in your Google Drive.

## Features

- **AI-Powered Form Generation**: Describe your form in natural language and get a structured Google Form
- **Direct Google Forms Integration**: Creates actual forms in your Google Drive using the official API
- **NextAuth Authentication**: Secure Google OAuth integration with automatic token management
- **Real-time Form Creation**: Generate and create forms in seconds
- **Multiple Question Types**: Supports text, multiple choice, checkboxes, rating scales, dates, and more

## Setup

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**:
   - Go to "APIs & Services" > "Library"
   - Enable the following APIs:
     - Google Forms API
     - Google Drive API
     - Google Gemini API

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)

4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in required information:
     - App name: "Google Forms Generator"
     - User support email: Your email
     - Developer contact information: Your email
   - Add scopes:
     - `https://www.googleapis.com/auth/forms.body`
     - `https://www.googleapis.com/auth/drive.file`
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_SECRET=your_google_client_secret_here

# Google Gemini AI Configuration
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database Configuration
DATABASE_URL=your_database_url_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Generate Form Structure

1. Navigate to `/test-form` to test the form generation without authentication
2. Enter a natural language description of your form
3. Click "Generate Form Structure" to get the JSON structure

### 2. Create Google Forms

1. Navigate to `/create-form` to create actual Google Forms
2. Click "Sign in with Google" to authenticate
3. Grant the necessary permissions
4. Enter a form description and generate the structure
5. Click "Create Google Form" to create the form in your Google Drive

## API Endpoints

### POST `/api/generate-form`

Generates a Google Forms JSON structure from a natural language prompt.

**Request:**
```json
{
  "prompt": "Create a customer feedback form with name, email, rating scale from 1-5, and comments section"
}
```

**Response:**
```json
{
  "success": true,
  "formStructure": {
    "info": {
      "title": "Customer Feedback Form",
      "description": "Please provide your feedback about our service"
    },
    "items": [...]
  }
}
```

### POST `/api/create-google-form`

Creates an actual Google Form in Google Drive using the official Google API. Requires NextAuth session with Google authentication.

**Request:**
```json
{
  "formStructure": {
    "info": {...},
    "items": [...]
  }
}
```

**Response:**
```json
{
  "success": true,
  "form": {
    "formId": "1FAIpQLS...",
    "title": "Customer Feedback Form",
    "description": "Please provide your feedback about our service",
    "responderUri": "https://docs.google.com/forms/d/.../viewform",
    "webViewLink": "https://drive.google.com/file/d/.../view",
    "editLink": "https://docs.google.com/forms/d/.../edit",
    "owners": [...],
    "permissions": [...]
  }
}
```

### GET `/api/create-google-form`

Validates NextAuth session and checks form creation permissions.

**Response:**
```json
{
  "success": true,
  "authenticated": true,
  "canCreateForms": true,
  "message": "Authentication verified successfully"
}
```

## Authentication Flow

1. **NextAuth Integration**: Uses NextAuth.js for secure Google OAuth
2. **Automatic Token Management**: NextAuth handles access token storage and refresh
3. **Session-based Access**: Server-side session validation for API calls
4. **Seamless Experience**: Single sign-in for all Google services

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts    # NextAuth configuration
│   │   ├── generate-form/route.ts        # Form structure generation
│   │   └── create-google-form/route.ts   # Google Form creation
│   ├── create-form/page.tsx              # Main form creation interface
│   ├── test-form/page.tsx                # Form generation testing
│   └── layout.tsx                        # App layout with AuthProvider
├── lib/
│   ├── google-auth-simple.ts             # Google API client utilities
│   ├── types.ts                          # TypeScript type definitions
│   └── next-auth.d.ts                    # NextAuth type extensions
├── providers/
│   └── AuthProvider.tsx                  # NextAuth session provider
└── prisma/
    └── schema.prisma                     # Database schema
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **NextAuth.js**: Authentication and session management
- **Google Gemini AI**: Natural language processing for form generation
- **Google Forms API**: Official API for form creation
- **Google Drive API**: File management and permissions
- **Prisma**: Database ORM with PostgreSQL
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling and UI components

## Security Features

- **OAuth 2.0**: Secure Google authentication
- **Session Management**: Server-side session validation
- **Token Security**: Automatic token refresh and secure storage
- **API Protection**: All endpoints require valid authentication
- **Environment Variables**: Secure configuration management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the Google Forms API documentation
3. Open an issue on GitHub

## Acknowledgments

- [Google Forms API](https://developers.google.com/forms/api) for the comprehensive API
- [Google API Node.js Client](https://github.com/googleapis/google-api-nodejs-client) for the official client library
- [Google Gemini AI](https://ai.google.dev/) for natural language processing capabilities
