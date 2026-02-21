import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </>
    );
}

export default App;