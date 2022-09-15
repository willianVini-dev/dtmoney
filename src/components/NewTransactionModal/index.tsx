import Modal from 'react-modal';
import { Container, TransactionsTypeContainer, RadioBox } from './styles';
import iconeClose from '../../assets/botaoX.svg'
import iconeEntrada from '../../assets/entradas.svg'
import iconeSaida from '../../assets/saidas.svg'
import { FormEvent, useState, useContext } from 'react'
import { useTransactions } from '../../hooks/useTransactions';


interface NewTranslationModalProps {
  isOpen: boolean,
  onRequestClose: () => void

}
export function NewTranslationModal({ isOpen, onRequestClose }: NewTranslationModalProps) {

  // pegando as informção de dentro do contexto
  const {createTransaction} = useTransactions()

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit')


  // executandoe ssa função com o submit do formulario 
  async function handleCreateNewTranslation(event: FormEvent) {
    event.preventDefault();


    // executando função que está vindo do contexto
    await createTransaction({
      title,
      amount: value,
      category,
      type
    })

    // fechando o modal
    onRequestClose()


    // resetando as variaveis 
    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={iconeClose} alt="fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTranslation}>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={e => setValue(Number(e.target.value))}

          />

          <TransactionsTypeContainer>
            <RadioBox
              type="button"
              onClick={() => { setType('deposit') }}
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={iconeEntrada} alt="entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => { setType('withdraw') }}
              isActive={type === 'withdraw'}
              activeColor="red"
            >
              <img src={iconeSaida} alt="saida" />
              <span>Saida</span>
            </RadioBox>
          </TransactionsTypeContainer>

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>

        </Container>
      </Modal>
    </>
  )
}