import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../data/ApiProvider";
import { ProductProp } from "../data/props";

export default function useItem() {
    const [product, setProduct] = useState<ProductProp | undefined | null>(undefined)
    const {id} = useParams()
    const api = useApi()

    useEffect(() => {
        (async() => {
            if (id) {
                const res = await api.get<{item: ProductProp}>(`/product/${id}`)
                if(res.ok) {
                    setProduct(res.body?.item)
                } else {
                    setProduct(null)
                }
            }
        })()
    }, [id, api])

    return {
        product,
        setProduct
    }
}