import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1vw;
`
export const Title = styled.h1``

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export const LeftFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
`

export const FormImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  object-fit: contain;
  margin-right: 20px;
`

export const FormLabel = styled.label`
  margin-bottom: 10px;
  color: gray;
  font-weight: 600;
`

export const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus {
    outline: none;
  }
`

export const RightFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const FormButton = styled.button`
  width: 15vw;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5vw;
  background-color: #2b97c7;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.25s ease-out;

  &:hover {
    opacity: 0.8;
  }
`