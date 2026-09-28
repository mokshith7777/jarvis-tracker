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

Install/configure EAS, then:

    npx eas build --platform android --profile preview

For a production build:

    npx eas build --platform android --profile production

The app uses AsyncStorage for local persistence. No cloud backend is required for the core tracker.
