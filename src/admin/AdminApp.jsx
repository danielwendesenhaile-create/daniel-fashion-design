import { useAuth } from "./useAuth";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function AdminApp() {
  const session = useAuth();

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-sm text-espresso/60">Loading…</p>
      </div>
    );
  }

  return session ? <Dashboard session={session} /> : <Login />;
}
