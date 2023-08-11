import { Link } from "react-router-dom";
import { ProductProp } from "../data/props";

export default function Product({name, price, quantity, category, photo, _id, sku, isDetail}: ProductProp) {

    return (
        <figure>
            <Link to={`/product/${_id}`}><img src={photo} alt="" width={100} height={100}/></Link>
                <figcaption>
                    <p><strong>item:</strong><span>{name}</span></p>
                    <p><strong>price:</strong><span><strong>GH¢</strong>{price.toFixed(2)}</span> </p>
                   { 
                        isDetail &&  (
                            <>
                                <p><strong>quantity:</strong>{quantity}</p>
                                <p><strong>sku:</strong>{sku}</p> 
                                <p><strong>category:</strong>{category}</p> 

                            </>
                        )
                   }
                </figcaption>
        </figure>
    )
}