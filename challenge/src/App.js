import "./App.css";
import logo from "./images/logo/agencia-eplus-n-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import listaCarrinhoJSON from "./products.json";
import impressora from "./images/products/impressora-canon-160-160.jpg";
import noteGamer from "./images/products/note-gamer-acer-160-160.jpg";
import note01 from "./images/products/note01-samsung-160-160.jpg";
import note02 from "./images/products/note02-samsung-160-160.jpg";

function App() {
  const [carrinho, setCarrinho] = useState(false);
  const listaCarrinho = useRef(listaCarrinhoJSON.cart.item);
  const arrayImagem = useRef([impressora, noteGamer, note01, note02]);

  let i = 0;
  for (const lista of listaCarrinho.current) {
    lista.image = arrayImagem.current[i];
    i++;
  }

  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
        <div className="lista">
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
        </div>
        <nav>
          <div className="icone">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <div className="icone">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
          <div className="icone">
            <FontAwesomeIcon
              onClick={() => setCarrinho(!carrinho)}
              icon={faShoppingCart}
              size="lg"
            />
          </div>
        </nav>
        {carrinho && (
          <div className="carrinho">
            <div className="lista-carrinho">
              {listaCarrinho.current.map((item) => {
                return (
                  <div className="card" key={item.productId}>
                    <img
                      src={item.image}
                      alt="imagem"
                      width="70px"
                      height="70px"
                    />
                    <div>
                      <p>{item.name}</p>
                      <div className="card-valor">
                        <h4>Qtd:{item.quantity}</h4>
                        <span>{item.bestPriceFormated}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="valor-pedido">
              Total do pedido: <span>R$ 20.356,95</span>
            </p>
            <button>FINALIZAR COMPRA</button>
          </div>
        )}
    </header>
  );
}

export default App;
