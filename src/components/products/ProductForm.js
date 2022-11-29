import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const ProductForm = () => {
    const [product, setProduct] = useState({
        productTypeId: 0,
        productName: "",
        price: 0
    })

    const navigate = useNavigate()
    const [productTypes, setTypes] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productArray) => {
                setTypes(productArray)
            })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            productTypeId: product.productTypeId,
            productName: product.productName,
            price: product.price

        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })

            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }   

    return (
        <form className="productForm">
            <h2 className="productForm__title">Add New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of product"
                        value={product.productName}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productName = evt.target.value
                                setProduct(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input 
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of Product"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = parseInt(evt.target.value)
                                setProduct(copy)
                            }
                        } />

                </div>
                <div className="form-group">
                    <select 
                    value={product.productTypeId}
                    onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.productTypeId = parseInt(evt.target.value)
                            setProduct(copy)
                        }}>
                        {productTypes.map(type => { return <option value={type.id}>{type.category}</option>})}                        
                    </select>
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}