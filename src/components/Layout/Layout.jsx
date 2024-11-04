import styled from 'styled-components'

import { Nav } from '../Nav/Nav'
import { Footer } from '../Footer/Footer'
import { Main } from '../Main/Main'

const Container = styled.div`
    width: 100%;
    display: grid;
    grid:
        "header" auto
        "main" 1fr
        "footer" auto
        / 1fr;
    gap: 8px;
    height: 100vh;
`

export function Layout({ children }) {
    return (
        <Container>
            <Nav />
            <Main>
                {children}
            </Main>
            <Footer />
        </Container>
    )
}