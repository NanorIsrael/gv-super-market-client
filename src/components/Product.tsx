import { Link } from 'react-router-dom';
import { ProductProp } from '../data/props';

export default function Product({
  name,
  price,
  quantity,
  category,
  photo,
  _id,
  sku,
  isDetail,
  isConfirm,
  isAvailable,
}: ProductProp) {
  return (
    <figure className="cart-items ">
      <Link to={`/products/${_id}`}>
        <img src={photo} alt="" width={200} height={100} className={'my-2'} />
      </Link>
      <figcaption className="m-2">
        <p>
          <strong>item:</strong>
          <span className="m-1">{name}</span>
        </p>
        <p>
          <strong>price:</strong>
          <span className="m-1 text-sm">
            <strong>GH¢</strong>
            {price.toFixed(2)}
          </span>{' '}
        </p>
        <p>
          <strong>available:</strong>
          <span className="m-1">{isAvailable ? 'Yes' : 'No'}</span>{' '}
        </p>
        {isDetail && (
          <>
            <p>
              <strong>quantity:</strong>
              <span className="m-1">{quantity}</span>
            </p>
            <p>
              <strong>sku:</strong>
              <span className="m-1">{sku}</span>
            </p>
            <p>
              <strong>category:</strong>
              <span className="m-1 lowercase">{category}</span>
            </p>
          </>
        )}
        {isConfirm && (
          <>
            <p>
              <strong>sku:</strong>
              {/* <select>
                  <option>{sku}</option>
              </select> */}
              <span className="m-1">{sku}</span>
            </p>
          </>
        )}
      </figcaption>
    </figure>
  );
}
