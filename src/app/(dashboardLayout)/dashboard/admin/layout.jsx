import ProtectedRoute from "@/component/ProtectedRoute";


export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      {children}
    </ProtectedRoute>
  );
}