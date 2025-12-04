import { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
// eslint-disable-next-line react-refresh/only-export-components
export const Data = createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="app-container">
        <Data.Provider
          value={{
            notes,
            setNotes,
            note,
            setNote,
            create,
            setCreate,
            selected,
            setSelected,
          }}
        >
          <Navbar />
          <Home />
        </Data.Provider>
      </div>
    </>
  );
}

export default App;
