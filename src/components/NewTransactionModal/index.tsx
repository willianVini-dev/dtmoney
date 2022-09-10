import Modal from 'react-modal';
import { Container, TransactionsTypeContainer, RadioBox } from './styles';
import iconeClose from '../../assets/botaoX.svg'
import iconeEntrada from '../../assets/entradas.svg'
import iconeSaida from '../../assets/saidas.svg'
import { useState } from 'react'


interface NewTranslationModalProps {
  isOpen: boolean,
  onRequestClose: () => void

}
export function NewTranslationModal({ isOpen, onRequestClose }: NewTranslationModalProps) {

  const [type, setType] = useState('deposit')

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
        <Container>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            placeholder="Titulo"
          />

          <input
            type="number"
            placeholder="Valor"
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
          />

          <button type="submit">
            Cadastrar
          </button>

        </Container>
      </Modal>
    </>
  )
}