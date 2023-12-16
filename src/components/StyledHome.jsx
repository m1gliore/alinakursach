import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
`

export const HomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2vw;
`

export const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  justify-content: space-between;
`

export const GameCard = styled.div`
  background-color: #fff;
  padding: 2vw;
  border-radius: 0.5vw;
  box-shadow: 0 0.15vw 0.3vw rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 6vw);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.35vw);
    box-shadow: 0 0.45vw 1.2vw rgba(0, 0, 0, 0.1);
  }
`

export const GameImage = styled.img`
  width: 100%;
  max-height: 15vw;
  object-fit: cover;
  border-radius: 0.5vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.2);
`

export const GameName = styled.h2`
  font-size: 1.5rem;
  margin: 1vw 0;
`

export const GamePrice = styled.p`
  font-family: "Source Code Pro", sans-serif;
  font-size: 1.2rem;
  color: #888;
`

export const GameDescription = styled.p`
  font-size: 1rem;
  color: #555;
`