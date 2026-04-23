'use client';

import { useState, useMemo } from "react";
import { Dispute } from "@/app/types/types";
import { mockDisputes } from "../data";

import DisputeTable from "./DisputeTable";
import DisputeFilters from "./DisputeFilters";
import DisputeStats from "./DisputeStats";
import DetailModal from "./DetailModal";
import ResolveModal from "./ResolveModal";

export default function DisputeResolutionClient() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [search, setSearch] = useState("");
  const [detailDispute, setDetailDispute] = useState<Dispute | null>(null);
  const [resolveDispute, setResolveDispute] = useState<Dispute | null>(null);

  // 🔍 Filter logic
  const filtered = useMemo(() => {
    return disputes.filter((d) => {
      const q = search.toLowerCase();
      return (
        d.id.toLowerCase().includes(q) ||
        d.bookingId.toLowerCase().includes(q) ||
        d.client.name.toLowerCase().includes(q) ||
        d.tasker.name.toLowerCase().includes(q)
      );
    });
  }, [disputes, search]);

  // 📊 Stats
  const stats = useMemo(() => ({
    total: disputes.length,
    open: disputes.filter((d) => d.status === "open").length,
    investigating: disputes.filter((d) => d.status === "investigating").length,
    escalated: disputes.filter((d) => d.status === "escalated").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
  }), [disputes]);

  // ⚙️ Actions
  const handleView = (dispute: Dispute) => {
    setDetailDispute(dispute);
  };

  const handleResolve = (dispute: Dispute) => {
    setResolveDispute(dispute);
  };

  const confirmResolve = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "resolved" } : d))
    );
    setResolveDispute(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dispute Resolution</h1>
        <p className="text-sm text-muted-foreground">
          Manage and resolve disputes between clients and taskers
        </p>
      </div>

      {/* Stats */}
      <DisputeStats stats={stats} />

      {/* Filters */}
      <DisputeFilters search={search} setSearch={setSearch} />

      {/* Table */}
      <DisputeTable
        data={filtered}
        onView={handleView}
        onResolve={handleResolve}
      />

      {/* Modals */}
      <DetailModal
        dispute={detailDispute}
        onClose={() => setDetailDispute(null)}
      />
      <ResolveModal
        dispute={resolveDispute}
        onClose={() => setResolveDispute(null)}
        onConfirm={confirmResolve}
      />
    </div>
  );
}