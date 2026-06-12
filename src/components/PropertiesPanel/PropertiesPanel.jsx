import "./PropertiesPanel.css";

function PropertiesPanel({ selectedFile }) {
  return (
    <aside className="properties-panel">
      <div className="properties-panel__header">
        <span>PROPERTIES</span>
      </div>

      {!selectedFile ? (
        <div className="properties-panel__empty">
          <span className="properties-panel__empty-icon">🔒</span>
          <p>Select a file to view its properties</p>
        </div>
      ) : (
        <div className="properties-panel__content">
          <div className="properties-panel__row">
            <span className="properties-panel__label">Name</span>
            <span className="properties-panel__value">{selectedFile.name}</span>
          </div>
          <div className="properties-panel__row">
            <span className="properties-panel__label">Type</span>
            <span className="properties-panel__value">{selectedFile.type}</span>
          </div>
          <div className="properties-panel__row">
            <span className="properties-panel__label">Size</span>
            <span className="properties-panel__value">{selectedFile.size}</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default PropertiesPanel;
