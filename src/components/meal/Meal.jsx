import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import MealItem from "./mealsitem/MealItem";
import { fetchRequest } from "../../lib/fetchAPI";

const Meal = () => {
  const [meals, setMeals] = useState();

  async function getFoods() {
    try {
      const response = await fetchRequest("/foods");
      setMeals(response);
    } catch (error) {
      new Error(error);
    }
  }

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <Container>
      {meals?.map((meal) => (
        <MealItem key={meal._id} meal={meal} />
      ))}
    </Container>
  );
};

export default memo(Meal);

const Container = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
  border-radius: 1rem;
  padding: 40px;
  max-width: 1039px;
`;
