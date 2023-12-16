import React, {useContext, useEffect, useState} from "react";
import * as StyledGamePage from "../../components/StyledGamePage";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addGame} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import YouTubeVideo from "../../components/YouTubeVideo";
import {Download, Person} from "@mui/icons-material";
import {fileHandler, formatDateString} from "../../lib/Game";
import ModalWindow from "../../components/ModalWindow";
import * as ModalForm from "../../components/ModalForm";
import {useForm} from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import {useLocalStorage} from "react-use";
import axios from "axios";

const GamePage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {productId} = router.query
    const [product, setProduct] = useState(null)
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [currentAction, setCurrentAction] = useState("")
    const {register, handleSubmit} = useForm()
    const [imageUrl, setImageUrl] = useState("/images/defaultGame.png")
    const [file, setFile] = useState(null)
    const [DLCs, setDLCs] = useState([])
    const [user,] = useLocalStorage("user")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            const decodedToken = jwtDecode(user.token)
            setIsAdmin(decodedToken.isAdmin)
        }
    }, [])

    useEffect(() => {
        fileHandler(file, setImageUrl)
    }, [file])

    useEffect(() => {
        (async () => {
            productId && await axios.get(`http://localhost:8080/api/products/getProduct/${productId}`)
                .then(res => setProduct(res.data))
            // productId && await axios.get(`http://localhost:8080/api/products/recommendations/userstat/${productId}/${user.idUser}`)
            //     .then(res => console.log(res.data))
            productId && await axios.get(`http://localhost:8080/api/record/records/product/${productId}`)
                .then(res => setReviews(res.data.content))
        })()
    }, [productId])

    const reloadPage = () => {
        router.reload()
    }

    const handleAddToCart = async () => {
        const id = productId && productId
        axios.post(`http://localhost:8080/api/users/basket/add/${user.idUser}/product/${id}`)
            .then(() => reloadPage())
    }

    const handleReviewChange = async (e) => {
        setNewReview(e.target.value)
    }

    const handleAddReview = () => {
        const id = productId && productId
        const requestBody = {
            stars: 5,
            description: newReview,
            username: user.username
        }
        axios.post(`http://localhost:8080/api/record/records/${user.idUser}/products/${id}`, requestBody)
            .then(() => reloadPage())
    }

    const handleDeleteReview = async (id) => {
        await axios.delete(`http://localhost:8080/api/record/delete/${id}`)
            .then(() => reloadPage())
    }

    const handleEdit = async (data) => {
        const requestBody = {
            idProduct: productId && productId,
            nameProduct: data.nameProductEdit,
            description: data.descriptionEdit,
            priceProduct: data.priceProductEdit
        }
        const formData = new FormData()
        formData.append("idImages", product?.images[0]?.idImages)
        formData.append("multipartFile", file)
        formData.append("fileName", file.name)
        formData.append("type", file.type)
        formData.append("main", true)
        await axios.put(`http://localhost:8080/api/images/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(async () => {
                await axios.put(`http://localhost:8080/api/products/updateProduct`, requestBody,)
            })
            .then(() => reloadPage())
    }
    const handleDelete = async () => {
        productId && await axios.delete(`http://localhost:8080/api/products/deleteProduct/${productId}`)
            .then(async () => {
                productId && await axios.delete(`http://localhost:8080/api/images/deleteAll/${productId}`)
            })
            .then(() => router.push('/catalogs'))
    }

    return (
        <StyledGamePage.GameCard>
            {isAdmin && <>
                <StyledGamePage.UpdateIcon fontSize="large" color="warning" onClick={() => {
                    setCurrentAction("update")
                    setModalActive(true)
                }}/>
                <StyledGamePage.DeleteIcon fontSize="large" color="error" onClick={() => {
                    setCurrentAction("delete")
                    setModalActive(true)
                }}/>
            </>}
            <StyledGamePage.Game>
                <StyledGamePage.GameImage
                    src={"data:" + product?.images[0].type + ";base64," + product?.images[0].file_image}
                    alt={product?.nameProduct}/>
                <StyledGamePage.GameContent>
                    <StyledGamePage.GameTitle>
                        {product?.nameProduct}
                    </StyledGamePage.GameTitle>
                    <StyledGamePage.GameDescription>{product?.description}</StyledGamePage.GameDescription>
                    <StyledGamePage.GamePrice>
                        <b>Цена:</b> {convertCurrency(currency, product?.priceProduct)}
                    </StyledGamePage.GamePrice>
                    {!isAdmin &&
                        <StyledGamePage.GameButton onClick={handleAddToCart}>
                            Добавить в корзину
                        </StyledGamePage.GameButton>
                    }
                </StyledGamePage.GameContent>
            </StyledGamePage.Game>
            <StyledGamePage.GameDetailsContainer>
                <StyledGamePage.DLCContainer>
                    <StyledGamePage.DLCHeading>Похожие продукты:</StyledGamePage.DLCHeading>
                    <StyledGamePage.DLCItems>
                        {DLCs.map((dlc) => (
                            <StyledGamePage.DLCItem key={dlc.id} onClick={() => router.push(`/products/${dlc.id}`)}>
                                <StyledGamePage.DLCImage src={dlc.image} alt={dlc.name}/>
                                <StyledGamePage.DLCName>{dlc.name}</StyledGamePage.DLCName>
                                <StyledGamePage.DLCPrice>{convertCurrency(currency, dlc.price)}</StyledGamePage.DLCPrice>
                            </StyledGamePage.DLCItem>
                        ))}
                    </StyledGamePage.DLCItems>
                </StyledGamePage.DLCContainer>
            </StyledGamePage.GameDetailsContainer>
            <StyledGamePage.ReviewsSection>
                {reviews.length !== 0 &&
                    <StyledGamePage.ReviewHeading>Отзывы:</StyledGamePage.ReviewHeading>
                }
                <StyledGamePage.ReviewList>
                    {reviews.map((review, index) => (
                        <StyledGamePage.ReviewItem key={index} onClick={() => handleDeleteReview(review.idRecord)}>
                            <StyledGamePage.ReviewContent>
                                <StyledGamePage.ReviewAuthor><Person/>{review.username}</StyledGamePage.ReviewAuthor>
                                <StyledGamePage.ReviewText>{review.description}</StyledGamePage.ReviewText>
                            </StyledGamePage.ReviewContent>
                        </StyledGamePage.ReviewItem>
                    ))}
                </StyledGamePage.ReviewList>
                {!isAdmin &&
                    <StyledGamePage.AddReviewForm onSubmit={handleAddReview}>
                        <StyledGamePage.AddReviewTextarea
                            value={newReview}
                            onChange={handleReviewChange}
                            placeholder="Оставьте свой отзыв..."
                        />
                        <StyledGamePage.GameButton type="submit">Добавить отзыв</StyledGamePage.GameButton>
                    </StyledGamePage.AddReviewForm>
                }
            </StyledGamePage.ReviewsSection>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleEdit)}
                                style={{display: currentAction !== "update" && "none"}}>
                    <ModalForm.Title>Изменить продукт</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.LeftFormContainer>
                            <ModalForm.FormImage
                                src={imageUrl !== "/images/defaultGame.png" ? imageUrl : "data:" + product?.images[0].type + ";base64," + product?.images[0].file_image}
                                alt="Изображение игры"/>
                            <ModalForm.FormLabel style={{cursor: "pointer"}} htmlFor="fileUpdate">
                                <Download/>
                            </ModalForm.FormLabel>
                            <ModalForm.FormInput style={{opacity: 0, pointerEvents: "none"}} type="file"
                                                 id="fileUpdate" {...register("fileUpdate")}
                                                 onChange={(event) => {
                                                     setFile(event.target.files[0])
                                                 }} accept="image/*"/>
                        </ModalForm.LeftFormContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={product?.nameProduct} {...register("nameProductEdit")}
                                                 placeholder="Наименование игры"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={product?.description} {...register("descriptionEdit")}
                                                 placeholder="Описание игры"/>
                            <ModalForm.FormInput required type="number" min="0"
                                                 defaultValue={product?.priceProduct} {...register("priceProductEdit")}
                                                 placeholder="Цена"/>
                            <ModalForm.FormButton>Изменить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleDelete)}
                                style={{display: currentAction !== "delete" && "none"}}>
                    <ModalForm.Title>Удалить продукт</ModalForm.Title>
                    <ModalForm.FormButton>Удалить</ModalForm.FormButton>
                </ModalForm.Form>
            </ModalWindow>
        </StyledGamePage.GameCard>
    )
}

export default GamePage
