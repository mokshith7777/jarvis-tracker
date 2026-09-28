# JARVIS TRACKER

Local-first Android expense tracker built with Expo, React Native and TypeScript.

## Features

- Offline/local transaction storage
- Income and expense tracking
- Dashboard balance
- Transaction history
- Transaction details
- Category statistics
- Settings
- Delete confirmation
- Android-ready Expo configuration
- EAS build configuration

## Run

Install dependencies:

    npm install

Start:

    npx expo start

Android development:

    npx expo start --android

## Android build

### Option 1: Using EAS CLI (Recommended)

1. Install EAS CLI globally:
   ```
   npm install -g eas-cli
   ```

2. Login to your Expo account:
   ```
   eas login
   ```

3. Build the APK (preview build):
   ```
   eas build --platform android --profile preview
   ```

4. After the build completes, you'll receive a URL to download the APK from Expo's servers.

### Option 2: Using GitHub Actions (Alternative)

This repository includes a GitHub Actions workflow that automatically builds the APK on push to `main` or when manually triggered.

To use this method:

1. Get an Expo personal access token:
   - Go to https://expo.dev/accounts/[your-username]/settings/personal-access-tokens
   - Create a new token with `write` permissions

2. Add the token as a secret in your GitHub repository:
   - Go to your repository on GitHub → Settings → Secrets and variables → Actions → New repository secret
   - Name: `EXPO_TOKEN`
   - Value: [paste your Expo token here]

3. Trigger the workflow:
   - Push to the `main` branch, or
   - Go to the Actions tab → "Build Android APK" → Run workflow

4. Download the APK from the workflow run artifacts.

The app uses AsyncStorage for local persistence. No cloud backend is required for the core tracker.

## Project Structure

- `app/` - Expo Router screens and layouts
- `components/` - Reusable UI components
- `constants/` - App constants (colors, categories)
- `store/` - React Context for state management
- `utils/` - Utility functions (currency formatting)
