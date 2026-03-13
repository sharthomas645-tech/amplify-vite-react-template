import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import AuroraBackground from "./components/AuroraBackground";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

interface AuthUser {
  username: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((u) => setUser({ username: u.username, email: u.username }))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (u: AuthUser) => setUser(u);
  const handleLogout = () => setUser(null);

  if (checking) {
    return (
      <>
        <AuroraBackground />
        <div className="loading-screen">
          <div className="loading-spinner" />
        </div>
      </>
    );
  }

  return (
    <>
      <AuroraBackground />
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
