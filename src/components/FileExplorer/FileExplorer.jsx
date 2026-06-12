import { useState, useCallback } from "react";
import TreeNode from "../TreeNode/TreeNode";
import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import "./FileExplorer.css";

function FileExplorer({ data, selectedFile, onFileSelect }) {
  // Set of folder ids that are currently open
  const [openFolders, setOpenFolders] = useState(new Set());

  // Toggles a folder open or closed
  const toggleFolder = useCallback((id) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const { focusedId, setFocusedId, handleKeyDown } = useKeyboardNavigation(
    data,
    openFolders,
    onFileSelect,
    toggleFolder,
  );

  return (
    <aside className="file-explorer" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="file-explorer__header">
        <span>EXPLORER</span>
      </div>
      <div className="file-explorer__tree">
        {data.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
            openFolders={openFolders}
            toggleFolder={toggleFolder}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
            depth={0}
          />
        ))}
      </div>
    </aside>
  );
}

export default FileExplorer;
