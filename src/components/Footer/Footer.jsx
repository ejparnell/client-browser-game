import styled from 'styled-components'

const Container = styled.footer`
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: #fff;
`;

export function Footer() {
    return (
        <Container className='footer'>
            <p>Footer</p>
        </Container>
    )
}