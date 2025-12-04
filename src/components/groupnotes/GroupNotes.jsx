import React from "react";
import { useContext } from "react";
import { Data } from "../../App";
import "./groupNotes.css";

const GroupNotes = () => {
  const {
    notes,
    selected,
    setSelected,
  } = useContext(Data);


  const handleSelectItem = async (item) => {
    await setSelected(item.groupName);
    localStorage.setItem("selected", item.groupName);
  };

  return (
    notes.length > 0 && (
      <div className="group-box custom-scroll">
        {notes
          .sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime))
          .map((item) => (
            <div
              onClick={() => handleSelectItem(item)}
              key={item.groupName}
              className={`group-item ${
                item.groupName === selected ? "selected-group" : ""
              }`}
            >
              <span
                className="item-title"
                style={{ backgroundColor: item.color }}
              >
                {item.groupInitial}
              </span>
              <span className="item-name">{item.groupName}</span>
            </div>
          ))}
      </div>
    )
  );
};

export default GroupNotes;
