import styled from "styled-components";
import {
    AttachMoney,
    CurrencyRuble,
    Download,
    Euro,
    KeyboardArrowDown, NotificationsNoneOutlined,
    Search,
    ShoppingCartOutlined
} from "@mui/icons-material";
import {Badge, Option, Select, selectClasses} from "@mui/joy";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import React, {useEffect, useState, useCallback} from "react";
import {useForm} from "react-hook-form";
import * as ModalForm from "./ModalForm";
import ModalWindow from "./ModalWindow";
import {useLocalStorage} from "react-use";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {List, ListItem, ListItemText, Popover} from "@mui/material";

const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  width: calc(100% - 4vw);
  padding: 1vw 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  width: 6vw;
  height: 3vw;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }
`

const Center = styled.div`
  flex: ${props => props.admin ? 2 : 1};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Item = styled.span`
  text-transform: uppercase;
  opacity: .7;
  cursor: pointer;

  &:hover {
    opacity: .4;
  }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
`

const BadgeContainer = styled(Badge)`
  opacity: .9;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`

const Header = ({handleCurrencyChange}) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [currentWindow, setCurrentWindow] = useState(null)
    const {register, handleSubmit} = useForm()
    const [user, setUser] = useLocalStorage("user")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            const decodedToken = jwtDecode(user.token)
            setIsAdmin(decodedToken.isAdmin)
        }
    }, [])

    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:8080/api/products/basket/${user.idUser}/products`)
                .then(res => setQuantity(res.data.length))
        })()
    }, [])

    const checkForUpdates = useCallback(async () => {
        await axios.get(`http://localhost:8080/api/notifications/notifications/user/${user.idUser}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Network response was not ok')
                }
                return res
            })
            .then(res => {
                setNotifications(res.data)
                setTimeout(checkForUpdates, 2000)
            })
            .catch(err => {
                alert(`There was a problem with the fetch operation: ${err}`)
                setTimeout(checkForUpdates, 2000)
            })
    }, [user])

    useEffect(() => {
        if (user !== "") {
            checkForUpdates()
        }
    }, [user, checkForUpdates])

    const reloadPage = () => {
        router.reload()
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;

    const handleChange = (event, newValue) => {
        handleCurrencyChange(newValue)
    }

    const deleteNotification = async (id) => {
        axios.delete(`http://localhost:8080/api/notifications/notifications/${id}`)
    }

    const handleLogin = (data) => {
        const username = data.usernameLogin
        const password = data.passwordLogin
        const requestBody = {
            username,
            password
        }
        axios.post(`http://localhost:8080/api/users/authenticate`, requestBody)
            .then(res => {
                setUser(res.data)
                reloadPage()
            })
        setModalActive(false)
    }

    const handleReg = (data) => {
        const username = data.usernameReg
        const password = data.passwordReg
        const repPassword = data.repPasswordReg
        const requestBody = {
            username,
            password
        }
        if (password === repPassword) {
            axios.post(`http://localhost:8080/api/users/register`, requestBody)
                .then(res => console.log(res.data))
        } else {
            alert("Пароли не совпадают")
        }
        setModalActive(false)
    }

    return (
        <Wrapper>
            <Container>
                <Left>
                    <h1 style={{margin: "0", cursor: "pointer"}} onClick={() => router.push("/")}>Главная</h1>
                </Left>
                <Center admin={isAdmin}>
                    <Item onClick={() => router.push("/catalogs")}>Каталог</Item>
                    {isAdmin && <>
                        <Item onClick={() => router.push("/adminPanel")}>Панель управления</Item>
                    </>}
                    {(user && Object.keys(user).length !== 0) &&
                        <Item onClick={() => {
                            setUser({})
                            router.push('/')
                        }}>Выход</Item>
                    }
                    {(user && Object.keys(user).length === 0) &&
                        <Item onClick={() => {
                            setCurrentWindow("login")
                            setModalActive(true)
                        }}>Вход</Item>
                    }
                    {(user && Object.keys(user).length === 0) &&
                        <Item onClick={() => {
                            setCurrentWindow("reg")
                            setModalActive(true)
                        }}>Регистрация</Item>
                    }
                </Center>
                <Right>
                    <Select defaultValue="RUB" indicator={<KeyboardArrowDown/>} sx={{
                        width: 150,
                        [`& .${selectClasses.indicator}`]: {
                            transition: ".4s ease-out",
                            [`&.${selectClasses.expanded}`]: {
                                transform: "rotate(-180deg)",
                            },
                        },
                    }} onChange={handleChange}>
                        <Option value="RUB"><CurrencyRuble/>&nbsp;Рубль</Option>
                        <Option value="USD"><AttachMoney/>&nbsp;Доллар</Option>
                        <Option value="EUR"><Euro/>&nbsp;Евро</Option>
                    </Select>
                    <>
                        <Badge
                            badgeContent={notifications?.length}
                            color="primary"
                            onClick={handleClick}
                        >
                            <NotificationsNoneOutlined/>
                        </Badge>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <List>
                                {notifications.map((notification, index) => (
                                    <ListItem onClick={() => deleteNotification(notification.idNotification)} key={index}>
                                        <ListItemText primary={notification.message}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Popover>
                    </>
                    {!isAdmin &&
                        <BadgeContainer badgeContent={quantity} color="primary"
                                        onClick={() => router.push(`/cart/${user.username}`)}>
                            <ShoppingCartOutlined/>
                        </BadgeContainer>
                    }
                </Right>
            </Container>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleLogin)}
                                style={{display: currentWindow !== "login" && "none"}}>
                    <ModalForm.Title>Вход</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("usernameLogin")}
                                                 placeholder="Имя пользователя"/>
                            <ModalForm.FormInput required type="password" {...register("passwordLogin")}
                                                 placeholder="Пароль"/>
                            <ModalForm.FormButton>Войти</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleReg)}
                                style={{display: currentWindow !== "reg" && "none"}}>
                    <ModalForm.Title>Регистрация</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("usernameReg")}
                                                 placeholder="Имя пользователя"/>
                            <ModalForm.FormInput required type="password" {...register("passwordReg")}
                                                 placeholder="Пароль"/>
                            <ModalForm.FormInput required type="password" {...register("repPasswordReg")}
                                                 placeholder="Повторите пароль"/>
                            <ModalForm.FormButton>Зарегистрироваться</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
            </ModalWindow>
        </Wrapper>
    )
}

export default Header
