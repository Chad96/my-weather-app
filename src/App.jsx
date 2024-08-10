import { useState, useEffect } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
import darkBackground from "./assets/images/dark-background.jpg";

function App() {
  const [input, setInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const { weather, thisLocation, values, place, setPlace } = useStateContext();
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
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

    const saved = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(saved);
  }, [setPlace]);

  const submitCity = () => {
    setPlace(input);
    setInput("");
    saveLocation(input);
  };

  const saveLocation = (location) => {
    const updatedLocations = [...savedLocations, location];
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
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
      className="w-full min-h-screen text-white px-8"
      style={{
        backgroundImage: isDarkTheme ? `url(${darkBackground})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat if the content is shorter than the screen height
        backgroundAttachment: "fixed", // Keeps the background fixed while scrolling
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
      <div className="mt-4">
        <h2 className="font-bold text-xl">Saved Locations</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          {savedLocations.map((location, index) => (
            <button
              key={index}
              className="bg-gray-700 text-white p-2 rounded"
              onClick={() => setPlace(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
