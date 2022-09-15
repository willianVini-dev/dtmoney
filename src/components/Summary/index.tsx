import { Container } from "./styles";
import entradaIcon from '../../assets/entradas.svg';
import saidaIcon from '../../assets/saidas.svg';
import totalIcon from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";
import { useContext } from "react";

export function Summary() {

  const { transactions } = useTransactions()

  // const TotalDeposit = transactions.reduce((acc, transaction) => {
  //   if (transaction.type === 'deposit') {
  //     return acc + transaction.amount
  //   }
  //   return acc;
  // }, 0)

  const summary = transactions.reduce((acc, transaction) => {

    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;

  }, {
    deposits: 0,
    withdraw: 0,
    total: 0
  })



  return (
    <Container>
      <div>

        <header>
          <p>Entradas</p>
          <img src={entradaIcon} alt="entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={saidaIcon} alt="saidas" />
        </header>
        <strong>
         - {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>

  )
}