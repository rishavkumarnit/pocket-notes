import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Data } from "../../App";
import "./noteSection.css";

const NoteSection = () => {
  const { notes, setNotes, note, setNote, selected, setSelected } = useContext(Data);

  const [text, setText] = useState("");

  useEffect(() => {
    const currentNote = notes.find((item) => {
      return selected === item.groupName;
    });
    setNote(currentNote);
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddNoteItem = async () => {
    if (!text) {
      alert("Please enter some text!!");
      return;
    }
    const noteTime = new Date();
    const datePart = noteTime.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timePart = noteTime.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedTime = `${datePart}  •  ${timePart}`;
    const newNotes = await notes.filter(
      (item) => item.groupName !== note.groupName
    );
    const newNote = {
      ...note,
      content: [...(note.content || []), { text, displayTime: formattedTime }],
    };
    await setNote(newNote);
    await setNotes([...newNotes, newNote]);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNoteItem();
      e.preventDefault();
    }
  };

  const handleSlectedNulll = ()=>{
    setSelected(null);
  }
  return (
    <>
      {note && (
        <div className="note-page">
          <div className="note-heading">
            <span className="back" onClick={handleSlectedNulll} ><img src="./back.png" alt="" /></span>
            <span
              className="note-title"
              style={{ backgroundColor: note.color }}
            >
              {note.groupInitial}
            </span>
            <span className="note-name">{note.groupName}</span>
          </div>
          <div className="all-note-itmes">
            {note.content &&
              note.content.map((item, index) => {
                return (
                  <div className="content-box" key={index}>
                    <div className="item-text">{item.text}</div>
                    <div className="item-time">{item.displayTime}</div>
                  </div>
                );
              })}
          </div>
          <div onKeyDown={handleKeyDown} className="input-div">
            <textarea
              className="text-area"
              placeholder="Enter your text here..........."
              value={text}
              onChange={handleTextChange}
            ></textarea>
            {text && (
              <img
                onClick={handleAddNoteItem}
                className="blue-button"
                src="./button-blue.png"
                alt=""
              />
            )}
            {!text && (
              <img className="grey-button" src="./button-grey.png" alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteSection;
