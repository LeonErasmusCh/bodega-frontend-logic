 
function displayProducts(){
    //const baseUrl = 
    const allProducts = fetch("https://bodega-backend-api.herokuapp.com/products")
    .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log(data);
        return data
      })
}

displayProducts();

export default displayProducts;