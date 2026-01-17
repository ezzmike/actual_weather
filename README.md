# 🌦️ Just The Weather — The Only Weather App You’ll Ever Need! 🚀

Welcome to **Just The Weather**, the supremely robust, hyper-realistic, and dangerously dynamic weather dashboard. Whether you’re planning a picnic or prepping for a hurricane, we’ve got your back with up-to-the-minute precision! 🌪️✨

## 🌟 Why it’s Awesome

- **🎨 Eye-Candy UI**: Glassmorphism, smooth animations, and dynamic backgrounds that change *with* the sky. It’s like looking out a window, but better!
- **🛰️ Live Satellite & Radar**: Real-time interactive maps centered on your location. Watch the storms roll in!
- **🔭 Dynamic Autocomplete**: Fast, smart suggestions that resolve ZIP codes to cities (e.g., search "90210" to see "Beverly Hills, CA").
- **🌡️ Dual Mode**: Toggle between **Fahrenheit (American) 🇺🇸** and **Celsius (Everybody Else) 🌍** with one click.
- **📍 Telepathic Geolocation**: One click and we find you. Not in a creepy way, just in a "here is your rain forecast" way.
- **🔍 Search Anything**: City names? Got it. Zip codes? Easy. Your secret lair address? If it’s on the map, we’ll find the weather.
- **📅 10-Day Deep Dive**: Plan your next week and a half with confidence. Rain or shine, you’ll be the first to know.
- **🐳 Docker Ready**: Want to run it on a virtual instance in the cloud? One command and you’re live. Boom.

## 🚀 Quick Start (For Humans)

### 🛠️ Prerequisites
- **Node.js 18+** (The brain)
- **WeatherAPI.com Key** (The juice — get a free one [here](https://www.weatherapi.com/))

### 🏃 Setup
1. **Grab the code**:
   ```bash
   git clone https://github.com/ezzmike/actual_weather.git
   cd actual_weather
   ```
2. **Install the magic**:
   ```bash
   npm install
   ```
3. **Add your secret sauce**:
   ```bash
   cp .env.example .env
   # Add your WEATHER_API_KEY to the .env file!
   ```
4. **Ignition**:
   ```bash
   npm run dev
   ```
   Now fly over to [http://localhost:3000](http://localhost:3000) and enjoy the breeze! 🌬️

## 📦 Containerize (For Robots)

Running on a virtual instance? We love that for you.
```bash
docker-compose up -d
```
The robots will take it from here. 🤖

## 🏠 Make your Synology Work Harder

Setting this up on your Synology NAS is a breeze with **Container Manager**.

1.  **Prepare**: Create a folder in `File Station` (e.g., `/docker/weather`) and upload the project files (including `.env`).
2.  **Create Project**: Open **Container Manager** > **Project** > **Create**.
3.  **Config**: Set a name, select your folder, and it will pick up the `docker-compose.yml`.
4.  **Launch**: Follow the wizard, and once it's "Running", access it at `http://[NAS-IP]:3000`.

*Pro Tip: Use the **Reverse Proxy** in Control Panel to give it a clean HTTPS domain!*

## 🛠️ Tech Stack of the Future
- **Next.js** (The Foundation)
- **Tailwind CSS** (The Style)
- **Framer Motion** (The Vibes)
- **Lucide React** (The Icons)
- **Docker** (The Suitcase)

---
*I swear I'm not tracking you. Powered by Satellite Data & sheer willpower. Stay dry!* ☔
