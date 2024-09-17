import NoteContext from "./noteContext";
import { useState } from "react";
import PropTypes from "prop-types";

const NoteState = (props) => {
  // const host = "https://notbuk-api.vercel.app";
  const host = "http://localhost:3000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Retrieve token (modify this based on your actual token retrieval method)
  const getToken = () => {
    // Example: retrieve token from local storage
    return localStorage.getItem("access_token");
  };

  // 1 Get all Notes
  const getNotes = async () => {
    try {
      const access_token = getToken();
      if (!access_token) {
        console.error("Authentication token is missing.");
        return;
      }
      // API Call
      const response = await fetch(`${host}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const json = await response.json();
      // console.log("Fetched Notes:", json);
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("API response is not an array:", json);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // 2 Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const access_token = getToken();
      if (!access_token) {
        console.error("Authentication token is missing.");
        return;
      }
      // API Call
      const response = await fetch(`${host}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      // console.log("Added Note:", note);
      if (note && !note.error) {
        setNotes(notes.concat(note));
      } else {
        console.error("Failed to add note:", note);
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // 3 Delete a Note
  const deleteNote = async (id) => {
    try {
      const access_token = getToken();
      if (!access_token) {
        console.error("Authentication token is missing.");
        return;
      }
      // API Call
      const response = await fetch(`${host}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const json = await response.json();
      console.log("Deleted Note:", json);

      if (!json.error) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Failed to delete note:", json);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // 4 Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const access_token = getToken();
      if (!access_token) {
        console.error("Authentication token is missing.");
        return;
      }
      // API Call
      const response = await fetch(`${host}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      // console.log("Edited Note:", json);

      if (!json.error) {
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      } else {
        console.error("Failed to edit note:", json);
      }
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoteState;
