import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



  // get admin user
  export const getAdmin = createAsyncThunk(
    "admin/getAdim",
    async () => {
      const response = await fetch(`https://bodega-backend-api.herokuapp.com/admin`);
      const formattedResponse = await response.json();
      return formattedResponse
    }
  );

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: [],
    isLoading: false,
  },
  extraReducers: {

          //get admin
        [getAdmin.pending]: (state) => {
          state.isLoading = true;
        },
        [getAdmin.fulfilled]: (state, action) => {
            state.admin = action.payload;
            state.isLoading = false;
        },
        [getAdmin.rejected]: (state) => {
          state.isLoading = false;
        }

  },
});

export default adminSlice.reducer;
