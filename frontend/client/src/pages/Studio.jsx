// // src/pages/Studio.jsx
// import React, { useEffect, useState } from "react";
// import { fetchProjects } from "../api/projectApi.js";

// export default function Studio() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchProjects();
//         setProjects(data);
//       } catch (error) {
//         console.error("Failed to load projects:", error);
//       }
//     })();
//   }, []);

//   return (
//     <div>
//       <h1>🎨 Studio Projects</h1>
//       <ul>
//         {projects.map((p) => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/pages/Studio.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api/projectApi.js";
import { useNavigate } from "react-router-dom";

export default function Studio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>⏳ Loading projects...</p>;
  if (error) return <p>❌ {error}</p>;
  if (projects.length === 0) return <p>No projects yet. Create your first one!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 Studio Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/editor/${p.id}`)}
          >
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{p.description || "No description"}</p>
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(p.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
