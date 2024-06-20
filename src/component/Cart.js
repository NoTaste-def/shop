import React, { memo, useMemo, useState } from "react";
import { CloseButton, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, downCnt, upCnt } from "../store.js";

// memo는 꼭 필요할 때만 재랜더링 할 수 있도록 해준다.
// 랜더링이 오래걸리는 컴포넌트에 감싸주면 좋다.
// memo의 원리 : props가 변할 때만 재랜더링 해준다.
// memo는 props가 변했는지 안변했는지 항상 비교작업을 한다. props가 길고 복잡하다면 memo를 쓰는게 손해일 수도 있다.
// memo는 사실 대부분 붙일 일이 없고 참고로만.
// let Child = memo(function () {
//   console.log("재랜더링됨");
//   return <div>자식 컴포넌트</div>;
// });

function 함수() {
  return null;
}

const Cart = () => {
  let [cnt, setCnt] = useState(0);
  let result = useMemo(() => {
    return 함수();
  }, []); // useMemo : 컴포넌트 랜더링시 1회만 실행해준다. 그 이후는 실행되지 않는다.
  // Dependency를 추가해서 특정 state가 변화 할 때만 함수를 실행시키도록 할 수도 있다.
  // useEffect와 유사하나, 실행 시점의 차이가 있다. useMemo는 html이 랜더링 될 때 수행된다.

  let cart = useSelector((state) => {
    // Redux 활용
    return state.cart; // 객체 접근하듯이 원하는 state만 빼올 수 있다.
  });
  let dispatch = useDispatch(); // store.js로 요청을 보내주는 함수.

  return (
    <div>
      {/* <Child count={cnt}></Child>
      <button
        onClick={() => {
          setCnt(cnt + 1);
        }}
      >
        +
      </button>
      <span>{cnt}</span> */}
      <Table hover>
        <thead>
          <tr>
            <th>#상품코드</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{cart[i].id}</td>
                <td>{cart[i].name}</td>
                <td>{cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(upCnt(cart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(downCnt(cart[i].id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <CloseButton
                    onClick={() => {
                      dispatch(deleteItem(cart[i].id));
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
