import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    change(state, action) {
      state.age += action.payload;
      // 함수 파라미터로 받은 값은 반드시 그 뒤에 .payload를 붙여야 한다.
      // 파라미터 작명은 보통 action으로 한다.
    },
  },
});

export let { change } = user.actions;

export default user;
