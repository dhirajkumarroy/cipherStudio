export default function FileExplorer({ files, activeFile, setActiveFile, setFiles }) {
  const handleAddFile = () => {
    const name = prompt("Enter file name (e.g. /NewFile.jsx):");
    if (!name || files[name]) return alert("Invalid or duplicate file name!");
    setFiles((prev) => ({ ...prev, [name]: { code: "// New file" } }));
  };

  const handleDeleteFile = (name) => {
    if (Object.keys(files).length <= 1) return alert("Cannot delete the last file!");
    const updated = { ...files };
    delete updated[name];
    setFiles(updated);
    if (name === activeFile) setActiveFile(Object.keys(updated)[0]);
  };

  return (
    <div className="w-1/4 bg-gray-900 text-white p-3 border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-3">📁 Files</h2>
      <ul className="space-y-1">
        {Object.keys(files).map((file) => (
          <li
            key={file}
            onClick={() => setActiveFile(file)}
            className={`cursor-pointer px-2 py-1 rounded ${
              file === activeFile ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {file}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFile(file);
              }}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddFile}
        className="mt-3 bg-green-600 px-2 py-1 rounded text-sm hover:bg-green-700"
      >
        ➕ Add File
      </button>
    </div>
  );
}
