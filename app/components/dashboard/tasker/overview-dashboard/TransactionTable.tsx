'use client';

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface Transaction {
  id: string;
  date: string;
  client: string;
  service: string;
  category: string;
  amount: number;
  fee: number;
  net: number;
  status: "completed" | "pending" | "processing" | "failed";
  region: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const statusConfig = {
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning" },
  processing: { label: "Processing", className: "bg-secondary/10 text-secondary" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
};

type SortKey = keyof Transaction;

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const categories = ["all", ...Array.from(new Set(transactions.map((t) => t.category)))];

  const filtered = transactions
    .filter((t) => {
      const matchSearch =
        t.client.toLowerCase().includes(search.toLowerCase()) ||
        t.service.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchCat = categoryFilter === "all" || t.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    })
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <Icon
      name={sortKey === col ? (sortDir === "asc" ? "ChevronUpIcon" : "ChevronDownIcon") : "ChevronUpDownIcon"}
      size={14}
      variant="outline"
      className="ml-1 inline-block"
    />
  );

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-semibold text-text-primary">Transaction History</h3>
            <p className="text-xs text-text-secondary mt-0.5">{filtered.length} transactions found</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={14} variant="outline" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-8 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-ring w-44"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {[
                { key: "id" as SortKey, label: "ID" },
                { key: "date" as SortKey, label: "Date" },
                { key: "client" as SortKey, label: "Client" },
                { key: "service" as SortKey, label: "Service" },
                { key: "category" as SortKey, label: "Category" },
                { key: "amount" as SortKey, label: "Amount" },
                { key: "fee" as SortKey, label: "Fee" },
                { key: "net" as SortKey, label: "Net" },
                { key: "status" as SortKey, label: "Status" },
                { key: "region" as SortKey, label: "Region" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary select-none whitespace-nowrap"
                >
                  {label}<SortIcon col={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-text-secondary">
                  <Icon name="InboxIcon" size={32} variant="outline" className="mx-auto mb-2 text-muted-foreground" />
                  <p>No transactions found</p>
                </td>
              </tr>
            ) : (
              paginated.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{t.id}</td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{t.date}</td>
                  <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap">{t.client}</td>
                  <td className="px-4 py-3 text-text-secondary max-w-[160px] truncate">{t.service}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">{t.category}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-text-primary">${t.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-destructive">-${t.fee.toFixed(2)}</td>
                  <td className="px-4 py-3 font-bold text-success">${t.net.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusConfig[t.status].className}`}>
                      {statusConfig[t.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{t.region}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-text-secondary hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeftIcon" size={14} variant="outline" />
            </button>
            {(() => {
              const show = 5;
              const start = Math.max(1, Math.min(page - Math.floor(show / 2), totalPages - show + 1));
              const end = Math.min(totalPages, start + show - 1);
              return Array.from({ length: end - start + 1 }, (_, i) => {
                const p = start + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium border transition-colors ${page === p ? "bg-primary text-primary-foreground border-primary" : "border-border text-text-secondary hover:bg-muted"}`}
                  >
                    {p}
                  </button>
                );
              });
            })()}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-text-secondary hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRightIcon" size={14} variant="outline" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

