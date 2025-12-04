import "./navbar.css";
import { useContext } from "react";
import { Data } from "../../App";
import GroupNotes from "../groupnotes/GroupNotes";

const Navbar = () => {
  const { create, setCreate, selected, setSelected } = useContext(Data);

  const handlePlusClick = () => {
    setCreate(true);
  };
  const handleSelectedNull = () => {
    setSelected(null);
  };

  return (
    <div
      className={`navbar ${selected ? "nav-selected" : "dummy-nav"}`}
      style={{
        opacity: create ? 0.6 : 1,
      }}
    >
      <p onClick={handleSelectedNull} className="pocket-title">
        Pocket Notes
      </p>
      <GroupNotes />
      <div onClick={handlePlusClick} className="plus-button">
        <div className="plus-1"></div>
        <div className="plus-2"></div>
      </div>
    </div>
  );
};

export default Navbar;
