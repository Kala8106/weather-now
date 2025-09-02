export default function WeatherCard({ data }) {
  return (
    <>
  
      <p className="text-lg">🌡️ Temperature: {data.temperature}°C</p>
      <p className="text-lg">💨 Wind Speed: {data.windspeed} km/h</p>
      <p className="text-sm text-gray-500 mt-4">
        ⏰ {new Date(data.time).toLocaleString()}
      </p>
    </>
  );
}
