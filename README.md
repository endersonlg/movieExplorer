# Movie Explorer

The Movie Explorer is a React Native project aimed at enhancing the online-first development experience using Realm DB. The application allows users to explore movies, marking their favorites through interaction with a heart icon. The project is built with Expo and features animations using the Reanimated library.

## Key Features

1. **Movie Exploration:** Users can browse a vast collection of movies, viewing details such as title, synopsis, and relevant information.

2. **Favorite Marking:** The online-first functionality shines when users click on the heart icon to mark a movie as a favorite. This action is instantly synchronized with the Realm DB.

3. **Enhanced Animations:** The project incorporates smooth and responsive animations using the Reanimated library, providing a more engaging user experience.

## Technologies Used

- **React Native:** Cross-platform mobile application development.
- **Expo:** Facilitates React Native development by providing additional tools and services.
- **Realm DB:** Local database used for efficient data management and enhancing the online-first experience.
- **Reanimated:** Library for creating powerful and interactive animations.

## Getting Started

1. **Prerequisites:**
   - Ensure you have Node.js installed.
   - Install Expo CLI globally: `npm install -g expo-cli`.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Pre-build:**
   - Before running the application, execute the following command for pre-build:
   ```bash
   npx expo prebuild
   ```
5. **Start the Application:**
   After the pre-build, you can start the application with the command:
   ```bash
   npx expo run:android
   ```
## Environment Variables
Before running the application, make sure to fill in the following environment variables in your .env file:
```bash
#REALM
REALM_APP_ID=your_realm_app_id

#TMDB
TMDB_API_KEY=your_tmdb_api_key

#GOOGLE
ANDROID_CLIENT_ID=your_android_client_id
WEB_CLIENT_ID=your_web_client_id
```
Replace "your_realm_app_id," "your_tmdb_api_key," "your_android_client_id," and "your_web_client_id" with the corresponding actual values.

## Contributions
Contributions are welcome! Feel free to open issues and send pull requests to improve the project.
