import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunkFunctions";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers를 사용하면 toolkit이 action creator를 자동으로 만들어줌
  // 하지만 비동기적 작업들은 action creator를 자동으로 만들지 못하므로
  // extraReducers 안에서 정의한다
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
