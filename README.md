# GreenCalc

GreenCalc is a React + TypeScript (TSX) web application designed to provide digital solutions for irrigation scheduling and water management in agriculture. By leveraging real-time weather data, crop-specific water requirements, and soil moisture analysis, GreenCalc helps farmers optimize irrigation practices, conserve water, and improve crop health.

## 🌐 Live Demo
>[Click here](https://weather-pre1.netlify.app)


## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running the App](#running-the-app)
* [Project Structure](#project-structure)
* [Pages Overview](#pages-overview)

  * [Home](#1-home)
  * [Weather Prediction](#2-weather-prediction)
  * [Water Consumption Calculator](#3-water-consumption-calculator)
  * [Soil Moisture Calculator](#4-soil-moisture-calculator)


## Features

* **Home Page**: Overview of GreenCalc’s goals, mission, and key features.
* **Weather Prediction**: Enter a city name to fetch weather data, irrigation timing suggestions, and recommended crops.
* **Water Consumption Calculator**: Input field area (hectares), crop type, and growing season to calculate:

  * Daily Water Need
  * Seasonal Water Need
  * Water Efficiency
  * Water consumption matrix (graphical representation)
* **Soil Moisture Calculator**: Input soil type, method of data input (manual or city-based), recent rainfall (mm), and days since last watering to determine:

  * Current Moisture Level
  * Optimal Moisture Range
  * Moisture Status and Watering Recommendation
  * Soil moisture level over time (graph)
  * Plant health status based on moisture levels

## Technology Stack

* **React** (v18+) with **TypeScript** (tsx)
* **Tailwind CSS** for styling (optional, adjust as needed)
* **Chart.js** or **Recharts** for graphical data visualization
* **OpenWeatherMap API** for weather data

## Getting Started

### Prerequisites

* Node.js (v14 or above)
* npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/greencalc.git
   cd greencalc
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

```
greencalc/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Context API providers & hooks
│   ├── pages/            # Page-level components
│   │   ├── Home.tsx
│   │   ├── Weather.tsx
│   │   ├── WaterCalculator.tsx
│   │   └── SoilMoisture.tsx
│   ├── services/         # API service modules
│   ├── utils/            # Utility functions
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/           # Global and component styles
├── .env                  # Environment variables (e.g. API keys)
├── package.json
└── README.md
```

## Pages Overview

### 1. Home

The Home page introduces the project and outlines its objectives:

* Mission: Provide a digital irrigation scheduling tool to help farmers.
* Key benefits: Water conservation, optimized crop yields, data-driven decisions.

### 2. Weather Prediction

* **Input**: City name
* **Output**:

  * Current and forecasted weather data
  * Irrigation timing suggestions
  * Crop recommendations based on seasonal suitability

### 3. Water Consumption Calculator

* **Inputs**:

  1. Field Area (hectares)
  2. Crop Type
  3. Growing Season
* **Outputs**:

  * Daily Water Need
  * Seasonal Water Need
  * Water Efficiency
  * Graphical water consumption matrix

### 4. Soil Moisture Calculator

* **Inputs**:

  * Soil Type
  * Data input method:

    * Manual rainfall (mm)
    * City-based weather data
  * Days since last watering
* **Outputs**:

  * Current Moisture Level (e.g., 75%)
  * Optimal range (e.g., 75% - 90%)
  * Status (Optimal, Deficient, Excess)
  * Watering recommendation (e.g., next watering in 3 days)
  * Soil moisture level graph
  * Plant health indicator
