import { createRoot } from 'react-dom/client';

export const bootstrapReactApp = (node, containerId = 'root') => {
    const container = document.getElementById(containerId);
    const root = createRoot(container);
    root.render(node);
};
