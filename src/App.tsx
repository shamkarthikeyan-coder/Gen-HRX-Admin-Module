import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ContentModerationPage } from "@/pages/ContentModeration";
import { FlagReviewPage } from "@/pages/Review";
import { UsersPage } from "@/pages/Users";
import { UserDetailPage } from "@/pages/UserDetail";
import { VendorsMarketplacePage } from "@/pages/VendorsMarketplace";
import { AuditLogPage } from "@/pages/AuditLog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/moderation" replace />} />
          <Route path="/moderation" element={<ContentModerationPage />} />
          <Route path="/moderation/:flagId" element={<FlagReviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/vendors" element={<VendorsMarketplacePage />} />
          <Route path="/audit" element={<AuditLogPage />} />
          {/* Redirect old deep links to the combined areas */}
          <Route path="/decision-rooms" element={<Navigate to="/moderation" replace />} />
          <Route path="/placements" element={<Navigate to="/vendors" replace />} />
          <Route path="*" element={<Navigate to="/moderation" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
