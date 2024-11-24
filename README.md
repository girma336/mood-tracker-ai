# Mood Tracker with AI Insights

## Overview

The **Mood Tracker with AI Insights** app allows users to track their daily mood and receive AI-generated insights to better understand and manage their emotions. Users can input their mood on a scale, provide a brief description, and view personalized suggestions from ChatGPT.

---

## Features

- **Mood Input:** Users can log their mood on a scale (1–5) and add a description.
- **AI Insights:** Integrates with ChatGPT API to generate tailored insights.
- **Real-Time Feedback:** Displays AI-generated responses instantly.
- **Error Handling:** Validates inputs and manages API errors gracefully.

---

## Tech Stack

### Frontend

- React Native
- Expo
- TypeScript

### Backend

- Node.js
- Express
- Axios

### API

- OpenAI ChatGPT API

---

## Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:girma336/mood-tracker-.git
   ```
2. Navigate to frontend directory
   ```bash
   cd mood-tracker-ai/frontend
   ```
3. install dependancies
   ```bash
   npm install
   ```
4. Start the Expo development server:
   ```bash
   npx expo start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd mood-backend
   ```
2. Install dependencies:

   ```bash

   npm install
   ```

3. Create a .env file in the backend directory with the following content:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the server:

   ```bash

   npm run dev
   ```

## Usage

1. Open the app on your mobile device or emulator.
2. Enter your mood (1–5) and a brief description, then submit.
3. View AI-generated insights displayed in the app.

## Project stracture

```
mood-tracker-ai/
│
├── frontend/                # React Native app
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app entry point
│
├── backend/                 # Node.js server
│   ├── routes/              # API routes
│   ├── utils/               # Helper functions
│   ├── index.js             # Server entry point
│   └── .env                 # Environment variables
│
└── README.md                # Project documentation

```

## Approach

### Frontend Development

1. Built a user-friendly UI with inputs for mood scale, 2. 2.description, and a submit button.
2. Used Expo for quick development and testing.

### Backend Development

1. Created a Node.js server with Express to handle requests and forward data to ChatGPT.
2. Used Axios for API communication and robust error handling.

### AI Integration

1. Used OpenAI's ChatGPT API to generate meaningful insights based on user data.
2. Customized prompts to improve relevance and usefulness of responses.

### Error Handling

1. Validated user inputs to ensure data integrity.
2. Handled API errors gracefully, displaying error messages where necessary.

## Challenges

1. API Integration: Managing response times and errors when communicating with ChatGPT.
2. Frontend-Backend Communication: Ensuring smooth data flow and user experience.
3. Type Safety: Maintaining strict type safety with TypeScript across both frontend and backend.

## Future Enhancements

1. Historical Insights: Allow users to view past mood entries and AI insights.
2. Data Visualization: Add a graph to display mood trends over time.
3. Authentication: Enable user accounts for personalized tracking.
4. Cloud Deployment: Deploy the backend to a production-ready platform like AWS or Heroku.

## Contact

- If you have questions or suggestions, feel free to reach out:
  Your Name: Girma Tarekegn
  Email: girmatarekegn.gi@gmail.com
  GitHub: girma336
