import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Database } from "sql.js";
import { loadDatabase } from "../Database/loadDb";

interface DbContextType {
  db: Database | undefined;
  setDb: React.Dispatch<React.SetStateAction<Database | undefined>>;
}
const DbContext = createContext<DbContextType | undefined>(undefined);

export function DbProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<Database | undefined>(undefined);

  useEffect(() => {
    loadDatabase().then((db) => {
      setValue(db);
    });
  }, []);

  return (
    <DbContext.Provider value={{ db: value, setDb: setValue }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDbContextValue() {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("useDbContext must be used within a DbProvider");
  }
  return context;
}
