import { Sandpack } from "@codesandbox/sandpack-react";

export default function LivePreview({ files }) {
  return (
    <div className="w-1/2 bg-gray-100">
      <Sandpack
        template="react"
        files={files}
        options={{
          showTabs: true,
          showConsole: true,
          showLineNumbers: true,
          showNavigator: true,
          layout: "preview",
        }}
      />
    </div>
  );
}
