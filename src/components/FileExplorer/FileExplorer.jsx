import { useState, useCallback } from "react";
import TreeNode from "../TreeNode/TreeNode";
import SearchBar from "../SearchBar/SearchBar";
import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import { filterTree } from "../../utils/treeUtils";
import "./FileExplorer.css";

function FileExplorer({ data, selectedFile, onFileSelect }) {
  const [openFolders, setOpenFolders] = useState(new Set());
  const [query, setQuery] = useState("");

  // Compute filtered data derived from query — no extra state needed
  const filteredData = query ? filterTree(data, query) : data;

  const toggleFolder = useCallback((id) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // When search is active, force all folders in filtered results open
  const handleQueryChange = (value) => {
    setQuery(value);
    if (value.trim()) {
      const getAllFolderIds = (nodes) => {
        const ids = new Set();
        nodes.forEach((node) => {
          if (node.type === "folder") {
            ids.add(node.id);
            if (node.children?.length) {
              getAllFolderIds(node.children).forEach((id) => ids.add(id));
            }
          }
        });
        return ids;
      };
      setOpenFolders(getAllFolderIds(filterTree(data, value)));
    }
  };

  const { focusedId, setFocusedId, handleKeyDown } = useKeyboardNavigation(
    filteredData,
    openFolders,
    onFileSelect,
    toggleFolder,
  );

  return (
    <aside className="file-explorer" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="file-explorer__header">
        <span>EXPLORER</span>
      </div>

      <SearchBar query={query} onQueryChange={handleQueryChange} />

      <div className="file-explorer__tree">
        {filteredData.length > 0 ? (
          filteredData.map((node) => (
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
          ))
        ) : (
          <div className="file-explorer__no-results">
            No results for "{query}"
          </div>
        )}
      </div>
    </aside>
  );
}

export default FileExplorer;
