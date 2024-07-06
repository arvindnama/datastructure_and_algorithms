import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const bootstrapReactApp = (node: ReactNode, containerId = 'root') => {
    const container = document.getElementById(containerId);
    const root = createRoot(container);
    root.render(node);
};
