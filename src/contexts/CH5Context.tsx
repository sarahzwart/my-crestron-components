import React, { createContext, useContext, useEffect, useState, } from 'react';
import CH5Service from '../services/ch5Service';

const CH5Context = createContext<CH5ContextType | undefined>(undefined);

interface CH5ContextType {
    isConnected: boolean;
    error: string | null;
    ch5Service: any;
}

interface CH5ProviderProps {
    children: React.ReactNode;
}

export function CH5Provider({ children }: CH5ProviderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        CH5Service.
            init().
            then(() => {
                setIsConnected(true);
                console.log('CH5 Service initialized successfully');
            }).catch((err) => {
                setError(`Failed to initialize CH5 Service: ${err.message}`);
                console.error('Error initializing CH5 Service:', err);
            });
        return () => {
            CH5Service.cleanup();
        };
    }, []);

    const contextValue: CH5ContextType = {
        isConnected,
        error,
        ch5Service: CH5Service
    };

    return (
        <CH5Context.Provider value={contextValue}>
            {children}
        </CH5Context.Provider>
    );
}

export function useCH5() : CH5ContextType {
    const context = useContext(CH5Context);
    if (context === undefined) {
        throw new Error('useCH5 must be used within a CH5Provider');
    }
    return context;
}
