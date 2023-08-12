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
}: ProductProp) {
  const isAvailable = quantity >= 1;
  return (
    <figure>
      <Link to={`/product/${_id}`}>
        <img src={photo} alt="" width={100} height={100} />
      </Link>
      <figcaption>
        <p>
          <strong>item:</strong>
          <span>{name}</span>
        </p>
        <p>
          <strong>price:</strong>
          <span>
            <strong>GH¢</strong>
            {price.toFixed(2)}
          </span>{' '}
        </p>
        <p>
          <strong>Available:</strong>
          <span>{isAvailable ? 'Yes' : 'No'}</span>{' '}
        </p>
        {isDetail && (
          <>
            <p>
              <strong>quantity:</strong>
              {quantity}
            </p>
            <p>
              <strong>sku:</strong>
              {sku}
            </p>
            <p>
              <strong>category:</strong>
              {category}
            </p>
          </>
        )}
        {isConfirm && (
          <>
            <p>
              <strong>quantity:</strong>
              <input type={'number'} min={1} max={quantity} />
            </p>
            <p>
              <strong>sku:</strong>
              {/* <select>
                  <option>{sku}</option>
              </select> */}
              {sku}
            </p>
          </>
        )}
      </figcaption>
    </figure>
  );
}
