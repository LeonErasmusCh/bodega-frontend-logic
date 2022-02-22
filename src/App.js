import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Login from "./components/Login";

import {
  getProducts,
  deleteProducts,
  addProducts,
  updateProducts,
  getAdmin,
} from "./features/databaseProducts";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.dbproducts.products);
  const user = useSelector((state) => state.admin.admin);

  //user?
  const [loggedin, setLoggedin] = useState(true);
  const [loggedUser, setLoggedUser] = useState(user);

  console.log(user);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDesciption] = useState("");


  //Update
  const [newCategory, setNewCategory] = useState(category);
  const [newQty, setNewQty] = useState(qty);
  const [newDescription, setNewDescription] = useState(description);
  const [newProductName, setNewProductName] = useState(productName);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, products]);



  return (
    <div className="App">
      {!loggedin ? (
        <Login userlogged={(logged) => setLoggedin(logged)} />
      ) : (
        <div className="container">
          <h1 className="p-3 text-secondary">Bodega</h1>
          <div class="row p-4">
            <div class="col-2">
              <input
                class="form-control"
                type="text"
                placeholder="producto"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              ></input>
            </div>
            <div class="col-2">
              <input
                class="form-control"
                type="text"
                placeholder="categoria"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
            </div>
            <div class="col-4">
              <textarea
                rows="1"
                class="form-control"
                type="text"
                placeholder="descipcion"
                value={description}
                onChange={(e) => {
                  setDesciption(e.target.value);
                }}
              ></textarea>
            </div>
            <div class="col-2">
              <input
                class="form-control"
                type="number"
                placeholder="cantidad"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              ></input>
            </div>
            <div class="col-2">
              <button
                type="button"
                class="btn btn-secondary btn-md"
                onClick={() => {
                  dispatch(
                    addProducts({
                      productname: productName,
                      category: category,
                      qty: qty,
                      description: description,
                    })
                    );
                    setQty(()=>"");
                    setCategory(()=>"");
                    setDesciption(()=>"");
                    setProductName(()=>"");
                }}
              >
                agregar
              </button>
            </div>
          </div>
          <hr />

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#id</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col">cantidad</th>
                <th scope="col">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <>
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.productname}</td>
                      <td>{item.category}</td>
                      <td>{item.qty}</td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            dispatch(deleteProducts(item.id));
                          }}
                        >
                          eliminar
                        </button>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            editar
                          </button>
                          <ul
                            class="dropdown-menu "
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <label class="form-label mx-3 mt-3">
                                producto
                              </label>
                              <input
                                type="text"
                                defaultValue={item.productname}
                                required
                                class="form-control my-1 dropdownInput"
                                placeholder="producto"
                                onChange={(e) => {
                                  setNewProductName(e.target.value);
                                }}
                              ></input>
                            </li>
                            <li>
                              <label class="form-label mx-3 mt-3">
                                categoria
                              </label>
                              <input
                                type="text"
                                defaultValue={item.category}
                                required
                                class="form-control my-1 dropdownInput"
                                placeholder="categoria"
                                onChange={(e) => {
                                  setNewCategory(e.target.value);
                                }}
                              ></input>
                            </li>
                            <li>
                              <label class="form-label mx-3 mt-3">
                                descripcion
                              </label>
                              <input
                                defaultValue={item.description}
                                required
                                type="text"
                                class="form-control my-1 dropdownInput"
                                placeholder="decripcion"
                                onChange={(e) => {
                                  setNewDescription(e.target.value);
                                }}
                              ></input>
                            </li>
                            <li>
                              <label class="form-label mx-3 mt-3">
                                cantidad
                              </label>
                              <input
                                defaultValue={item.qty}
                                required
                                type="text"
                                class="form-control my-1 dropdownInput"
                                placeholder="cantidad"
                                onChange={(e) => {
                                  setNewQty(e.target.value);
                                }}
                              ></input>
                            </li>
                            <li>
                              <button
                                type="button"
                                class="btn btn-secondary btn-sm m-2 dropdownInput"
                                onClick={() => {
                                  dispatch(
                                    updateProducts({
                                      id: item.id,
                                      productname: newProductName,
                                      description: newDescription,
                                      category: newCategory,
                                      qty: newQty,
                                    })
                                  );
                                }}
                              >
                                update product
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
