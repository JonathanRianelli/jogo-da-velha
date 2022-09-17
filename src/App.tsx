import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'

function App() {


  const GlobalStyle = createGlobalStyle `
  
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #222222;
    font-family: 'Questrial', sans-serif;
  }
  `
  const Titulo = styled.h1<{vez: boolean, jogando: boolean}>`
    font-size: 60px;
    font-weight: normal;
    color: ${props => props.vez ? '#407CE4' : '#FF1616'};
    color: ${props => props.jogando === false ? '#06DF2F' : ''};
    text-align: center;
    margin: 50px 0;
    @media (max-width: 630px) {
      font-size: 36px;
    }
  `
  const Placar = styled.section `
    color: white;
  `

  const J1 = styled.div `
    position: absolute;
    text-align: center;
    top: 30vh;
    left: 80px;
  `
  const J2 = styled(J1) `
    left: inherit;
    right: 80px;
  `

  const PlacarNome = styled.p `
    font-size: 40px;
    margin-bottom: 60px;
  `

  const PlacarPt = styled.span `
    font-size: 100px;
    text-align: center;
  `

  const Tabuleiro = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 115px);
    grid-template-rows: repeat(3, 115px);
  `

  const Casa = styled.div<{n: string, simb: string}> `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
    color: ${props => props.simb === 'X' ? '#407CE4' : '#FF1616'};
    cursor: pointer;
    border-top: ${props => props.n === '3' || props.n === '4' || props.n === '5' || props.n === '6' || props.n === '7' || props.n === '8' ? '3px solid #BBBBBB' : 'none'};
    border-right: ${props => props.n === '0' || props.n === '3' || props.n === '6' || props.n === '1' || props.n === '4' || props.n === '7' ? '3px solid #BBBBBB' : 'none'};
  `

  const Botoes = styled.div `
    display: flex;
    justify-content: center;
  `

  const Botao = styled.button`
    display: block;
    cursor: pointer;
    background-color: #545454;
    color: white;
    border: none;
    font-size: 20px;
    padding: 10px;
    margin: 45px 20px 0;
  `

  const [jogInicial, setJogInicial] = useState('X')
  const [placar, setPlacar] = useState([0, 0])
  const [vezDoX, setVezDoX] = useState(true)
  const [titulo, setTitulo] = useState('Jogador X Começa')
  const [jogo, setJogo] = useState(['', '', '', '', '', '', '', '', ''])
  const [simboloAtual, setSimboloAtual] = useState('X')
  const [jogando, setJogando] = useState(true)

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return (
        <Botoes>
          <Botao onClick={() => reiniciarJogo()}>Jogar novamente</Botao>
          <Botao  onClick={() => zerarPlacar()}>Reiniciar placar</Botao>
        </Botoes>
      )
    }
  }

  const verificarVitoria = () => {
    const maneirasDeVitoria = [
      [jogo[0], jogo[1], jogo[2]],
      [jogo[3], jogo[4], jogo[5]],
      [jogo[6], jogo[7], jogo[8]],

      [jogo[0], jogo[3], jogo[6]],
      [jogo[1], jogo[4], jogo[7]],
      [jogo[2], jogo[5], jogo[8]],

      [jogo[0], jogo[4], jogo[8]],
      [jogo[2], jogo[4], jogo[6]]
    ]

    maneirasDeVitoria.forEach(itens => {
      if (itens.every(item => item === 'O')) {
        setTitulo('Jogador O venceu')
        let addJ2 = placar[1] + 1
        setPlacar([placar[0], addJ2])
        setJogando(false)
      } else if (itens.every(item => item === 'X')) {
        setTitulo('Jogador X venceu')
        setVezDoX(true)
        let addJ1 = placar[0] + 1
        setPlacar([addJ1, placar[1]])
        setJogando(false)
      }
      // else if (jogo.every(item => item !== '')) {
      //   setTitulo('Empate')
      //   setJogando(false)
      // }
    })
  }

  const verificarEmpate = () => {
    if (jogo.every(item => item !== '')) {
      setTitulo('Empate')
      setJogando(false)
    }
  }

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(verificarEmpate, [jogo])
  useEffect(() => {
    setTimeout(() => {
      if (jogando) {
        verificarVitoria()
      }
    }, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jogo])

  const zerarPlacar = () => {
    setPlacar([0, 0])
    reiniciarJogo()
  }

  const reiniciarJogo = () => {
    setJogo(['', '', '', '', '', '', '', '', ''])
    if (jogInicial === 'X') {
      setJogInicial('O')
      setSimboloAtual('O')
      setTitulo('Jogador O Começa')
      setVezDoX(false)
    } else {
      setJogInicial('X')
      setSimboloAtual('X')
      setTitulo('Jogador X Começa')
      setVezDoX(true)
    }

    setJogando(true)
  }

  const trocar = () => {
    if (simboloAtual === 'X') {
      setSimboloAtual('O')
      setTitulo('Vez do Jogador O')
    } else {
      setSimboloAtual('X')
      setTitulo('Vez do Jogador X')
    }
    setVezDoX(!vezDoX)
  }

  const clicar = (casa: number) => {
    if (jogando) {
      if (jogo[casa] === '') {
        setJogo(jogo.map((item, index) => index === casa ? simboloAtual : item))
        trocar()
      } else {
        alert('Casa ocupada')
      }
    }
  }

  return (
    <Fragment>
      <GlobalStyle/>

      <Titulo vez={vezDoX} jogando={jogando}>{titulo}</Titulo>

      <Placar>
        <J1>
          <PlacarNome>Jogador X</PlacarNome>
          <PlacarPt>{placar[0]}</PlacarPt>
        </J1>
        <J2>
          <PlacarNome>Jogador O</PlacarNome>
          <PlacarPt>{placar[1]}</PlacarPt>
        </J2>
      </Placar>

      <Tabuleiro>
        <Casa n='0' simb={jogo[0]} onClick={() => clicar(0)}>{jogo[0]}</Casa>
        <Casa n='1' simb={jogo[1]} onClick={() => clicar(1)}>{jogo[1]}</Casa>
        <Casa n='2' simb={jogo[2]} onClick={() => clicar(2)}>{jogo[2]}</Casa>
        <Casa n='3' simb={jogo[3]} onClick={() => clicar(3)}>{jogo[3]}</Casa>
        <Casa n='4' simb={jogo[4]} onClick={() => clicar(4)}>{jogo[4]}</Casa>
        <Casa n='5' simb={jogo[5]} onClick={() => clicar(5)}>{jogo[5]}</Casa>
        <Casa n='6' simb={jogo[6]} onClick={() => clicar(6)}>{jogo[6]}</Casa>
        <Casa n='7' simb={jogo[7]} onClick={() => clicar(7)}>{jogo[7]}</Casa>
        <Casa n='8' simb={jogo[8]} onClick={() => clicar(8)}>{jogo[8]}</Casa>
      </Tabuleiro>

      {BtnJogarNovamente()}
    </Fragment>
  );
}

export default App;
