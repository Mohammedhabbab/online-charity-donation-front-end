import { createContext, useContext, useState, useEffect } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [selectedServiceS, setSelectedServiceS] = useState(() => {
        const storedSelectedServiceS = localStorage.getItem('selectedServiceS');
        return storedSelectedServiceS ? JSON.parse(storedSelectedServiceS) : null;
    });

    const setServiceS = (service) => {
        setSelectedServiceS(service);

        localStorage.setItem('selectedServiceS', JSON.stringify(service));
    };

    return (
        <ServiceContext.Provider value={{ selectedServiceS, setServiceS }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useService = (initialService = null) => {
    const context = useContext(ServiceContext);

    if (!context) {
        throw new Error('useService must be used within a ServiceProvider');
    }

    const { selectedServiceS, setServiceS } = context;

    useEffect(() => {
        if (initialService !== null) {
            setServiceS(initialService);
        }
    }, [initialService, setServiceS]);

    return { selectedServiceS, setServiceS };
};
