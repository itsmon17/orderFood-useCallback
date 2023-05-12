import { CartProvider } from "./store/cart-context";
import Home from "./Home";

function App() {

  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
