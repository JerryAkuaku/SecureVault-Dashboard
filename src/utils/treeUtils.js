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
