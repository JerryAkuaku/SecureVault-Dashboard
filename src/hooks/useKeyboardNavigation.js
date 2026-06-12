import { useState, useCallback } from "react";

function getVisibleNodes(nodes, openFolders) {
  const result = [];

  function traverse(nodeList) {
    nodeList.forEach((node) => {
      result.push(node);
      if (
        node.type === "folder" &&
        openFolders.has(node.id) &&
        node.children?.length
      ) {
        traverse(node.children);
      }
    });
  }

  traverse(nodes);
  return result;
}

function useKeyboardNavigation(data, openFolders, onFileSelect, toggleFolder) {
  const [focusedId, setFocusedId] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      const visibleNodes = getVisibleNodes(data, openFolders);
      const currentIndex = visibleNodes.findIndex((n) => n.id === focusedId);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex =
            currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : 0;
          setFocusedId(visibleNodes[nextIndex].id);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : visibleNodes.length - 1;
          setFocusedId(visibleNodes[prevIndex].id);
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const current = visibleNodes[currentIndex];
          if (current?.type === "folder") toggleFolder(current.id);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const current = visibleNodes[currentIndex];
          if (current?.type === "folder") toggleFolder(current.id);
          break;
        }
        case "Enter": {
          e.preventDefault();
          const current = visibleNodes[currentIndex];
          if (current?.type === "file") onFileSelect(current);
          break;
        }
        default:
          break;
      }
    },
    [data, openFolders, focusedId, onFileSelect, toggleFolder],
  );

  return { focusedId, setFocusedId, handleKeyDown };
}

export default useKeyboardNavigation;
