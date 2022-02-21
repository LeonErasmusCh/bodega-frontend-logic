import { createSlice } from "@reduxjs/toolkit";
import { fakeProducts } from "./fakadata";


export const productSlice = createSlice({
    name : "products",
    initialState: { value: fakeProducts },
    reducers: {
        addProduct: (state, action) => {
            // code for adding user
            state.value.push(action.payload)
        },

        deleteProduct: (state, action) => {
            // code for adding user
            state.value = state.value.filter((product) => product.id !== action.payload.id )
        },

        updateProductName: (state, action) => {
            // code for adding user
            state.value.map((product) => {
                if(product.id === action.payload.id){
                    product.productname = action.payload.productname;
                }
            })
        },
}
            
       
    
})

export const { addProduct, deleteProduct, updateProductName } = productSlice.actions
export default productSlice.reducer