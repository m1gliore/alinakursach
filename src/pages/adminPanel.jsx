import {useRouter} from "next/router";
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
    Box, AppBar, Toolbar, Typography, IconButton, Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material';
import {BarChart, PieChart, ShowChart} from '@mui/icons-material';
import {Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie} from 'recharts';
import axios from "axios";

const MenuBar = styled(Toolbar)`
  display: flex;
  justify-content: space-around;
  background-color: #f5f5f5;
`

const Content = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const Title = styled.h1``

const AdminPanel = () => {
    const admin = true
    const router = useRouter()
    const [selectedMenu, setSelectedMenu] = useState('profitAll')
    const [stat1, setStat1] = useState([])
    const [stat2, setStat2] = useState([])
    const [stat3, setStat3] = useState([])

    useEffect(() => {
        (async () => {
            const response1 = await axios.get('http://localhost:8080/api/products/top5ByStars')
            const filteredData1 = response1.data.filter(item => item !== null).slice(0, 5)
            setStat1(filteredData1)

            const response2 = await axios.get('http://localhost:8080/api/products/top5ByStat')
            const filteredData2 = response2.data.filter(item => item !== null).slice(0, 5)
            setStat2(filteredData2)

            const response3 = await axios.get('http://localhost:8080/api/catalogs/top5ByStat')
            const filteredData3 = response3.data.filter(item => item !== null).slice(0, 5)
            setStat3(filteredData3)
        })()
    }, [])

    if (!admin) {
        router.push("/404")
        return null
    }

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu)
    }

    const renderContent = () => {
        switch (selectedMenu) {
            case 'profitAll':
                return (
                    <>
                        <Title>Топ 5 продуктов по оценкам</Title>
                            <TableContainer component={Paper} style={{width: "30vw"}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Название продукта</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stat1.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{item.nameProduct}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </>
                )
            case 'profitGames':
                return (
                    <>
                        <Title>Топ 5 продуктов по посещениям</Title>
                        <TableContainer component={Paper} style={{width: "30vw"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Название продукта</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stat2.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{item.nameProduct}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            case 'profitDLC':
                return (
                    <>
                        <Title>Топ 5 каталогов по посещениям</Title>
                        <TableContainer component={Paper} style={{width: "30vw"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Название каталога</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stat3.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{item.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <>
            <MenuBar position="static">
                <Toolbar>
                    <div style={{color: "black"}}>Топ 5 продуктов по оценкам</div>
                    <div style={{color: selectedMenu === 'profitAll' ? 'blue' : 'black', cursor: 'pointer'}}
                         onClick={() => handleMenuClick('profitAll')}>
                        <BarChart/>
                    </div>
                    <div style={{color: "black", marginLeft: "1vw"}}>Топ 5 продуктов по посещениям</div>
                    <div style={{color: selectedMenu === 'profitGames' ? 'blue' : 'black', cursor: 'pointer'}}
                         onClick={() => handleMenuClick('profitGames')}>
                        <BarChart/>
                    </div>
                    <div style={{color: "black", marginLeft: "1vw"}}>Топ 5 каталогов по посещениям</div>
                    <div style={{color: selectedMenu === 'profitDLC' ? 'blue' : 'black', cursor: 'pointer'}}
                         onClick={() => handleMenuClick('profitDLC')}>
                        <BarChart/>
                    </div>
                </Toolbar>
            </MenuBar>
            {renderContent()}
        </>
    )
}

export default AdminPanel