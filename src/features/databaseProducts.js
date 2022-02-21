import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch(
      "https://bodega-backend-api.herokuapp.com/products"
    );
    const formattedResponse = await response.json();
    return formattedResponse;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    const response = await fetch(
      `https://bodega-backend-api.herokuapp.com/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const formattedResponse = await response.json();
    console.log("delete desponse", formattedResponse);
  }
);

export const addProducts = createAsyncThunk(
  "products/deleteProducts",
  async ( productname, category, qty, desciption ) => {
    const response = await fetch(
      `https://bodega-backend-api.herokuapp.com/products/`, 
      {
        method: "POST",
        body: JSON.stringify(productname, category, qty, desciption ),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const formattedResponse = await response.json();
  }
);

export const updateProducts = createAsyncThunk(
    "products/deleteProducts",
    async ({id, productname, qty, description, category} ) => {
      const response = await fetch(
        `https://bodega-backend-api.herokuapp.com/product/${id}`, 
        {
          method: "PUT",
          body: JSON.stringify({productname, qty, description, category}),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const formattedResponse = await response.json();
    }
  );

export const dbproductSlice = createSlice({
  name: "dbproducts",
  initialState: {
    products: [],
    isLoading: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    // delete logic
    [deleteProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.isLoading = false;
    },
    [deleteProducts.rejected]: (state) => {
      state.isLoading = false;
    },

    // post logic
    [addProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [addProducts.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    [addProducts.rejected]: (state) => {
      state.isLoading = false;
    },

        // Update logic
        [updateProducts.pending]: (state) => {
            state.isLoading = true;
          },
          [updateProducts.fulfilled]: (state, action) => {
            state.products.map((product) => {
                if(product.id === action.payload.id){
                    product.productname = action.payload.productname;
                   // product.desciption = action.payload.desciption;
                   // product.qty = action.payload.qty;
                }
            })
            state.isLoading = false;
          },
          [updateProducts.rejected]: (state) => {
            state.isLoading = false;
          }

  },
});

export default dbproductSlice.reducer;
