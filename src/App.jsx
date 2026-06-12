import { useState } from "react";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
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

      <div className="app-right-panel">
        <Breadcrumb data={treeData} selectedFile={selectedFile} />
        <PropertiesPanel selectedFile={selectedFile} />
      </div>
    </div>
  );
}

export default App;
