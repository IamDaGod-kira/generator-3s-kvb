# 3SG Hackathon Project — PM SHRI KV Ballygunge by Team CodeCrafters

Created by the students of PM Shri KV Ballygunge for the [Vidyasetu](https://vidyasetu.ai/) Hackathon.

---

## Project Overview
 
This project aims to create an AI-powered system that helps students generate smart study schedules. It integrates data from multiple platforms (web, mobile, and IoT) to offer a seamless and adaptive learning experience. Alongside the daily hustles of life, this makes their life a bit easier..

---

## Directory Structure

```

3sg-hackathon-kvb/
├── firebase-webapp/       # React.js web app (with Firebase backend)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── expo-android-app/      # Expo-based mobile app
│   ├── src/
│   ├── assets/
│   └── app.json
│
├── arduino-tablet/        # Arduino-based tablet integration project
│   ├── src/
│   └── hardware_docs/
│
├── themes/
|   |── 'Fiery Red Sunset.png'
|
│
└── README.md

```

---

## Setup and Installation

### 1. Firebase Web App
```

cd firebase-webapp
npm install
npm run dev

```

**Dependencies:**
- React.js  
- Vite  
- Firebase SDK  
- React Router DOM  
- Tailwind CSS  

---

### 2. Expo Android App
```

cd expo-android-app
npm install
npx expo start

```

**Dependencies:**
- Expo  
- React Native  
- Axios or Fetch API  
- AsyncStorage (for local data caching)

---

### 3. Arduino Tablet
Open the `.ino` file in **Arduino IDE**  
Select the correct **board** and **port**, then upload the code.

**Hardware Used:**
- Arduino (model name)  
- Sensors / Modules  
- Display / Input devices  

---

## AI SDK / API Used
(Mention the AI SDK or API integrated into your project.)

Example:  
Google Generative AI (Gemini) SDK integrated into the Firebase web app for intelligent schedule generation.

---

## Team Members

| Name | Role | GitHub / Profile Link |
|------|------|------------------------|
| Member 1 | Role / Contribution | [Link] |
| Member 2 | Role / Contribution | [Link] |
| Member 3 | Role / Contribution | [Link] |
| Member 4 | Role / Contribution | [Link] |
| Member 5 | Role / Contribution | [Link] |

---

## Features
- AI-powered personalized scheduling  
- Real-time sync between web, mobile, and tablet  
- Firebase integration for authentication and data storage  
- Smart notifications and study reminders  
- Cross-platform accessibility  

---

## License
(Add your license type here, e.g., MIT, Apache 2.0, or “All rights reserved.”)

---

## Future Plans
(Describe any upcoming features or improvements planned post-hackathon.)

---

## Acknowledgements
Thanks to our teachers and mentors for their continued guidance and support.