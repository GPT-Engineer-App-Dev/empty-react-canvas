import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import { useSession } from "./integrations/supabase/index.js";

function App() {
  const { data: session } = useSession();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={session ? <Index /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
