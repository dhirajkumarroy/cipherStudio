// src/pages/EditorPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../context/ProjectProvider.jsx";
import FileExplorer from "../components/Editor/FileExplorer.jsx";
import CodeEditor from "../components/Editor/CodeEditor.jsx";
import LivePreview from "../components/Editor/LivePreview.jsx";

export default function EditorPage() {
  const { id } = useParams(); // project ID from URL
  const { getProjectById } = useContext(ProjectContext);

  const [project, setProject] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    // Fetch project details from context (or API)
    const data = getProjectById ? getProjectById(id) : null;
    if (data) {
      setProject(data);
      setActiveFile(data.files?.[0] || null);
      setCode(data.files?.[0]?.content || "");
    }
  }, [id, getProjectById]);

  if (!project) {
    return <div className="p-8 text-gray-500">Loading project...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Left panel: File Explorer */}
      <div className="w-1/5 border-r bg-white">
        <FileExplorer
          files={project.files}
          activeFile={activeFile}
          onSelectFile={(file) => {
            setActiveFile(file);
            setCode(file.content);
          }}
        />
      </div>

      {/* Middle panel: Code Editor */}
      <div className="flex-1 border-r bg-white">
        {activeFile ? (
          <CodeEditor
            fileName={activeFile.name}
            code={code}
            onChange={(val) => setCode(val)}
          />
        ) : (
          <div className="p-8 text-gray-500">Select a file to edit</div>
        )}
      </div>

      {/* Right panel: Live Preview */}
      <div className="w-1/3 bg-white">
        <LivePreview code={code} />
      </div>
    </div>
  );
}
