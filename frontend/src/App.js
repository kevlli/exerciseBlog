import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateExercise } from "./pages/create-exercise";
import { SavedExercises } from "./pages/saved-exercises";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/saved-exercises" element={<SavedExercises />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
