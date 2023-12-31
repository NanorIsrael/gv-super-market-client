import { ReactElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

interface IModal {
  xtraclass: string;
  children: ReactElement;
}

export const Modal: React.FC<IModal> = ({ children, xtraclass }) => {
  const modalref = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!modalref.current) {
    modalref.current = document.createElement('div');
  }

  useEffect(() => {
    // hide root
    const root = document.getElementById('root');
    const modalRoot = document.getElementById('modal');

    if (root) {
      root.hidden = true;
    }
    if (!modalRoot || !modalref.current) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (event.target === modalRoot) {
        event.stopPropagation();

        if (id) {
          navigate(`/product/${id}`);
        }
      }
    };

    modalRoot.appendChild(modalref.current);
    modalRoot.addEventListener('click', handleClick);

    return () => {
      if (modalRoot && modalref.current) {
        modalRoot.removeChild(modalref.current);
        modalRoot.removeEventListener('click', handleClick);
      }
      if (root) {
        root.hidden = false;
      }
    };
  }, [id, navigate]);

  return createPortal(
    <section className={'p-0 m-0 modal ' + xtraclass}>{children}</section>,
    modalref.current,
  );
};
