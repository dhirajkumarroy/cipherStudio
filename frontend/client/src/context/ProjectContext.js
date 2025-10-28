import { createContext, useContext } from 'react';

// 1. Create the context
export const ProjectContext = createContext(null);

// 2. Create a custom hook for easy access
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
