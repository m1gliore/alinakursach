import * as StyledGamesPage from "../components/StyledGamesPage";
import {convertCurrency} from "../lib/Currency";
import React, {useContext, useEffect, useState} from "react";
import CurrencyContext from "../context/CurrencyContext";
import {useRouter} from "next/router";
import * as ModalForm from "../components/ModalForm";
import {Download} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {fileHandler} from "../lib/Game";
import ModalWindow from "../components/ModalWindow";
import {jwtDecode} from "jwt-decode";
import {useLocalStorage} from "react-use";
import axios from "axios";
import {log} from "next/dist/server/typescript/utils";

const CatalogsPage = () => {
    const currency = useContext(CurrencyContext)
    const router = useRouter()
    const [modalActive, setModalActive] = useState(false)
    const {register, handleSubmit} = useForm()
    const [user,] = useLocalStorage("user")
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentAction, setCurrentAction] = useState("")
    const [catalogs, setCatalogs] = useState([])

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            const decodedToken = jwtDecode(user.token)
            setIsAdmin(decodedToken.isAdmin)
        }
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/api/catalogs/pageCatalogs')
            .then(res => setCatalogs(res.data.content))
    }, [])

    const reloadPage = () => {
        router.reload()
    }

    const handleAdd = async (data) => {
        const requestBody = {
            nameCatalog: data.nameCatalogAdd,
            description: data.descriptionAdd
        }
        await axios.post('http://localhost:8080/api/catalogs/saveCatalog', requestBody)
            .then(() => reloadPage())
        setModalActive(false)
    }

    const handleEdit = async (data) => {
        const requestBody = {
            idCatalog: data.idCatalogEdit,
            nameCatalog: data.nameCatalogEdit,
            description: data.descriptionEdit
        }
        await axios.put('http://localhost:8080/api/catalogs/updateCatalog', requestBody)
            .then(() => reloadPage())
        setModalActive(false)
    }

    const handleDelete = async (data) => {
        await axios.delete(`http://localhost:8080/api/catalogs/deleteCatalog/${data.idCatalogDelete}`)
            .then(() => reloadPage())
        setModalActive(false)
    }

    return (
        <StyledGamesPage.GameListContainer>
            {isAdmin &&
                <StyledGamesPage.AddIcon fontSize="large" onClick={() => {
                    setCurrentAction("add")
                    setModalActive(true)
                }}/>
            }
            {isAdmin &&
                <StyledGamesPage.EditIcon fontSize="large" onClick={() => {
                    setCurrentAction("edit")
                    setModalActive(true)
                }}/>
            }
            {isAdmin &&
                <StyledGamesPage.DeleteIcon fontSize="large" onClick={() => {
                    setCurrentAction("delete")
                    setModalActive(true)
                }}/>
            }
            {catalogs.map((catalog, index) => (
                <StyledGamesPage.GameCard onClick={() => router.push(`/products?catalog=${catalog.idCatalog}`)}
                                          key={index}>
                    <StyledGamesPage.GameName>{catalog.nameCatalog}</StyledGamesPage.GameName>
                    <StyledGamesPage.GameDescription>{catalog.description}</StyledGamesPage.GameDescription>
                </StyledGamesPage.GameCard>
            ))}
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleAdd)}
                                style={{display: currentAction === "add" ? "flex" : "none"}}>
                    <ModalForm.Title>Добавить каталог</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("nameCatalogAdd")}
                                                 placeholder="Наименование каталога"/>
                            <ModalForm.FormInput required type="text" {...register("descriptionAdd")}
                                                 placeholder="Описание каталога"/>
                            <ModalForm.FormButton>Добавить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleEdit)}
                                style={{display: currentAction === "edit" ? "flex" : "none"}}>
                    <ModalForm.Title>Изменить каталог</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <select style={{marginBottom: "1vw"}} {...register("idCatalogEdit")}>
                                <option value="">Выберите каталог</option>
                                {catalogs.map((catalog, index) => (
                                    <option key={index} value={catalog.idCatalog}>{catalog.nameCatalog}</option>
                                ))}
                            </select>
                            <ModalForm.FormInput required type="text" {...register("nameCatalogEdit")}
                                                 placeholder="Наименование каталога"/>
                            <ModalForm.FormInput required type="text" {...register("descriptionEdit")}
                                                 placeholder="Описание каталога"/>
                            <ModalForm.FormButton>Изменить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleDelete)}
                                style={{display: currentAction === "delete" ? "flex" : "none"}}>
                    <ModalForm.Title>Удалить каталог</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <select style={{marginBottom: "1vw"}} {...register("idCatalogDelete")}>
                                <option value="">Выберите каталог</option>
                                {catalogs.map((catalog, index) => (
                                    <option key={index} value={catalog.idCatalog}>{catalog.nameCatalog}</option>
                                ))}
                            </select>
                            <ModalForm.FormButton>Удалить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
            </ModalWindow>
        </StyledGamesPage.GameListContainer>
    )
}

export default CatalogsPage
