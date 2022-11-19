import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [highestPrice, setHighest] = useState([false])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)
            })
        },
        []
    )

    useEffect(
        () => {
            if (highestPrice === false){
                setFiltered(products)
            } else {
                const highestProducts = products.filter(product => product.price > 2.00 )
                setFiltered(highestProducts)
            }

        },
        [ highestPrice ]
    )

    return <>
    <button onClick={() => { setHighest(true)} }>Highest Priced</button>
    <button onClick={() => { setHighest(false)} }>Show All</button>

        

    <h2>Products</h2>

    <article className="products">
        {
            filteredProducts.map(
                (product) => {
                    return <section className="product" key={`product--${product.id}`}>
                        <header>{product.productName}</header>
                        <footer>{"$" + product.price}</footer>
                    </section>
                }
            )
        }
    </article>
    </>
}