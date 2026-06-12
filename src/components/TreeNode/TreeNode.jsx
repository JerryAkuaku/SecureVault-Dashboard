import "./TreeNode.css";

function TreeNode({
  node,
  selectedFile,
  onFileSelect,
  openFolders,
  toggleFolder,
  focusedId,
  setFocusedId,
  depth = 0,
}) {
  const isSelected = selectedFile?.id === node.id;
  const isFocused = focusedId === node.id;
  const isFolder = node.type === "folder";
  const isOpen = openFolders.has(node.id);
  const hasChildren = isFolder && node.children?.length > 0;

  const handleClick = () => {
    if (isFolder) {
      toggleFolder(node.id);
    } else {
      onFileSelect(node);
    }
    setFocusedId(node.id);
  };

  return (
    <div className="tree-node">
      <div
        className={`
          tree-node__row
          ${isSelected ? "tree-node__row--selected" : ""}
          ${isFocused ? "tree-node__row--focused" : ""}
          ${isFolder ? "tree-node__row--folder" : ""}
        `}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={handleClick}
        tabIndex={0}
        onFocus={() => setFocusedId(node.id)}
      >
        {isFolder && (
          <span
            className={`tree-node__arrow ${isOpen ? "tree-node__arrow--open" : ""}`}
          >
            ▶
          </span>
        )}

        <span className="tree-node__icon">
          {isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(node.name)}
        </span>

        <span className="tree-node__name">{node.name}</span>

        {!isFolder && <span className="tree-node__size">{node.size}</span>}
      </div>

      {isFolder && isOpen && (
        <div className="tree-node__children">
          {hasChildren ? (
            node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
                focusedId={focusedId}
                setFocusedId={setFocusedId}
                depth={depth + 1}
              />
            ))
          ) : (
            <div
              className="tree-node__empty"
              style={{ paddingLeft: `${12 + (depth + 1) * 16}px` }}
            >
              Empty folder
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getFileIcon(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  const icons = {
    pdf: "📄",
    docx: "📝",
    xlsx: "📊",
    png: "🖼️",
    jpg: "🖼️",
    txt: "📃",
    yaml: "⚙️",
    svg: "🎨",
    ttf: "🔤",
  };
  return icons[ext] || "📄";
}

export default TreeNode;
