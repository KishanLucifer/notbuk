// import { useContext } from "react";
// import PropTypes from "prop-types"; // Import prop-types
// import noteContext from "../context/notes/noteContext";

// const Noteitem = (props) => {
//   const context = useContext(noteContext);
//   const { deleteNote } = context;
//   const { note, updateNote } = props;

//   return (
//     <>
//       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//         <a href="#">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {note.title}
//           </h5>
//         </a>
//         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//           {note.description}
//         </p>
//         <div className="px-6 pt-4 pb-2">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//             #{note.tag}
//           </span>
//         </div>
//         <a
//           href="#"
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           onClick={() => {
//             deleteNote(note._id);
//           }}
//         >
//           Delete
//         </a>
//         <a
//           href="#"
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           onClick={() => {
//             updateNote(note);
//           }}
//         >
//           Edit
//         </a>
//       </div>
//     </>
//   );
// };

// // Define prop types for Noteitem
// Noteitem.propTypes = {
//   note: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     tag: PropTypes.string.isRequired,
//   }).isRequired,
//   updateNote: PropTypes.func.isRequired,
// };

// export default Noteitem;

// import { useContext } from "react";
// import PropTypes from "prop-types";
// import noteContext from "../context/notes/noteContext";

// const Noteitem = (props) => {
//   const context = useContext(noteContext);
//   const { deleteNote } = context;
//   const { note, updateNote } = props;
//   // Split the tag string into an array of tags
//   const tags = note.tag.split(/[\s,]+/); // Adjust the delimiter based on how tags are separated

//   return (
//     <>
//       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//         <a href="#">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis">
//             {note.title}
//           </h5>
//         </a>
//         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
//           {note.description}
//         </p>
//         {/* <div className="px-6 pt-4 pb-2">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 overflow-hidden text-ellipsis">
//             #{note.tag}
//           </span>
//         </div> */}
//         <div className="px-6 pt-4 pb-2">
//           {tags.map((tag, index) => (
//             <span
//               key={index}
//               className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 overflow-hidden text-ellipsis"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>

//         <div className="flex space-x-2">
//           <a
//             href="#"
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
//             onClick={() => {
//               deleteNote(note._id);
//             }}
//           >
//             Delete
//           </a>
//           <a
//             href="#"
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
//             onClick={() => {
//               updateNote(note);
//             }}
//           >
//             Edit
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// // Define prop types for Noteitem
// Noteitem.propTypes = {
//   note: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     tag: PropTypes.string.isRequired,
//   }).isRequired,
//   updateNote: PropTypes.func.isRequired,
// };

// export default Noteitem;

import { useContext } from "react";
import PropTypes from "prop-types";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  // Split the tag string into an array of tags
  const tags = note.tag.split(/[\s,]+/); // Adjust the delimiter based on how tags are separated

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
            {note.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
          {note.description}
        </p>
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
          onClick={() => {
            deleteNote(note._id);
          }}
        >
          Delete
        </a>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={() => {
            updateNote(note);
          }}
        >
          Edit
        </a>
      </div>
    </div>
  );
};

// Define prop types for Noteitem
Noteitem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Noteitem;
