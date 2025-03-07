// NavigationContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  hideTabBar: boolean;
  setHideTabBar: (hide: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

import { ReactNode } from 'react';

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [hideTabBar, setHideTabBar] = useState(false);

  return (
    <NavigationContext.Provider value={{ hideTabBar, setHideTabBar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {throw new Error('useNavigationContext must be used within a NavigationProvider');}
  return context;
};
