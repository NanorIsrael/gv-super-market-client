import { ProductProp } from "../data/props";

export default function Product({name, price, quantity, category, photo}: ProductProp) {

    return (
        <figure>
            <img src={`./images/${photo}`} alt="" width={100} height={100}/>
                <figcaption>
                    <p><strong>item:</strong><span>{name}</span></p>
                    <p><strong>price:</strong><span><strong>GH¢</strong>{price.toFixed(2)}</span> </p>
                    {/* <p><strong>quantity:</strong>{quantity}</p> */}
                    {/* <p><strong>category:</strong>{category}</p> */}
                </figcaption>
        </figure>
    )
}