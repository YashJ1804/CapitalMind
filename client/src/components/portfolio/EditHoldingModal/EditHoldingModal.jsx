import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";

export default function EditHoldingModal({
    holding,
    onClose,
    onSuccess
}) {

    const [form, setForm] = useState({
        quantity: holding.quantity,
        averagePrice: holding.averagePrice,
        purchaseDate: holding.purchaseDate
            ? new Date(holding.purchaseDate)
                .toISOString()
                .split("T")[0]
            : "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.quantity || !form.averagePrice) {

            toast.error(
                "Quantity and average price are required."
            );

            return;
        }

        try {

            setLoading(true);

            await api.put(
                `/portfolio/${holding._id}`,
                {
                    quantity: Number(form.quantity),
                    averagePrice: Number(form.averagePrice),
                    purchaseDate: form.purchaseDate || undefined,
                }
            );

            toast.success(
                "Holding updated successfully."
            );

            onSuccess();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update holding."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Edit Holding
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {holding.companyName} ({holding.symbol})
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={form.quantity}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Average Buy Price
                        </label>

                        <input
                            type="number"
                            name="averagePrice"
                            min="0"
                            step="0.01"
                            value={form.averagePrice}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Purchase Date
                        </label>

                        <input
                            type="date"
                            name="purchaseDate"
                            value={form.purchaseDate}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                        />

                    </div>

                    <div className="flex gap-4 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}