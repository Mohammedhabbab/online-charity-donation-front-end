import { createContext, useContext, useState, useEffect } from 'react';

const BeneficiarContext = createContext();

export const BeneficiarProvider = ({ children }) => {
    const [selectedBene, setSelectedBene] = useState(() => {
        const storedSelectedBene = localStorage.getItem('selectedBene');
        return storedSelectedBene ? JSON.parse(storedSelectedBene) : null;
    });

    const setBeneficiar = (beneficiar) => {
        setSelectedBene(beneficiar);

        localStorage.setItem('selectedBene', JSON.stringify(beneficiar));
    };

    return (
        <BeneficiarContext.Provider value={{ selectedBene, setBeneficiar }}>
            {children}
        </BeneficiarContext.Provider>
    );
};

export const useBene = (initialBene = null) => {
    const context = useContext(BeneficiarContext);

    if (!context) {
        throw new Error('useService must be used within a ServiceProvider');
    }

    const { selectedBene, setBeneficiar } = context;

    useEffect(() => {
        if (initialBene !== null) {
            setBeneficiar(initialBene);
        }
    }, [initialBene, setBeneficiar]);

    return { selectedBene, setBeneficiar };
};
