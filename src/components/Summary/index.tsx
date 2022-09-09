import { Container } from "./styles";
import entradaIcon from '../../assets/entradas.svg';
import saidaIcon from '../../assets/saidas.svg';
import totalIcon from '../../assets/total.svg';

export function Summary() {
  return (

    <Container>
      <div>

        <header>
          <p>Entradas</p>
          <img src={entradaIcon} alt="entradas" />
        </header>
        <strong>R$ 1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={saidaIcon} alt="saidas" />
        </header>
        <strong> - R$ 500,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="total" />
        </header>
        <strong>R$ 500,00</strong>
      </div>
    </Container>

  )
}