// import { useContext, useEffect, useRef, useState } from "react";
// import noteContext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import { useNavigate } from "react-router-dom";

// const Notes = () => {
//   const context = useContext(noteContext);
//   const { notes, getNotes, editNote } = context;
//   const navigate = useNavigate(); // Use the useNavigate hook

//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       getNotes();
//       console.log("token saved and got notes in notes.jsx");
//     } else {
//       navigate("/signin"); // Redirect to the desired page after signin
//       console.log("Signin first");
//     }
//     // eslint-disable-next-line
//   }, []);
//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const [note, setNote] = useState({
//     id: "",
//     etitle: "",
//     edescription: "",
//     etag: "",
//   });

//   const updateNote = (currentNote) => {
//     ref.current.click();
//     setNote({
//       id: currentNote._id,
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.tag,
//     });
//   };

//   const handleClick = (e) => {
//     editNote(note.id, note.etitle, note.edescription, note.etag);
//     refClose.current.click();
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <AddNote />
//       {/* <button
//         ref={ref}
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         Launch demo modal
//       </button>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Edit Note
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form className="my-3">
//                 <div className="mb-3">
//                   <label htmlFor="title" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etitle"
//                     name="etitle"
//                     value={note.etitle}
//                     aria-describedby="emailHelp"
//                     onChange={onChange}
//                     minLength={5}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edescription"
//                     name="edescription"
//                     value={note.edescription}
//                     onChange={onChange}
//                     minLength={5}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="tag" className="form-label">
//                     Tag
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etag"
//                     name="etag"
//                     value={note.etag}
//                     onChange={onChange}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 ref={refClose}
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 disabled={
//                   note.etitle.length < 5 || note.edescription.length < 5
//                 }
//                 onClick={handleClick}
//                 type="button"
//                 className="btn btn-primary"
//               >
//                 Update Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="row my-3">
//         <h2>Your Notes</h2>
//         <div className="container mx-2">
//           {Array.isArray(notes) && notes.length === 0 && "No notes to display"}
//         </div>
//         {Array.isArray(notes) &&
//           notes.map((note) => (
//             <Noteitem key={note._id} updateNote={updateNote} note={note} />
//           ))}
//       </div>
//     </>
//   );
// };

// export default Notes;

// import { useContext, useEffect, useState } from "react";
// import noteContext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import { useNavigate } from "react-router-dom";

// const Notes = () => {
//   const context = useContext(noteContext);
//   const { notes, getNotes, editNote } = context;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       getNotes();
//       // console.log("Token saved and got notes in notes.jsx");
//     } else {
//       navigate("/signin");

//       // console.log("Signin first");
//       alert("Signin first");
//     }
//     // eslint-disable-next-line
//   }, []);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [note, setNote] = useState({
//     id: "",
//     etitle: "",
//     edescription: "",
//     etag: "",
//   });

//   const updateNote = (currentNote) => {
//     setModalOpen(true);
//     setNote({
//       id: currentNote._id,
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.tag,
//     });
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     editNote(note.id, note.etitle, note.edescription, note.etag);
//     setModalOpen(false);
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <AddNote />

//       {modalOpen && (
//         <div
//           id="crud-modal"
//           tabIndex="-1"
//           aria-hidden="true"
//           className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50"
//         >
//           <div className="relative p-4 w-full max-w-md max-h-full">
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Update Note
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               <form className="p-4 md:p-5">
//                 <div className="grid gap-4 mb-4 grid-cols-2">
//                   <div className="col-span-2">
//                     <label
//                       htmlFor="etitle"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       name="etitle"
//                       id="etitle"
//                       value={note.etitle}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                       placeholder="Title"
//                       onChange={onChange}
//                       minLength={5}
//                       required
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <label
//                       htmlFor="edescription"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Description
//                     </label>
//                     <input
//                       type="text"
//                       name="edescription"
//                       id="edescription"
//                       value={note.edescription}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                       placeholder="Description"
//                       onChange={onChange}
//                       minLength={5}
//                       required
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <label
//                       htmlFor="etag"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Tag
//                     </label>
//                     <input
//                       type="text"
//                       name="etag"
//                       id="etag"
//                       value={note.etag}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                       placeholder="Tag"
//                       onChange={onChange}
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   disabled={
//                     note.etitle.length < 5 || note.edescription.length < 5
//                   }
//                   onClick={handleClick}
//                 >
//                   Update note
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="mx-auto px-12">
//         <h2 className="text-3xl font-bold my-4">Your Notes</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-1 sm:px-20 md:px-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {Array.isArray(notes) && notes.length === 0 && (
//             <p className="text-gray-500">Create some notes first</p>
//           )}
//           {Array.isArray(notes) &&
//             notes.map((note) => (
//               <Noteitem key={note._id} updateNote={updateNote} note={note} />
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Notes;

import { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getNotes();
    } else {
      navigate("/signin");
      alert("Signin first");
    }
  }, [getNotes, navigate]);

  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    setModalOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setModalOpen(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <AddNote />

        {modalOpen && (
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update Note
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setModalOpen(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="etitle"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="etitle"
                        id="etitle"
                        value={note.etitle}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Title"
                        onChange={onChange}
                        minLength={5}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="edescription"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="edescription"
                        id="edescription"
                        value={note.edescription}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Description"
                        onChange={onChange}
                        minLength={5}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="etag"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tag
                      </label>
                      <input
                        type="text"
                        name="etag"
                        id="etag"
                        value={note.etag}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tag"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={
                      note.etitle.length < 5 || note.edescription.length < 5
                    }
                    onClick={handleClick}
                  >
                    Update note
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl">
          <h2 className="text-3xl font-bold my-4">Your Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(notes) && notes.length === 0 && (
              <p className="text-gray-500">Create some notes first</p>
            )}
            {Array.isArray(notes) &&
              notes.map((note) => (
                <Noteitem key={note._id} updateNote={updateNote} note={note} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
