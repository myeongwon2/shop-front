import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../store/cartSlice";

function Cart() {
  const store = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {}, [store]);

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {store.cart.map((data, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.count}</td>
              <td>
                <button onClick={() => dispatch(increase(data.id))}>+</button>
              </td>
              <td>
                <button onClick={() => dispatch(decrease(data.id))}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
