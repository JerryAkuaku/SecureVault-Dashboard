import { findPath } from "../../utils/treeUtils";
import "./Breadcrumb.css";

function Breadcrumb({ data, selectedFile }) {
  // If no file selected, render nothing
  if (!selectedFile) return null;

  const path = findPath(data, selectedFile.id);

  // If path not found, render nothing
  if (!path) return null;

  return (
    <div className="breadcrumb">
      <span className="breadcrumb__item breadcrumb__item--root">🔒 Vault</span>

      {path.map((node, index) => (
        <span key={node.id} className="breadcrumb__segment">
          <span className="breadcrumb__separator">›</span>
          <span
            className={`breadcrumb__item ${index === path.length - 1 ? "breadcrumb__item--active" : ""}`}
          >
            {node.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
