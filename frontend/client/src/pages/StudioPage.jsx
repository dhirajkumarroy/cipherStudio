// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function StudioPage() {
//   const [projects, setProjects] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const token = localStorage.getItem("token");

//   // ✅ Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // ✅ Create new project
//   const createProject = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       alert("Please login first!");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/projects",
//         {
//           name, // ✅ Backend expects 'name'
//           description,
//           files: [], // optional but expected by backend schema
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setShowModal(false);
//       setName("");
//       setDescription("");
//       fetchProjects(); // refresh list
//     } catch (err) {
//       if (err.response) {
//         console.error("Server Error:", err.response.data);
//         alert(`Error: ${err.response.data.message || "Invalid data"}`);
//       } else if (err.request) {
//         console.error("Network Error:", err.message);
//         alert("Network error! Check backend or internet connection.");
//       } else {
//         console.error("Error:", err.message);
//       }
//     }
//   };

//   // ✅ Delete a project
//   const deleteProject = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error deleting project:", err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           + New Project
//         </button>
//       </div>

//       {projects.length === 0 ? (
//         <p className="text-gray-600">No projects yet. Create your first one!</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {projects.map((p) => (
//             <div
//               key={p._id}
//               className="border p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold">{p.name}</h3>
//               <p className="text-gray-600 text-sm mt-1">
//                 {p.description || "No description"}
//               </p>
//               <button
//                 onClick={() => deleteProject(p._id)}
//                 className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Modal for project creation */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Create Project</h2>
//             <form onSubmit={createProject}>
//               <input
//                 type="text"
//                 placeholder="Project Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full border p-2 rounded mb-3"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border p-2 rounded mb-3"
//               ></textarea>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/StudioPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function StudioPage() {
//   const [projects, setProjects] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const token = localStorage.getItem("token");

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const createProject = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       alert("Please login first!");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/projects",
//         { name, description, files: [] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setShowModal(false);
//       setName("");
//       setDescription("");
//       fetchProjects();
//     } catch (err) {
//       console.error("Error creating project:", err);
//       alert("Failed to create project");
//     }
//   };

//   const deleteProject = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error deleting project:", err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           + New Project
//         </button>
//       </div>

//       {projects.length === 0 ? (
//         <p className="text-gray-600">No projects yet. Create your first one!</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {projects.map((p) => (
//             <div
//               key={p._id}
//               className="border p-4 rounded-lg hover:shadow-md transition-shadow"
//             >
//               <Link to={`/studio/${p._id}`}>
//                 <h3 className="text-lg font-semibold hover:underline">
//                   {p.name}
//                 </h3>
//               </Link>
//               <p className="text-gray-600 text-sm mt-1">
//                 {p.description || "No description"}
//               </p>
//               <button
//                 onClick={() => deleteProject(p._id)}
//                 className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Create Project</h2>
//             <form onSubmit={createProject}>
//               <input
//                 type="text"
//                 placeholder="Project Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full border p-2 rounded mb-3"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border p-2 rounded mb-3"
//               ></textarea>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// frontend/src/pages/StudioPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudioPage() {
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetch(); }, []);

  const create = async (e) => {
    e.preventDefault();
    // create with starter files (index + App)
    const defaultFiles = {
      "/src/main.jsx": `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.jsx"; createRoot(document.getElementById("root")).render(<App />);`,
      "/src/App.jsx": `export default function App(){ return <div><h1>Hello from ${name}</h1></div> }`,
      "/index.html": `<!doctype html><html><head><meta charset="utf-8"/><title>${name}</title></head><body><div id="root"></div></body></html>`
    };

    try {
      await API.post("/projects", { name, description: desc, files: defaultFiles });
      setShowCreate(false);
      setName(""); setDesc("");
      fetch();
    } catch (err) { console.error(err); alert("Create failed"); }
  };

  const remove = async (id) => {
    if (!confirm("Delete project?")) return;
    try { await API.delete(`/projects/${id}`); fetch(); } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CipherStudio</h1>
        <div>
          <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={() => setShowCreate(true)}>+ New</button>
        </div>
      </div>

      {showCreate && (
        <form onSubmit={create} className="mb-4 border p-4 rounded">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Project name" className="border p-2 mb-2 w-full" />
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="border p-2 mb-2 w-full" />
          <div><button className="bg-green-600 text-white px-3 py-2 rounded">Create</button></div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => navigate(`/studio/${p._id}`)} className="bg-indigo-600 text-white px-3 py-1 rounded">Open</button>
              <button onClick={() => remove(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
