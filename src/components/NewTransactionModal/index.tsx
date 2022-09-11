import Modal from 'react-modal';
import { Container, TransactionsTypeContainer, RadioBox } from './styles';
import iconeClose from '../../assets/botaoX.svg'
import iconeEntrada from '../../assets/entradas.svg'
import iconeSaida from '../../assets/saidas.svg'
import { FormEvent, useState } from 'react'
import {api} from '../../services/api'


interface NewTranslationModalProps {
  isOpen: boolean,
  onRequestClose: () => void

}
export function NewTranslationModal({ isOpen, onRequestClose }: NewTranslationModalProps) {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit')


  function handleCreateNewTranslation(event: FormEvent) {
    event.preventDefault();
    const data = { type, value, title, category }

    api.post('/transactions', data)
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