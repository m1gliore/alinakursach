import * as StyledGamesPage from "../../components/StyledGamesPage";
import {convertCurrency} from "../../lib/Currency";
import React, {useContext, useEffect, useState} from "react";
import CurrencyContext from "../../context/CurrencyContext";
import {useRouter} from "next/router";
import {AddIcon} from "../../components/StyledGamesPage";
import * as ModalForm from "../../components/ModalForm";
import {Download} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {fileHandler} from "../../lib/Game";
import ModalWindow from "../../components/ModalWindow";
import {jwtDecode} from "jwt-decode";
import {useLocalStorage} from "react-use";
import axios from "axios";

const GamesPage = () => {
    const currency = useContext(CurrencyContext)
    const router = useRouter()
    const [modalActive, setModalActive] = useState(false)
    const [currentAction, setCurrentAction] = useState("")
    const {register, handleSubmit} = useForm()
    const [imageUrl, setImageUrl] = useState("/images/defaultGame.png")
    const [file, setFile] = useState(null)
    const [products, setProducts] = useState([])
    const [user,] = useLocalStorage("user")
    const [isAdmin, setIsAdmin] = useState(false)
    const catalogId = router.query.catalog

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            const decodedToken = jwtDecode(user.token)
            setIsAdmin(decodedToken.isAdmin)
        }
    }, [])

    useEffect(() => {
        fileHandler(file, setImageUrl)
    }, [file])

    useEffect( () => {
        (async () => {
            catalogId && await axios.get(`http://localhost:8080/api/products/productsForCatalog/${catalogId}`)
                .then(res => setProducts(res.data.content))
        })()
    }, [catalogId])

    const reloadPage = () => {
        router.reload()
    }

    const handleAdd = async (data) => {
        const formData = new FormData()
        formData.append("nameProduct", data.nameProductAdd)
        formData.append("description", data.descriptionAdd)
        formData.append("priceProduct", data.priceProductAdd)
        formData.append("images[0].multipartFile", file)
        formData.append("images[0].fileName", file.name)
        formData.append("images[0].type", file.type)
        formData.append("images[0].main", true)
        await axios.post(`http://localhost:8080/api/products/addProductToCatalog?id_catalog=${catalogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => reloadPage())
    }

    const handleEdit = (data) => {

    }

    const handleDelete = (data) => {

    }

    return (
        <StyledGamesPage.GameListContainer>
            {isAdmin &&
                <StyledGamesPage.AddIcon fontSize="large" onClick={() => {
                    setCurrentAction("add")
                    setModalActive(true)
                }}/>
            }
            {products.map((product, index) => (
                <StyledGamesPage.GameCard onClick={() => router.push(`/products/${product.idProduct}`)} key={index}>
                    <StyledGamesPage.GameImage src={"data:" + product.images[0].type + ";base64," + product.images[0].file_image} alt={product.name}/>
                    <StyledGamesPage.GamePrice>{convertCurrency(currency, product.priceProduct)}</StyledGamesPage.GamePrice>
                    <StyledGamesPage.GameName>{product.nameProduct}</StyledGamesPage.GameName>
                    <StyledGamesPage.GameDescription>{product.description}</StyledGamesPage.GameDescription>
                </StyledGamesPage.GameCard>
            ))}
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleAdd)}>
                    <ModalForm.Title>Добавить продукт</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.LeftFormContainer>
                            <ModalForm.FormImage
                                src={imageUrl !== "/images/defaultGame.png" ? imageUrl : "/images/defaultGame.png"}
                                alt="Изображение продукта"/>
                            <ModalForm.FormLabel style={{cursor: "pointer"}} htmlFor="fileUpdate">
                                <Download/>
                            </ModalForm.FormLabel>
                            <ModalForm.FormInput style={{opacity: 0, pointerEvents: "none"}} type="file"
                                                 id="fileUpdate" {...register("fileUpdate")}
                                                 onChange={(event) => setFile(event.target.files[0])} accept="image/*"/>
                        </ModalForm.LeftFormContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("nameProductAdd")}
                                                 placeholder="Наименование товара"/>
                            <ModalForm.FormInput required type="text" {...register("descriptionAdd")}
                                                 placeholder="Описание товара"/>
                            <ModalForm.FormInput required type="number" min="0" {...register("priceProductAdd")}
                                                 placeholder="Стоимость товара"/>
                            <ModalForm.FormButton>Добавить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
            </ModalWindow>
        </StyledGamesPage.GameListContainer>
    )
}

export default GamesPage
