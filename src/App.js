import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

//import { addProduct, deleteProduct, updateProductName } from './features/products';
import { getProducts, deleteProducts, addProducts, updateProducts } from "./features/databaseProducts"

function App() {



const dispatch = useDispatch()  
const products = useSelector((state) => state.dbproducts.products)
console.log(products)
//const productList = useSelector((state) => state.products.value)

 
const [productName, setProductName] = useState("")
const [category, setCategory] = useState("")
const [qty, setQty] = useState("")
const [description, setDesciption] = useState("")


//Update 
const [newCategory, setNewCategory] = useState(category)
const [newQty, setNewQty] = useState(qty)
const [newDescription, setNewDescription] = useState(description)
const [newProductName, setNewProductName] = useState(productName)


useEffect(() => {
  dispatch(getProducts())
}, [dispatch])



  return (
<div className="App">
    <h1>Bodega</h1>
    <input type="text" placeholder='product name' onChange={(e) => {setProductName(e.target.value)}}></input>
        <input type="text" placeholder='category' onChange={(e) => {setCategory(e.target.value)}}></input>
        <input type="text" placeholder='desciption' onChange={(e) => {setDesciption(e.target.value)}}></input>
        <input type="number" placeholder='quantity' onChange={(e) => {setQty(e.target.value)}}></input>
        <button onClick={() => {
          dispatch(addProducts({productname: productName , category: category , qty: qty , description: description })
          )}}>add product</button>
    <hr />
    {products.map((item) => {
        return(
          <div key={item.id}>
          <h3 >{item.productname}</h3>
          <h5>{item.id}</h5>
          <h5>{item.category}</h5>
          <h5>{item.qty}</h5>
          <h5>{item.description}</h5>
          <button onClick={() => {
            dispatch(deleteProducts(item.id));
            console.log(item.id)
            }}>delete product</button>


            <input type="text" placeholder='new product name' 
            onChange={(e) => {setNewProductName(e.target.value)}}
            ></input>

<input type="text" placeholder='new category' 
            onChange={(e) => {setNewCategory(e.target.value)}}
            ></input>

<input type="text" placeholder='new desciption' 
            onChange={(e) => {setNewDescription(e.target.value)}}
            ></input>

<input type="text" placeholder='new qty' 
            onChange={(e) => {setNewQty(e.target.value)}}
            ></input>


          <button onClick={() => {
            dispatch(updateProducts({
              id: item.id, 
              productname : newProductName, 
              description : newDescription,
              category : newCategory,
              qty: newQty}))}}
            >update product</button>

          </div>
          )
        })}
        </div>

    /* 
    <div className="App">
      <div>
        
        <input type="text" placeholder='product name' onChange={(e) => {setProductName(e.target.value)}}></input>
        <input type="text" placeholder='category' onChange={(e) => {setCategory(e.target.value)}}></input>
        <input type="text" placeholder='desciption' onChange={(e) => {setDesciption(e.target.value)}}></input>
        <input type="number" placeholder='quantity' onChange={(e) => {setQty(e.target.value)}}></input>
        <button onClick={() => {
          dispatch(addProduct({id: productList[productList.length -1].id + 1 ,productname: productName , category: category , qty: qty , description: description })
          )}}>add product</button>
      </div>
      <div>
        {productList.map((product) => {
          return(
            
            <div key={{product}}>
            <h3>{product.productname}</h3>
            <p>cateogory: {product.category}</p>
            <p>qty: {product.qty}</p>
            <p>description: {product.description}</p>
            
            <input type="text" placeholder='new product name' 
            onChange={(e) => {setNewProductName(e.target.value)}}
            ></input>
            <button onClick={() => {dispatch(updateProductName({id: product.id, productname : newProductName}))}}>update product</button>
            <button onClick={() => {dispatch(deleteProduct({ id: product.id }))}}>delete product</button>
            </div>
          )
         
        })}
      </div>
    </div>
  */
    
  );
}

export default App;
