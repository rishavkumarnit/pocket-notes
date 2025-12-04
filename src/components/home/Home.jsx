
import "./home.css";
import { useContext, useEffect } from "react";
import { Data } from "../../App";
import Create from "../create/Create";
import NoteSection from "../notesection/NoteSection";

const Home = () => {
  const { setNotes, create, setCreate, selected, setSelected } =
    useContext(Data);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("selected");
    if (saved) {
      setSelected(saved);
    }
  }, []);

  const handleClickOutside = () => {
    setCreate(false);
  };

  return (
    <>
      {create && <div onClick={handleClickOutside} className="overlay"></div>}
      {create && <Create />}

      <div className={`main-section ${selected? "ms-selected": "dummy-ms"}`}>
        {selected && <NoteSection />}
        {!selected && (
          <div
            className="content"
            style={{
              opacity: selected ? 0 : create ? 0.6 : 1,
            }}
          >
            <img className="img-bg" src="./bg-home.png" alt="" />
            <p className="home-text-1">Pocket Notes</p>
            <p className="home-text-2">
              Send and receive messages without keeping your phone online.
            </p>
            <p className="home-text-3">
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className="lock">
              <span className="lock-img">
                <img src="./lock.png" alt="" />
              </span>
              <span>end-to-end encrypted</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
