import { ProductProp } from "../data/props";

export default function Product({name, price, quantity, category, photo}: ProductProp) {

    return (
        <figure>
            <img src={`./${photo}`} alt="" width={100} height={100}/>
                <figcaption>
                    <p><strong>item:</strong>{name}</p>
                    <p><strong>price:</strong>{price} </p>
                    {/* <p><strong>quantity:</strong>{quantity}</p> */}
                    {/* <p><strong>category:</strong>{category}</p> */}
                </figcaption>
        </figure>
    )
}