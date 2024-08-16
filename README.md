# React Weather App

## Overview

The React Weather App is a responsive web application that provides users with real-time weather information for their current location as well as any other location they search for. The app offers features such as weather alerts, customization options, and offline access, ensuring a seamless user experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Weather Information:** Display current weather conditions, hourly and daily forecasts.
- **Location-Based Forecasting:** Auto-detect user location, search for weather in different locations, and save multiple locations.
- **Weather Alerts:** Receive notifications for severe weather conditions.
- **Customization:** Switch between Celsius and Fahrenheit, and customize the app theme.
- **Offline Access:** Cached data allows for offline viewing of previously accessed weather information.
- **Responsive Design:** Ensures a user-friendly interface across all devices.
- **Protected Routes:** Secure access to certain pages for authenticated users only.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/YourUsername/react-weather-app.git
cd react-weather-app



```

## Install Dependencies

npm install

# or

yarn install

## Run the Development Server

npm start

# or

yarn start

## Usage

Viewing Weather: Enter a location in the search bar or allow the app to auto-detect your location.
Saving Locations: Save your favorite locations for quick access later.
Customizing the App: Switch between themes and change the temperature units as per your preference.

## Project Structure

bash
Copy code
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ ├── WeatherDisplay.jsx
│ │ ├── SearchBar.jsx
│ │ └── ...
│ ├── pages
│ │ ├── HomePage.jsx
│ │ ├── SavedLocationsPage.jsx
│ │ └── ...
│ ├── App.jsx
│ ├── index.js
│ └── ...
├── package.json
├── README.md
└── ...

## Technologies Used

React.js: A JavaScript library for building user interfaces.
LocalStorage: For persisting user data like locations and settings.
React Router DOM: For handling navigation and routing between pages.
CSS: For styling the app and ensuring responsive design.

## API

The app uses the OpenWeatherMap API to fetch weather data. Make sure to obtain an API key and include it in your .env file as follows:

bash
Copy code
REACT_APP_WEATHER_API_KEY=your_api_key_here

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request. Make sure to follow the code style and include relevant tests where applicable.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Preview

![Screenshot 2024-08-16 213448](https://github.com/user-attachments/assets/91f399a5-22bf-446a-9459-fdd269300140)
![Screenshot 2024-08-16 213522](https://github.com/user-attachments/assets/42339847-cbc8-48ec-8bc3-fcb9c3fbbe9c)
![Screenshot 2024-08-16 213845](https://github.com/user-attachments/assets/47f7e5f2-8253-4a3f-bb1d-8ca8d7dd806d)
![Screenshot 2024-08-16 213936](https://github.com/user-attachments/assets/9e753df7-e145-4c66-8606-68f3fd775fa2)
