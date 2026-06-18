import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@/components/ui/tabs";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { ColumnFilter } from "@/components/ui/column-filter";
import { AccountStatusBadge } from "@/components/shared/badges";
import { useStore } from "@/store/AppStore";
import { formatDate } from "@/lib/format";
import { ROLE_LABEL } from "@/lib/roles";
import type { User, UserRole } from "@/data/types";

const PAGE_SIZE = 10;

// "all" is the reset value — ColumnFilter highlights its funnel whenever value !== "all".
const VERIFICATION_FILTERS = [
  { value: "all", label: "All" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
];
const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "warned", label: "Warned" },
  { value: "suspended", label: "Suspended" },
  { value: "banned", label: "Banned" },
];
// Category filter — only offered in the "All" tab (the category tabs already scope to one category).
const CATEGORY_FILTERS = [
  { value: "all", label: "All" },
  { value: "hr-practitioner", label: "HR Practitioner" },
  { value: "hr-leader", label: "HR Leader" },
  { value: "friends-of-hr", label: "Friends of HR" },
  { value: "vendor", label: "Vendor" },
];
// Name + Joined are sorts, not value filters. They share one sort state, so picking a
// direction on one column clears the other — only one column sorts at a time.
const NAME_SORT = [
  { value: "all", label: "Default order" },
  { value: "asc", label: "A → Z" },
  { value: "desc", label: "Z → A" },
];
const JOINED_SORT = [
  { value: "all", label: "Default order" },
  { value: "desc", label: "Newest first" },
  { value: "asc", label: "Oldest first" },
];

type SortDir = "asc" | "desc";
// "all" lists every category together; the four role values each list a single category (the tab
// value IS the role it lists).
type Tab = "all" | Exclude<UserRole, "admin">;
const CATEGORY_TABS: Exclude<UserRole, "admin">[] = [
  "hr-practitioner",
  "hr-leader",
  "friends-of-hr",
  "vendor",
];

// Members are listed by their own name; vendor accounts by their company name.
function displayName(u: User) {
  return u.role === "vendor" ? u.vendorProfile?.companyName ?? u.name : u.name;
}

export function UsersPage() {
  const { users } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortCol, setSortCol] = useState<"name" | "joined" | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(0);

  // Admins are never listed here — User Management covers the member-facing categories only.
  const listable = useMemo(() => users.filter((u) => u.role !== "admin"), [users]);
  const countFor = (r: Tab) =>
    r === "all" ? listable.length : listable.filter((u) => u.role === r).length;

  // Any filter/sort change starts the result set over from the first page.
  function resetPage() {
    setPage(0);
  }

  function applySort(col: "name" | "joined", v: string) {
    if (v === "all") setSortCol(null);
    else {
      setSortCol(col);
      setSortDir(v as SortDir);
    }
    resetPage();
  }

  const filtersActive =
    q.trim() !== "" ||
    verificationFilter !== "all" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    sortCol !== null;

  // Escape hatch back to the full list (within the current tab) — also reachable from the empty
  // state, so a filter that matches nothing is never a dead end.
  function clearFilters() {
    setQ("");
    setVerificationFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortCol(null);
    setSortDir("asc");
    setPage(0);
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rows = listable.filter((u) => {
      if (tab !== "all" && u.role !== tab) return false;
      // Category filter applies only in the "All" tab; the category tabs already scope to one role.
      if (tab === "all" && categoryFilter !== "all" && u.role !== categoryFilter) return false;
      const matchesText =
        !needle ||
        displayName(u).toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle);
      return (
        matchesText &&
        (verificationFilter === "all" || u.verification === verificationFilter) &&
        (statusFilter === "all" || u.accountStatus === statusFilter)
      );
    });
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortCol === "name") {
      rows.sort((a, b) => displayName(a).localeCompare(displayName(b)) * dir);
    } else if (sortCol === "joined") {
      rows.sort((a, b) => (new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()) * dir);
    }
    return rows;
  }, [listable, tab, q, verificationFilter, statusFilter, categoryFilter, sortCol, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const isVendors = tab === "vendor";
  const nameLabel = isVendors ? "Company" : "Name";
  const noun = isVendors ? "vendors" : "accounts";
  // The Category column only carries information in the combined "All" view — within a single-category
  // tab every row is the same category, so it's just noise there.
  const showCategory = tab === "all";
  const colCount = showCategory ? 6 : 5;

  function inspect(id: string) {
    navigate(`/users/${id}`);
  }

  return (
    <div>
      <PageHeader
        title="User Accounts"
        description="Accounts are grouped by category — HR Practitioners, HR Leaders, Friends of HR, and Vendors. Open an account to see its full profile and act: warn → suspend → ban, with lift as the reverse gear."
      />

      <Tabs
        className="mb-4"
        value={tab}
        onChange={(v) => { setTab(v as Tab); setCategoryFilter("all"); resetPage(); }}
        items={[
          { value: "all", label: "All", count: countFor("all") },
          ...CATEGORY_TABS.map((t) => ({ value: t, label: ROLE_LABEL[t], count: countFor(t) })),
        ]}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => { setQ(e.target.value); resetPage(); }}
            placeholder={isVendors ? "Search company or email…" : "Search name or email…"}
            className="pl-8"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          {filtersActive && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-muted-foreground">
              <X className="size-3.5" /> Clear filters
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {filtered.length} {noun}
          </span>
        </div>
      </div>

      {/* The table — and its filter header — stays mounted even with no matches, so a
          filter is always adjustable from the column it lives in (never a dead end). */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <THead>
            <TR>
              <TH>
                <ColumnFilter
                  label={nameLabel}
                  value={sortCol === "name" ? sortDir : "all"}
                  onChange={(v) => applySort("name", v)}
                  options={NAME_SORT}
                />
              </TH>
              {showCategory && (
                <TH>
                  <ColumnFilter
                    label="Category"
                    value={categoryFilter}
                    onChange={(v) => { setCategoryFilter(v); resetPage(); }}
                    options={CATEGORY_FILTERS}
                  />
                </TH>
              )}
              <TH>Email</TH>
              <TH>
                <ColumnFilter label="Verification" value={verificationFilter} onChange={(v) => { setVerificationFilter(v); resetPage(); }} options={VERIFICATION_FILTERS} />
              </TH>
              <TH>
                <ColumnFilter label="Status" value={statusFilter} onChange={(v) => { setStatusFilter(v); resetPage(); }} options={STATUS_FILTERS} />
              </TH>
              <TH>
                <ColumnFilter
                  label="Joined"
                  value={sortCol === "joined" ? sortDir : "all"}
                  onChange={(v) => applySort("joined", v)}
                  options={JOINED_SORT}
                />
              </TH>
            </TR>
          </THead>
          <TBody>
            {pageRows.length === 0 ? (
              <TR className="hover:bg-transparent">
                <TD colSpan={colCount} className="p-0">
                  <EmptyState
                    icon={<Search className="size-8" />}
                    title={`No matching ${noun}`}
                    description="No accounts match the current filters. Adjust a column filter above, or clear all filters to see every account."
                    className="border-0"
                    action={
                      filtersActive ? (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          <X className="size-3.5" /> Clear filters
                        </Button>
                      ) : undefined
                    }
                  />
                </TD>
              </TR>
            ) : (
              pageRows.map((u) => (
                <TR key={u.id} className="cursor-pointer" onClick={() => inspect(u.id)}>
                  <TD className="font-medium">{displayName(u)}</TD>
                  {showCategory && (
                    <TD>
                      <Badge variant="muted">{ROLE_LABEL[u.role]}</Badge>
                    </TD>
                  )}
                  <TD className="text-muted-foreground">{u.email}</TD>
                  <TD>
                    <Badge variant={u.verification === "verified" ? "success" : "muted"} className="capitalize">
                      {u.verification}
                    </Badge>
                  </TD>
                  <TD>
                    <AccountStatusBadge status={u.accountStatus} />
                  </TD>
                  <TD className="whitespace-nowrap text-muted-foreground">{formatDate(u.joinDate)}</TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>

      {pages > 1 && (
        <div className="mt-3 flex items-center justify-end gap-2 text-sm">
          <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
            Previous
          </Button>
          <span className="text-muted-foreground">
            Page {safePage + 1} of {pages}
          </span>
          <Button variant="outline" size="sm" disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
