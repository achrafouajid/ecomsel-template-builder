import React, { createContext, useContext, ReactNode } from 'react';

interface StoreSettings {
    primaryColor: string;
    foregroundColor: string;
    pricesColor: string;
    floatingNavbar: boolean;
    name: string;
    logoUrl?: string;
    faviconUrl?: string;
}

interface StoreContextType {
    store: StoreSettings;
}

const defaultStore: StoreSettings = {
    primaryColor: '#000000',
    foregroundColor: '#ffffff',
    pricesColor: '#000000',
    floatingNavbar: false,
    name: 'Demo Store',
};

const StoreContext = createContext<StoreContextType>({ store: defaultStore });

export const StoreProvider = ({ children, store }: { children: ReactNode; store: StoreSettings }) => {
    return (
        <StoreContext.Provider value={{ store }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
