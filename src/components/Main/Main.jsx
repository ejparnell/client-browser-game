import styled from 'styled-components'

const Container = styled.div`
    grid-area: main;
`

export function Main({ children }) {
    return (
        <Container className='main'>
            { children }
        </Container>
    )
}