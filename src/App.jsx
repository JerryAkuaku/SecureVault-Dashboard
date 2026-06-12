import { useState } from "react";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import treeData from "./data/data.json";
import "./index.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-logo">🔒 SecureVault</span>
      </header>

      <FileExplorer
        data={treeData}
        selectedFile={selectedFile}
        onFileSelect={setSelectedFile}
      />

      <PropertiesPanel selectedFile={selectedFile} />
    </div>
  );
}

export default App;
