"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/useUiStore";
import LoginModalContent from "@/app/components/LoginModalContent";

const MODAL_COMPONENTS = {
    login: LoginModalContent,
};

export default function Modal() {
    const { isModalOpen, modalType, modalProps, modalOptions, closeModal } =
        useUiStore();

    const ModalContent = modalType ? MODAL_COMPONENTS[modalType] : null;
    const sizeClass =
        modalOptions.size === "sm"
            ? "max-w-md"
            : modalOptions.size === "lg"
              ? "max-w-2xl"
              : "max-w-lg";

    useEffect(() => {
        if (!isModalOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && modalOptions.escapeClosable !== false) {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal, isModalOpen, modalOptions.escapeClosable]);

    if (!isModalOpen || !ModalContent) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 backdrop-blur-[2px]"
            onClick={() => {
                if (modalOptions.backdropClosable !== false) {
                    closeModal();
                }
            }}
        >
            <div
                className={`relative w-full ${sizeClass} rounded-[28px] bg-white p-6 shadow-2xl md:p-8`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="absolute top-5 right-5 text-sm font-semibold text-gray-400 transition-colors hover:text-black"
                    onClick={closeModal}
                >
                    닫기
                </button>

                <div className="pr-10 text-sm leading-6 text-black">
                    <ModalContent {...modalProps} />
                </div>
            </div>
        </div>
    );
}
