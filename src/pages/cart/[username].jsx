import React, {useContext, useEffect, useState} from "react";
import * as StyledCartPage from "../../components/StyledCartPage";
import {Add, Remove} from "@mui/icons-material";
import {convertCurrency, convertToNumber, currencySign} from "../../lib/Currency";
import CurrencyContext from "../../context/CurrencyContext";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotal} from "../../lib/Cart";
import {clearCart, updateGameQuantity} from "../../redux/actions/cart";
import {useRouter} from "next/router";
import {useLocalStorage} from "react-use";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const CartPage = () => {
    const currency = useContext(CurrencyContext)
    const [quantity, setQuantity] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()
    const [user,] = useLocalStorage("user")

    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:8080/api/products/basket/${user.idUser}/products`)
                .then(res => {
                    setQuantity(res.data.length)
                    setCartItems(res.data)
                    console.log(res.data)
                })
        })()
    }, [])

    const reloadPage = () => {
        router.reload()
    }

    const price = calculateTotal(cartItems)
    const total = (convertToNumber(convertCurrency(currency, price)))

    const handlePayment = () => {

    }

    const handleRemove = async (id) => {
        await axios.delete(`http://localhost:8080/api/users/basket/remove/${user.idUser}/product/${id}`)
            .then(() => reloadPage())
    }

    return (
        <StyledCartPage.CartContainer>
            <StyledCartPage.Title>Ваша корзина</StyledCartPage.Title>
            <StyledCartPage.Top>
                <StyledCartPage.TopButton filled>Оплатить</StyledCartPage.TopButton>
                <StyledCartPage.TopTextContainer>
                    <StyledCartPage.TopText>Корзина ({quantity})</StyledCartPage.TopText>
                </StyledCartPage.TopTextContainer>
                <StyledCartPage.TopButton>Продолжить покупки</StyledCartPage.TopButton>
            </StyledCartPage.Top>
            <StyledCartPage.Bottom>
                <StyledCartPage.Info>
                    {cartItems?.map((item, index) => (<StyledCartPage.Product key={index}>
                        <StyledCartPage.ProductDetail>
                            <StyledCartPage.Image src={"data:" + item?.images[0].type + ";base64," + item?.images[0].file_image} alt={item?.nameProduct}/>
                            <StyledCartPage.Details>
                                <StyledCartPage.ProductName><b>Продукт:</b> {item?.nameProduct}</StyledCartPage.ProductName>
                            </StyledCartPage.Details>
                        </StyledCartPage.ProductDetail>
                        <StyledCartPage.PriceDetail>
                            <StyledCartPage.AmountContainer>
                                <StyledCartPage.Amount>{item.quantity}</StyledCartPage.Amount>
                            </StyledCartPage.AmountContainer>
                            <StyledCartPage.Price>{convertCurrency(currency, item?.priceProduct)}</StyledCartPage.Price>
                            <button onClick={() => handleRemove(item?.idProduct)}>Удалить</button>
                        </StyledCartPage.PriceDetail>
                    </StyledCartPage.Product>))}
                </StyledCartPage.Info>
                <StyledCartPage.Summary>
                    <StyledCartPage.SummaryTitle>Общая сумма</StyledCartPage.SummaryTitle>
                    <StyledCartPage.SummaryItem>
                        <StyledCartPage.SummaryItemText>Стоимость товаров</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{convertCurrency(currency, price)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryItem large>
                        <StyledCartPage.SummaryItemText>Конечная сумма</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{currencySign(currency, total)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryButton onClick={handlePayment}>Оплатить</StyledCartPage.SummaryButton>
                </StyledCartPage.Summary>
            </StyledCartPage.Bottom>
        </StyledCartPage.CartContainer>
    )
}

export default CartPage
