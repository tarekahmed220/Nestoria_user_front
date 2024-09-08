import { createContext, useContext, useState } from "react";

const searchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(searchContext);
  return context;
}

export { SearchProvider, useSearchContext };
