import { useState, useEffect } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { fetchProjects } from "../api/projectApi";

export default function Studio() {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchProjects();
        if (projects.length) {
          const project = projects[0];
          setFiles(project.files);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div style={{ height: "100vh" }}>
      <Sandpack template="react" files={files} theme="light" options={{ editorHeight: 500, autorun: true }} />
    </div>
  );
}
