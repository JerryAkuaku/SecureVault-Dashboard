import TreeNode from "../TreeNode/TreeNode";
import "./FileExplorer.css";

function FileExplorer({ data, selectedFile, onFileSelect }) {
  return (
    <aside className="file-explorer">
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
          />
        ))}
      </div>
    </aside>
  );
}

export default FileExplorer;
