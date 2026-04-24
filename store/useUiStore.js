import { create } from "zustand";

export const useUiStore = create((set) => ({
    isModalOpen: false,
    modalType: null,
    modalProps: {},
    modalOptions: {},

    openModal: (modalType, modalProps = {}, modalOptions = {}) =>
        set({
            isModalOpen: true,
            modalType,
            modalProps,
            modalOptions,
        }),
    closeModal: () =>
        set({
            isModalOpen: false,
            modalType: null,
            modalProps: {},
            modalOptions: {},
        }),
}));
