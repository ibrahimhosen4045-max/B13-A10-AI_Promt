import ProtectedRoute from "@/component/ProtectedRoute";


export default function CreatorLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["Creator"]}>
      {children}
    </ProtectedRoute>
  );
}