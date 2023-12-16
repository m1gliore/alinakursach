import * as StyledHome from "../components/StyledHome";
import {useContext} from "react";
import CurrencyContext from "../context/CurrencyContext";
import {convertCurrency} from "../lib/Currency";
import {useRouter} from "next/router";

const Home = () => {
    const currency = useContext(CurrencyContext)
    const router = useRouter()

    const games = [
        {
            id: "1-product-1",
            name: "Продукт 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
        {
            id: "2-product-2",
            name: "Продукт 2",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
        {
            id: "3-product-3",
            name: "Продукт 3",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
        {
            id: "4-product-4",
            name: "Продукт 4",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
        {
            id: "5-product-5",
            name: "Продукт 5",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
        {
            id: "6-product-6",
            name: "Продукт 6",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
        },
    ]

    return (
        <StyledHome.HomeContainer>
            <StyledHome.HomeTitle>Популярные новинки</StyledHome.HomeTitle>
            <StyledHome.GameList>
                {games
                    .slice(-6)
                    .map((game, index) => (
                        <StyledHome.GameCard onClick={() => router.push(`/products/${game.id}`)} key={game.id}>
                            <StyledHome.GameImage src={game.image} alt={`Game Image ${index + 1}`}/>
                            <StyledHome.GameName>{game.name}</StyledHome.GameName>
                            <StyledHome.GamePrice>{convertCurrency(currency, game.price)}</StyledHome.GamePrice>
                            <StyledHome.GameDescription>{game.description}</StyledHome.GameDescription>
                        </StyledHome.GameCard>
                    ))}
            </StyledHome.GameList>
        </StyledHome.HomeContainer>
    )
}

export default Home
