import styled from 'styled-components'

const Container = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
`

export function Main({ children }) {
    return (
        <Container>
            { children }
        </Container>
    )
}