import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "../UI//Modal";
import TotalAmount from "./TotalAmount";
import BasketItem from "./BasketItem";
import { cartContext } from "../../store/cart-context";

const Basket = ({ toggleModalHadler }) => {
  const { cartItems, getTotalAmountHandler } = useContext(cartContext);

  return (
    <Modal toggleModalHadler={toggleModalHadler}>
      <Content>
        {cartItems?.length ? (
          <FixedWidthContainer>
            {cartItems?.map((item) => {
              if (item.amount > 0) {
                return (
                  <BasketItem
                    id={item._id}
                    key={item._id}
                    title={item.title}
                    price={item.price}
                    amount={item.amount}
                  />
                );
              }
              return null;
            })}
          </FixedWidthContainer>
        ) : null}

        <TotalAmount
          totalPrice={getTotalAmountHandler}
          onClose={toggleModalHadler}
        />
      </Content>
    </Modal>
  );
};

export default Basket;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

const FixedWidthContainer = styled.div`
  max-height: 245px;
  overflow-y: auto;
`;
