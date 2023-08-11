import { useCart } from "../data/CartProvider"
import { CartData } from "../data/props"

export default function Header() {
    const {cart} = useCart() as CartData
    return (
        <header>
        <nav>
           <h1><a href="/" className="header__links">CEDI Mart</a></h1>
        </nav>
        <form id="search_form">
            <input id="search_box" type="search" name="searchbox" placeholder="search movie"/>
            <button id="search_btn" type="submit">search</button>
        </form>
        <p>
          <img src={''} alt="cart"/>
          <span>{cart.length}</span>
        </p>
      </header>
    )
}