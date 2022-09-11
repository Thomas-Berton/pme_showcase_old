import React, { useMemo,useContext } from 'react'
export const ModalContext = React.createContext();

export const useModal = () => {
    return useContext(ModalContext);
}

export const ModalContextProvider = ({ openModal, children }) => {
    const context = useMemo(() => {
        return {
            openModal
        };
    }, [openModal]);

    return (
        <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
    );
};