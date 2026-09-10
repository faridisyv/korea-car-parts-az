"use client";

import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Package } from "lucide-react";
import { useCart } from "./CartContext";
import { useCurrency } from "@/components/layout/CurrencyToggle";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    const lines = items.map(
      (i) => `• ${i.name} (${i.part.partNumber}) x${i.quantity} — $${(i.part.priceUSD * i.quantity).toFixed(2)}`
    );
    const msg = [
      "🛒 *New Order from Korea Parts AZ*",
      "",
      ...lines,
      "",
      `*Total: $${totalPrice.toFixed(2)}*`,
      "",
      "Please confirm availability and shipping details.",
    ].join("\n");
    return `https://wa.me/821048695673?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-800">My Cart</span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">Add parts from the catalog to get started</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.part.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 fade-in-up"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                    {item.name}
                  </p>
                  <p className="text-[11px] font-mono text-blue-600 mt-0.5">{item.part.partNumber}</p>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    {formatPrice(item.part.priceUSD * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeItem(item.part.id)}
                    className="p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.part.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-300 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-slate-700 w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.part.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-300 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total ({totalItems} items)</span>
              <span className="text-lg font-black text-slate-800">{formatPrice(totalPrice)}</span>
            </div>

            <a
              href={buildWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20"
              onClick={closeCart}
            >
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </a>

            <button
              onClick={clearCart}
              className="w-full py-2 text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
