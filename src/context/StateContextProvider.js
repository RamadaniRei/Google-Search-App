import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const baseUrl = process.env.REACT_APP_URL;
const api = process.env.REACT_APP_API_KEY;
export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (url) => {
    console.log(url);
    console.log(baseUrl);
    setLoading(true);

    const res = await fetch(`https://google-search74.p.rapidapi.com${url}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "google-search74.p.rapidapi.com",
        "x-rapidapi-key": api,
      },
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
