import Basket from "./components/basket/Basket";
import { useState } from "react";
import Header from "./components/headers/Header";
import MealSummary from "./components/meal-summary/MealSummary";
import Meal from "./components/meal/Meal";

function App() {
  const [toggle, setToggle] = useState(false);

  const toggleModalHadler = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <Header toggleModalHadler={toggleModalHadler} />
      <MealSummary />
      <Meal />
      {toggle && <Basket toggleModalHadler={toggleModalHadler} />}
    </>
  );
}

export default App;
