import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ activeFile, files, setFiles }) {
  const handleCodeChange = (value) => {
    setFiles((prev) => ({
      ...prev,
      [activeFile]: { ...prev[activeFile], code: value },
    }));
  };

  return (
    <div className="w-1/2 border-r border-gray-700 bg-[#1e1e1e]">
      <Editor
        height="85vh"
        language="javascript"
        theme="vs-dark"
        value={files[activeFile]?.code || ""}
        onChange={handleCodeChange}
      />
    </div>
  );
}
