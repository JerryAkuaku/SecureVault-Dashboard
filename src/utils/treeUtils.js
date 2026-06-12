export function findPath(nodes, targetId, path = []) {
  for (const node of nodes) {
    const currentPath = [...path, node];

    if (node.id === targetId) {
      return currentPath;
    }

    if (node.children?.length) {
      const found = findPath(node.children, targetId, currentPath);
      if (found) return found;
    }
  }

  return null;
}

export function filterTree(nodes, query) {
  if (!query.trim()) return nodes;

  return nodes.reduce((acc, node) => {
    if (node.type === "file") {
      // Include file if its name matches
      if (node.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(node);
      }
    } else {
      // For folders, check if any children match
      const filteredChildren = filterTree(node.children || [], query);
      if (filteredChildren.length > 0) {
        // Include folder but only with matching children
        acc.push({ ...node, children: filteredChildren });
      }
    }
    return acc;
  }, []);
}
