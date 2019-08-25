const productsDOM = document.querySelector(".products-center");
//getting the products
class Products{
    async getProducts(){
        try {
           /*  let result = await fetch('products.json')
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
             const {title,price} = item.fields;
             const {id} = item.sys;
             const image = item.fields.image.fields.file.url;
             return{title,price,id,image}
            }) */
            products=[{title:"p1",price:10,id:"1",image:"/images/AMD.png"}]
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    }
    
    //display products
    class UI{
    displayProducts(products){
    let result = '';
    products.forEach(product => {
     result +=`
     <!-- single product-->
        <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fa fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>
        <!-- end of single product-->
     `
    });
    productsDOM.innerHTML = result;
    }
}


document.addEventListener("DOMContentLoaded",()=>{
    
    const ui = new UI();
    const products = new Products();
    
    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }
    ).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });
    })

