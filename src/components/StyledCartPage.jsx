import styled from "styled-components";

export const CartContainer = styled.div`
  width: calc(100% - 4vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1vw;
`

export const Top = styled.div`
  padding: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TopButton = styled.button`
  width: 12%;
  padding: .75vw;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  border: ${props => props.filled && "none"};
  background-color: ${props => props.filled ? "black" : "transparent"};
  color: ${props => props.filled && "white"};
  border-radius: .25vw;
  transition: .25s ease-out;

  &:hover {
    border: ${props => props.filled ? "2px solid black" : "2px solid transparent"};
    background-color: ${props => props.filled ? "transparent" : "black"};
    color: ${props => props.filled ? "black" : "white"};
  }
`

export const TopTextContainer = styled.div`
  display: flex;
  gap: 1vw;
`

export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.5rem;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: .5vw;
`

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  gap: 1vw;
`

export const Image = styled.img`
  width: 10vw;
  height: 10vw;
  object-fit: fill;
  border-radius: .5vw;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const ProductName = styled.span`
  font-size: 1.5rem;
`

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5vw;
`

export const Amount = styled.span`
  font-size: 1.75rem;
`

export const Price = styled.span`
  font-size: 2rem;
  font-weight: 200;
`

export const Summary = styled.div`
  flex: 1;
  border: .1vw solid lightgray;
  background-color: #f4f4f4;
  border-radius: .5vw;
  padding: 2vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const SummaryTitle = styled.h1`
  text-transform: uppercase;
  font-weight: 200;
  margin: 0;
`

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.large && "500"};
  font-size: ${props => props.large && "1.75rem"};
`

export const SummaryItemText = styled.span`
  font-weight: 400;
`

export const SummaryItemPrice = styled.span`
  font-weight: 400;
`

export const SummaryButton = styled.button`
  width: 100%;
  padding: .5vw;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: .5vw;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    background-color: transparent;
    color: black;
  }
`
