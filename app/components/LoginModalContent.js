"use client";

import { useState } from "react";
import { useUiStore } from "@/store/useUiStore";
import { useUserStore } from "@/store/useUserStore";
import { login } from "@/lib/data/users";

export default function LoginModalContent({
    title = "로그인",
}) {
    const closeModal = useUiStore((state) => state.closeModal);
    const { setUser } = useUserStore();
    const [form, setForm] = useState({
        email: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login(form.email);

            if (response) {
                setUser({
                    id: response.id,
                    email: response.email,
                    name: response.name
                })
                alert("로그인 완료");
            }
        } catch (e) {
            alert(e);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.24em] text-gray-400">
                    MEMBER ACCESS
                </p>
                <h2 className="text-2xl font-black text-black">{title}</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                        Email
                    </span>
                    <input
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-black outline-none transition focus:border-black"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
