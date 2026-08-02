import ProtectedRoute from "@/component/ProtectedRoute";


export default function UserLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["User"]}>
      {children}
    </ProtectedRoute>
  );
}