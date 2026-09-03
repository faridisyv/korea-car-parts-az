"use client";

import { useState } from "react";
import {
  MessageCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  Trash2,
  Edit,
  DollarSign,
  Car,
  Clock,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface InquiryItem {
  id: string;
  vinCode: string;
  partNumber?: string | null;
  partName?: string | null;
  carModel?: string | null;
  carYear?: number | null;
  quantity: number;
  details?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  urgency: string;
  status: string;
  quotePriceUSD?: number | null;
  adminNotes?: string | null;
  createdAt: string;
}

interface RequestsTableProps {
  initialRequests: InquiryItem[];
  onRefresh?: () => void;
}

const STATUSES = [
  "all",
  "new",
  "in_review",
  "quoted",
  "ordered",
  "shipped",
  "fulfilled",
  "closed",
];

export default function RequestsTable({
  initialRequests,
  onRefresh,
}: RequestsTableProps) {
  const [requests, setRequests] = useState<InquiryItem[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<InquiryItem | null>(null);
  const [quoteInput, setQuoteInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCopyVIN = (vin: string, id: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleSaveQuoteAndNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/requests/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quotePriceUSD: quoteInput ? parseFloat(quoteInput) : null,
          adminNotes: notesInput,
          status: editingItem.status === "new" ? "quoted" : editingItem.status,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setRequests((prev) =>
          prev.map((item) => (item.id === editingItem.id ? updated : item))
        );
        setEditingItem(null);
      }
    } catch (e) {
      console.error("Failed to save quote:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete inquiry:", e);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (selectedStatus !== "all" && r.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.vinCode.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        (r.partName?.toLowerCase().includes(q) ?? false) ||
        (r.partNumber && r.partNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search VIN, Name, Phone, Part..."
            className="pl-9 text-xs h-9 bg-black/40"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? "bg-amber-500 text-black shadow-sm"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {st.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 border-b border-white/10 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Customer & Phone</th>
                <th className="p-4">VIN & Vehicle</th>
                <th className="p-4">Requested Part</th>
                <th className="p-4">Status</th>
                <th className="p-4">Quote ($)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No customer requests found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const cleanPhone = req.phone.replace(/[^0-9]/g, "");
                  const waText = encodeURIComponent(
                    `Salam ${req.name}! Korea Car Parts olaraq ${req.partName ?? "hissə"} (${req.vinCode}) sorğunuz üzrə əlaqə saxlayırıq.`
                  );
                  const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">
                          {req.name}
                        </div>
                        <div className="font-mono text-zinc-400 mt-0.5">
                          {req.phone}
                        </div>
                        {req.email && (
                          <div className="text-[11px] text-zinc-500">
                            {req.email}
                          </div>
                        )}
                        <span className="text-[10px] text-zinc-400 block mt-1">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* VIN & Vehicle */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyVIN(req.vinCode, req.id)}
                            className="inline-flex items-center gap-1 font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50"
                            title="Copy VIN"
                          >
                            <span>{req.vinCode}</span>
                            {copiedId === req.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-zinc-400" />
                            )}
                          </button>
                        </div>
                        <div className="text-zinc-300 font-semibold text-xs mt-1">
                          {req.carModel ?? "—"} {req.carYear ? `(${req.carYear})` : ""}
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 mt-1 inline-block">
                          {req.urgency === "express_air"
                            ? "✈ Express Air"
                            : "📦 Standard"}
                        </span>
                      </td>

                      {/* Part Name & OEM */}
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-white">
                          {req.partName ?? "—"} (Qty: {req.quantity})
                        </div>
                        {req.partNumber && (
                          <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                            OEM: {req.partNumber}
                          </div>
                        )}
                        {req.details && (
                          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                            {req.details}
                          </p>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={req.status}
                          onChange={(e) =>
                            handleStatusChange(req.id, e.target.value)
                          }
                          className="text-xs bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 font-semibold"
                        >
                          <option value="new">NEW</option>
                          <option value="in_review">IN REVIEW</option>
                          <option value="quoted">QUOTED</option>
                          <option value="ordered">ORDERED</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="fulfilled">FULFILLED</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>

                      {/* Quote Price */}
                      <td className="p-4">
                        {req.quotePriceUSD ? (
                          <div className="font-black text-amber-400 text-sm">
                            ${req.quotePriceUSD}
                            <span className="block text-[10px] text-zinc-400 font-normal">
                              ≈ {(req.quotePriceUSD * 1.7).toFixed(0)} ₼
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-500 text-xs italic">
                            Unquoted
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct WhatsApp chat opener */}
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Quote / Edit Notes */}
                          <button
                            onClick={() => {
                              setEditingItem(req);
                              setQuoteInput(
                                req.quotePriceUSD ? String(req.quotePriceUSD) : ""
                              );
                              setNotesInput(req.adminNotes || "");
                            }}
                            className="p-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black border border-amber-500/30 transition-all"
                            title="Set Quote & Internal Notes"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(req.id)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote & Notes Modal Dialog */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl glass-modal p-6 space-y-4 border border-amber-500/40 animate-in zoom-in-95">
            <h3 className="text-lg font-black text-white">
              Quote & Notes for Inquiry #{editingItem.id.slice(-6)}
            </h3>
            <div className="text-xs text-zinc-300">
              Customer: <strong>{editingItem.name}</strong> ({editingItem.phone})
            </div>

            <form onSubmit={handleSaveQuoteAndNotes} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  Quote Price (USD)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  placeholder="e.g. 150"
                  className="bg-black/40 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Admin Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Checked Mobis factory in Incheon. Stock ready for cargo shipment."
                  className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Quote & Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
