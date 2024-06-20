// REDUX 활용
import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./storage/userSlice";

let cart = createSlice({
  // 유저 장바구니 목록 더미 데이터
  name: "cart",
  initialState: [
    { id: 0, name: " White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    upCnt(state, action) {
      // array/object 자료형의 경우, 직접수정(return 없이)해도 state 변경이 가능하다.
      let num = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state[num].count++;
      // 함수 파라미터로 받은 값은 반드시 그 뒤에 .payload를 붙여야 한다.
      // 파라미터 작명은 보통 action으로 한다.
    },
    downCnt(state, action) {
      // array/object 자료형의 경우, 직접수정(return 없이)해도 state 변경이 가능하다.
      let num = state.findIndex((item) => {
        return item.id === action.payload;
      });
      if (state[num].count === 1) {
        alert("더 이상 수량을 내릴 수 없습니다.");
        return;
      }
      state[num].count -= 1;

      // 함수 파라미터로 받은 값은 반드시 그 뒤에 .payload를 붙여야 한다.
      // 파라미터 작명은 보통 action으로 한다.
    },
    addItem(state, action) {
      state.push(action.payload);
    },
    deleteItem(state, action) {
      let index = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state.splice(index, 1);
    },
  }, // state 수정 함수 선언부
});

// export let { 함수1, 함수2, ... } = cart.actions
// 만든 함수들을 Destructuring 기법으로 export하는 법.
export let { downCnt, upCnt, addItem, deleteItem, isThere } = cart.actions;

export default configureStore({
  reducer: {
    // 작명 : state이름.reducer <--- .reducer 안쓰면 적용 안됨.
    cart: cart.reducer,
  },
});
