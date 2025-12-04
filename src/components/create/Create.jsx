import React, { useState } from "react";
import "./create.css";
import { useContext, useEffect } from "react";
import { Data } from "../../App";

const Create = () => {
  const { notes, setNotes, setCreate, setSelected } = useContext(Data);

  const [groupName, setGroupname] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleGroupNameChange = (e) => {
    setGroupname(e.target.value);
  };

  const getInitials = (word) => {
    let first = "";
    let second = "";
    let findSecond = false;
    word = word.trim();
    for (let i = 0; i < word.length; i++) {
      if (!first) {
        first = word[i];
      } else if (word[i] === " ") {
        findSecond = true;
      } else if (findSecond && word[i] != " ") {
        second = word[i];
      }
      if (first && second) {
        break;
      }
    }
    return first + second;
  };

  const handleColorSelection = (e) => {
    setColor(e.target.getAttribute("data-color"));
  };

  const handleCreate = async () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) {
      alert("Please add a name");
      return;
    }
    if (!color) {
      alert("please select a color also!!");
      return;
    }

    if (notes.some((item) => item.groupName === trimmedName)) {
      alert("The group name is already taken!!");
      return;
    }
    const groupInitial = getInitials(trimmedName).toUpperCase();
    await setNotes([
      ...notes,
      {
        groupInitial,
        groupName: trimmedName,
        color,
        content: [],
        createdTime: new Date(),
      },
    ]);
    setCreate(false);
    setGroupname("");
    setSelected(null);
    setColor("");
  };

  return (
    <div className="create-container">
      <p className="cng-text">Create New group</p>
      <div className="group-name">
        <span className="name-text">Group Name</span>
        <input
          className="name-input"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Enter group name"
          type="text"
        />
      </div>
      <div className="color-stack">
        <span className="choose-text">Choose colour</span>
        <span
          onClick={handleColorSelection}
          data-color="#b38bfa"
          className={`color-1 ${color === "#b38bfa" ? "bright" : ""}`}
        ></span>
        <span
          onClick={handleColorSelection}
          data-color="#ff79f2"
          className={`color-2 ${color === "#ff79f2" ? "bright" : ""}`}
        ></span>
        <span
          onClick={handleColorSelection}
          data-color="#43e6fc"
          className={`color-3 ${color === "#43e6fc" ? "bright" : ""}`}
        ></span>
        <span
          onClick={handleColorSelection}
          data-color="#f19576"
          className={`color-4 ${color === "#f19576" ? "bright" : ""}`}
        ></span>
        <span
          onClick={handleColorSelection}
          data-color="#0047ff"
          className={`color-5 ${color === "#0047ff" ? "bright" : ""}`}
        ></span>
        <span
          onClick={handleColorSelection}
          data-color="#6691ff"
          className={`color-6 ${color === "#6691ff" ? "bright" : ""}`}
        ></span>
      </div>
      <div className="button-div">
        <button onClick={handleCreate} className="create-btn">
          Create
        </button>
      </div>
    </div>
  );
};

export default Create;
