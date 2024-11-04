import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

const Container = styled.div`
        background-color: #f0f0f0;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin: 1rem;
        padding: 1rem;
        text-align: center;
        height: 200px;
        width: 200px;

        &:hover {
            background-color: #e0e0e0;
        }

        img {
            height: 100px;
            width: 100px;
        }
    `

export function GameCard({ game }) {
    const navigate = useNavigate()

    return (
        <Container onClick={() => navigate(game.path)}>
            <h2>{game.name}</h2>
            <img src={`../../public/assests/rock-paper-scissors.png`} alt={game.name} />
        </Container>
    )
}