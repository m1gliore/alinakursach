import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5vw;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2vw;
`

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2vw;
`

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`

const PageNotFound = () => {
    return (
        <Container>
            <Title>404 - Page Not Found</Title>
            <Description>Страница, которую вы ищете, не существует.</Description>
            <StyledLink href="/">Вернуться на главную</StyledLink>
        </Container>
    )
}

export default PageNotFound;
