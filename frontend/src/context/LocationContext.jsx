import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {

  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || null
  );

  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);