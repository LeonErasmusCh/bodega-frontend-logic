import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Login from "./components/Login";

import {
  getProducts,
  deleteProducts,
  addProducts,
  updateProducts
} from "./features/databaseProducts";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.dbproducts.products);
  const user = useSelector((state) => state.admin.admin);

  // loading

  //user?
  const [loggedin, setLoggedin] = useState(true);
  //const [loggedUser, setLoggedUser] = useState(user);

  // load each product
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDesciption] = useState("");

  //Update
  const [newCategory, setNewCategory] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newProductName, setNewProductName] = useState("");

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
          <div className="row p-4">
            <div className="col-2">
              {/* Top input area */}
              <input
                className="form-control"
                type="text"
                placeholder="producto"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="text"
                placeholder="categoria"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
            </div>
            <div className="col-4">
              <textarea
                rows="1"
                className="form-control"
                type="text"
                placeholder="descipcion"
                value={description}
                onChange={(e) => {
                  setDesciption(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="number"
                placeholder="cantidad"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              ></input>
            </div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={() => {
                  dispatch(
                    addProducts({
                      productname: productName,
                      category: category,
                      qty: qty,
                      description: description,
                    })
                  );
                  setQty(() => "");
                  setCategory(() => "");
                  setDesciption(() => "");
                  setProductName(() => "");
                }}
              >
                agregar
              </button>
            </div>
          </div>
          <hr />

          <table className="table">
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
              {products.map((item, key) => {
                return (
                  <>
                    <tr key={key}>
                      <th scope="row">{item.id}</th>
                      <td>{item.productname}</td>
                      <td>{item.category}</td>
                      <td>{item.qty}</td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
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
                            className="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            editar
                          </button>
                          <ul
                            className="dropdown-menu "
                            aria-labelledby="dropdownMenuButton1"
                          >
                            {/*  Form on dropdown "editar" */}
                            <form onSubmit={() => {
                                  dispatch(
                                    updateProducts({
                                      id: item.id,
                                      productname: newProductName,
                                      description: newDescription,
                                      category: newCategory,
                                      qty: newQty,
                                    })
                                  );
                                }}>
                              <p className="m-3 text-danger">completar todos los campos</p>
                              <div className="mb-1">
                                <label class="form-label mx-3 mt-3">
                                  producto*
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-1 dropdownInput"
                                  placeholder="producto"
                                  onChange={(e) => {
                                    setNewProductName(e.target.value);
                                  }}
                                  required
                                ></input>
                              </div>
                              <div className="mb-1">
                                <label class="form-label mx-3 mt-3">
                                  categoria*
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-1 dropdownInput"
                                  placeholder="categoria"
                                  onChange={(e) => {
                                    setNewCategory(e.target.value);
                                  }}
                                  required
                                ></input>
                              </div>
                              <div className="mb-1">
                                <label class="form-label mx-3 mt-3">
                                  cantidad*
                                </label>
                                <input
                                  type="number"
                                  className="form-control my-1 dropdownInput"
                                  placeholder="cantidad"
                                  onChange={(e) => {
                                    setNewQty(e.target.value);
                                  }}
                                  required
                                ></input>
                              </div>
                              <div className="mb-1">
                                <label className="form-label mx-3 mt-3">
                                  descripcion*
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-1 dropdownInput"
                                  placeholder="decripcion"
                                  onChange={(e) => {
                                    setNewDescription(e.target.value);
                                  }}
                                  required
                                ></input>
                              </div>
                              <button
                                type="submit"
                                value="submit"
                                className="btn btn-secondary btn-sm m-3 dropdownInput"
                                
                              >
                                guardar cambios
                              </button>
                            </form>
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
