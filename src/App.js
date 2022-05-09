import { Routes, Route } from "react-router-dom";
import "./App.css";
import InvoiceList from "./routes/InvoiceList";
import CardList from "./routes/CardList";
import AddRecord from "./routes/AddRecord";
import AddInvoice from "./routes/AddInvoice";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="cardList" element={<CardList />} />
        <Route path="addRecord" element={<AddRecord />} />
        <Route path="addinvoice" element={<AddInvoice />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
