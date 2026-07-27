"use client";

import { useState } from "react";
import { CreditCard, Lock, ShieldCheck, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PaymentModal({ isOpen, onClose, userEmail, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.cardholderName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      toast.error("Please fill in all payment fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
      "http://localhost:5500/api/user-premium",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      }
    );

      const data = await res.json();
      
      if(!res.ok){
        toast.error(data.message)
      }

      if (data.success) {
        toast.success(data.message || "Upgraded to Premium successfully!");
        onSuccess(data.user);
        onClose();
      } 
    } catch (err) {
      toast.error("Something went wrong with the transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Demo Checkout — $5.00</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handlePayment}>
          <div className="p-5 space-y-4">
            <div className="bg-indigo-950/40 border border-indigo-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-300">
              <span>Plan: Lifetime Premium Access</span>
              <span className="font-bold text-white">$5.00</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardholderName"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4242 •••• •••• 4242"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-800 bg-slate-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 rounded-xl disabled:opacity-50 transition shadow-lg shadow-indigo-600/20"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Pay $5.00 Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}