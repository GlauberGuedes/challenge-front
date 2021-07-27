import "./App.css";
import logo from "./assets/agencia-eplus-n-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ListaHeader from "./componentes/ListaHeader";

function App() {
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [abrirMenu, setAbrirMenu] = useState(false);

  async function carregarProdutos() {
    try {
      const resposta = await fetch("products.json");
      const data = await resposta.json();
      setItensCarrinho(data.cart.item);

      for (const item of data.cart.item) {
        setTotal((totalAnterior) => totalAnterior + item.bestPrice);
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setTotal(0);
    carregarProdutos();
  }, []);

  return (
    <header>
      <div className="menu-mobile">
        <div className="icone">
          <FontAwesomeIcon
            onClick={() => setAbrirMenu(!abrirMenu)}
            icon={faBars}
            size="lg"
          />
        </div>
          {abrirMenu && <ListaHeader/>}
      </div>
      <img className="logo" src={logo} alt="logo" />
      <div className="menu">
        <ListaHeader />
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
            onClick={() => setAbrirCarrinho(!abrirCarrinho)}
            icon={faShoppingCart}
            size="lg"
          />
        </div>
      </nav>
      {abrirCarrinho && (
        <div className="carrinho">
          <div className="lista-produtos">
            {itensCarrinho.map((item) => {
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
            Total do pedido: <span>R$ {(total / 100).toFixed(2)}</span>
          </p>
          <button>FINALIZAR COMPRA</button>
        </div>
      )}
    </header>
  );
}

export default App;
