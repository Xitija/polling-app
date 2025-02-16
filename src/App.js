import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { ViewPolls } from "./pages/ViewPolls";
import { CreatePolls } from "./pages/CreatePolls";

function App() {
  return (
    <div className="App">
      <nav style={{display : "flex", gap: "1rem"}}>
        <Link to="/">View Polls</Link>
        <Link to="/create">Create Poll</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<ViewPolls />} />
          <Route path="/create" element={<CreatePolls />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
