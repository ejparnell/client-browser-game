import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const choices = ['rock', 'paper', 'scissors']

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`

const Canvas = styled.canvas`
    border: 1px solid black;
    object-fit: cover;
    box-sizing: border-box;
    `

export function RPSHome() {
    const canvasRef = useRef(null)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [playerChoice, setPlayerChoice] = useState('')
    const [computerChoice, setComputerChoice] = useState('')
    const [result, setResult] = useState('')

    function handlePlayerChoice(event) {
        const rockLocation = { xMin: 0, xMax: width / 3, yMin: 0, yMax: height }
        const paperLocation = { xMin: width / 3, xMax: (width / 3) * 2, yMin: 0, yMax: height }
        const scissorsLocation = { xMin: (width / 3) * 2, xMax: width, yMin: 0, yMax: height }

        if (
            event.clientX >= rockLocation.xMin &&
            event.clientX <= rockLocation.xMax &&
            event.clientY >= rockLocation.yMin &&
            event.clientY <= rockLocation.yMax
        ) {
            setPlayerChoice('rock')
        }

        if (
            event.clientX >= paperLocation.xMin &&
            event.clientX <= paperLocation.xMax &&
            event.clientY >= paperLocation.yMin &&
            event.clientY <= paperLocation.yMax
        ) {
            setPlayerChoice('paper')
        }

        if (
            event.clientX >= scissorsLocation.xMin &&
            event.clientX <= scissorsLocation.xMax &&
            event.clientY >= scissorsLocation.yMin &&
            event.clientY <= scissorsLocation.yMax
        ) {
            setPlayerChoice('scissors')
        }
    }
    
    function determineWinner() {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)]
        setComputerChoice(computerChoice)

        if (playerChoice === computerChoice) {
            setResult('It\'s a tie!')
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('You win!')

        } else {
            setResult('You lose!')
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current

        if (!height) setHeight(canvas.parentElement.clientHeight)
        if (!width) setWidth(canvas.parentElement.clientWidth)

        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.font = '20px Arial'
        context.textAlign = 'center'

        context.fillText('Rock', canvas.width / 6, canvas.height / 2)
        context.strokeRect(0, 0, canvas.width / 3, canvas.height)

        context.fillText('Paper', canvas.width / 2, canvas.height / 2)
        context.strokeRect(canvas.width / 3, 0, canvas.width / 3, canvas.height)

        context.fillText('Scissors', (canvas.width / 6) * 5, canvas.height / 2)
        context.strokeRect((canvas.width / 3) * 2, 0, canvas.width / 3, canvas.height)

        context.font = '16px Arial'
        context.fillText(`Your choice: ${playerChoice}`, canvas.width / 2, canvas.height - 60)
        context.fillText(`Computer's choice: ${computerChoice}`, canvas.width / 2, canvas.height - 40)

        context.fillText(result, canvas.width / 2, canvas.height - 20)

        if (playerChoice) determineWinner()

    }, [height, width, playerChoice, computerChoice, result])

    return (
        <Container>
            <h1>Rock Paper Scissors</h1>
            <Canvas ref={canvasRef} width={width} height={height} onClick={handlePlayerChoice}/>
        </Container>
    )
}
