import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      const finalData = {
        city: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        time: weatherData.current_weather.time,
      };

      setWeather(finalData);
      localStorage.setItem("lastWeather", JSON.stringify(finalData));
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Something went wrong. Try again!");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("lastWeather");
    if (saved) {
      setWeather(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500 p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">☁️ Weather Now</h1>
          <p className="text-white/80">
            Get current weather conditions for any city, perfect for outdoor planning
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 outline-none rounded-l-2xl"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-5 py-2 rounded-r-2xl hover:bg-blue-600 transition"
          >
            🔍
          </button>
        </div>

        {/* Weather Result Card OR Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {weather ? (
            <WeatherCard data={weather} />
          ) : (
            <>
              <div className="text-5xl mb-4">☁️</div>
              <h2 className="text-xl font-semibold mb-2">
                Welcome to Weather Now!
              </h2>
              <p className="text-gray-600">
                Search for any city to get the current weather conditions
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
