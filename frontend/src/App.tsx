import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CardsPage from "@/pages/cards";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CardsPage />} path="/cards" />
    </Routes>
  );
}

export default App;
