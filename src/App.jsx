import { useState, useEffect } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
import darkBackground from "./assets/images/dark-background.jpg";

function App() {
  const [input, setInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true); // State to manage temperature unit
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Use a reverse geocoding API to get the city name from latitude and longitude
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.city) {
            setPlace(data.city);
          }
        })
        .catch((error) => console.error("Error fetching location:", error));
    });
  }, [setPlace]);

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp) => {
    return isCelsius ? temp : ((temp * 9) / 5 + 32).toFixed(1);
  };

  return (
    <div
      className="w-full h-screen text-white px-8"
      style={{
        backgroundImage: isDarkTheme ? `url(${darkBackground})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Climate Dashboard</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={convertTemperature(weather.temp)}
          heatIndex={convertTemperature(weather.heatindex)}
          iconString={weather.conditions}
          conditions={weather.conditions}
          isCelsius={isCelsius}
        />

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={convertTemperature(curr.temp)}
                iconString={curr.conditions}
                isCelsius={isCelsius}
              />
            );
          })}
        </div>
      </main>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={toggleTheme}
      >
        Switch to {isDarkTheme ? "Light" : "Dark"} Theme
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded mt-4 ml-4"
        onClick={toggleUnit}
      >
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
}

export default App;
