import React, {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import { ProductProp } from '../data/props';

export default function Productform({
  pItem,
  setPItem,
}: {
  pItem: ProductProp;
  setPItem: Dispatch<SetStateAction<ProductProp | []>>;
}) {
  const [formErros, setFormErrors] = useState({});

  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ratingsRef = useRef() as MutableRefObject<HTMLInputElement>;
  const durationRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => nameRef.current?.focus(), []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const quantity = ratingsRef.current?.value;
    const sku = durationRef.current?.value;

    const errors: {
      quantity: string;
      sku: string;
    } = {
      quantity: '',
      sku: '',
    };

    if (!quantity) {
      errors.quantity = 'Item quantity must be provided';
    }

    if (!sku) {
      errors.sku = 'Movie duration must be provided';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // const processedDuration = processDuration(duration)

    setPItem([]);
  };

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={onSubmit}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Enter Movie Name"
              data-testid="nameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              ref={ratingsRef}
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              ref={durationRef}
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
            />
          </div>
          {/* Use this div when time format is invalid */}
          {formErros && (
            <div className="alert error mb-30" data-testid="alert">
              {Object.keys(formErros).map((e) => e)}
            </div>
          )}
          {/* <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
            >
              Add Movie
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
}
