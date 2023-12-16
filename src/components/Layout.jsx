import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import {useState} from "react";
import CurrencyContext from "../context/CurrencyContext";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  width: 100%;
  max-height: fit-content;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 65vh;
  width: 100%;
  background-color: #e6e6e6;
  margin: 0;
  padding: 0;
`

const Layout = ({children}) => {
    const [currency, setCurrency] = useState("RUB")

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency)
    }

    return (
        <CurrencyContext.Provider value={currency}>
            <LayoutWrapper>
                <Header handleCurrencyChange={handleCurrencyChange}/>
                <ContentWrapper>
                    <Container>
                        {children}
                    </Container>
                </ContentWrapper>
                <Footer/>
            </LayoutWrapper>
        </CurrencyContext.Provider>
    )
}

export default Layout
