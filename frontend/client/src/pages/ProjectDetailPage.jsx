
// frontend/src/pages/ProjectDetailPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosInstance";
import Editor from "@monaco-editor/react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState({}); // { '/src/App.jsx': '...' }
  const [activeFile, setActiveFile] = useState(null);
  const [code, setCode] = useState("");
  const [consoleOut, setConsoleOut] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/projects/${projectId}`);
        setProject(data);
        const mapFiles = data.files || {};
        setFiles(mapFiles);
        const first = Object.keys(mapFiles)[0] || "/src/App.jsx";
        setActiveFile(first);
        setCode(mapFiles[first] || "");
      } catch (err) { console.error(err); }
    };
    fetch();
  }, [projectId]);

  // when active file change, update code shown
  useEffect(() => {
    if (activeFile) setCode(files[activeFile] || "");
  }, [activeFile, files]);

  const updateFileContent = (path, content) => {
    setFiles(prev => ({ ...prev, [path]: content }));
    // debounce auto-save (optional)
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveProjectDebounced(), 1000);
  };

  const saveProjectDebounced = async () => {
    try {
      await API.put(`/projects/${projectId}`, {
        name: project.name,
        description: project.description,
        files
      });
      // setProject res if needed
    } catch (err) { console.error("save err", err); }
  };

  const saveNow = async () => {
    try {
      await API.put(`/projects/${projectId}`, { name: project.name, description: project.description, files });
      alert("Saved");
    } catch (err) { console.error(err); alert("Save failed"); }
  };

  const addFile = () => {
    const name = prompt("New file path (e.g. /src/Hello.jsx):");
    if (!name) return;
    if (files[name]) return alert("File exists");
    const next = { ...files, [name]: "" };
    setFiles(next);
    setActiveFile(name);
  };

  const removeFile = (path) => {
    if (!confirm("Delete file?")) return;
    const next = { ...files };
    delete next[path];
    setFiles(next);
    const keys = Object.keys(next);
    setActiveFile(keys[0] || null);
  };

  const runConsole = () => {
    // Here we run user code only in sandboxed function; but since project may be React code,
    // we rely on Sandpack preview for actual runtime. This console is for quick JS exec.
    try {
      const logs = [];
      const consoleProxy = {
        log: (...args) => logs.push(args.join(" ")),
        error: (...args) => logs.push("ERROR: " + args.join(" ")),
      };
      // run current file code as function (dangerous for arbitrary code; used locally)
      const fn = new Function("console", code || "");
      fn(consoleProxy);
      setConsoleOut(logs.join("\n"));
    } catch (err) {
      setConsoleOut("ERROR: " + err.message);
    }
  };

  if (!project) return <div className="p-6">Loading project...</div>;

  // Prepare Sandpack files object
  // Sandpack expects keys like '/index.js' or '/src/App.js' with code strings.
  const sandpackFiles = {};
  for (const [k, v] of Object.entries(files)) sandpackFiles[k] = v;

  // Ensure there is an index.html root or entry
  if (!Object.keys(sandpackFiles).some(k => k.includes("index.html"))) {
    sandpackFiles["/index.html"] = sandpackFiles["/index.html"] || `<!doctype html><div id="root"></div>`;
  }

  return (
    <div className="flex h-screen">
      {/* Left: file explorer */}
      <aside className="w-64 border-r p-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{project.name}</h3>
          <div>
            <button onClick={addFile} className="text-sm bg-green-500 text-white px-2 py-1 rounded">+File</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {Object.keys(files).map(path => (
            <div key={path} className={`p-2 rounded cursor-pointer ${path===activeFile ? "bg-slate-200" : ""}`}>
              <div className="flex justify-between items-center">
                <div onClick={() => { setActiveFile(path); }}>
                  <small className="text-xs text-gray-500">{path}</small>
                  <div className="truncate">{(path.split("/").pop())}</div>
                </div>
                <button onClick={() => removeFile(path)} className="ml-2 text-red-500 text-xs">×</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={saveNow} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
          <button onClick={runConsole} className="bg-green-600 text-white px-3 py-1 rounded">Run</button>
        </div>
      </aside>

      {/* Middle: editor */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={activeFile?.endsWith(".jsx") ? "javascript" : "javascript"}
            value={files[activeFile] || ""}
            onChange={(val) => updateFileContent(activeFile, val)}
            options={{ automaticLayout: true, minimap: { enabled: false } }}
          />
        </div>

        <div className="h-36 border-t p-2 bg-black text-green-300 font-mono overflow-auto">
          <pre>{consoleOut || "Console output..."}</pre>
        </div>
      </main>

      {/* Right: live preview via Sandpack */}
      <div className="w-96 border-l">
        <Sandpack
          template="react"
          theme="dark"
          files={sandpackFiles}
          options={{ autorun: true, showConsole: false, showNavigator: false }}
          customSetup={{
            dependencies: { react: "latest", "react-dom": "latest" },
          }}
        />
      </div>
    </div>
  );
}

