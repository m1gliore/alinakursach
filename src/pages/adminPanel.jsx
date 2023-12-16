import {useRouter} from "next/router";
import {useState} from 'react';
import styled from 'styled-components';
import {Box, AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import {BarChart, PieChart, ShowChart} from '@mui/icons-material';
import {Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie} from 'recharts';

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
                const allData = [
                    {name: 'Продукт 1', profit: 500},
                    {name: 'Продукт 2', profit: 800},
                    {name: 'Продукт 3', profit: 1200}
                ]

                return (
                    <>
                        <Title>Прибыль по всему</Title>
                        <Content>
                            <RechartsBarChart width={400} height={300} data={allData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="profit" name="Прибыль" fill="#8884d8"/>
                            </RechartsBarChart>
                        </Content>
                    </>
                )
            case 'profitGames':
                const gamesData = [
                    {name: 'Game 1', profit: 200},
                    {name: 'Game 2', profit: 600},
                    {name: 'Game 3', profit: 900}
                ]

                return (
                    <>
                        <Title>Прибыль по продуктам</Title>
                        <Content>
                            <RechartsBarChart width={400} height={300} data={gamesData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="profit" fill="#8884d8"/>
                            </RechartsBarChart>
                        </Content>
                    </>
                )
            case 'profitDLC':
                const dlcData = [
                    {name: 'DLC 1', profit: 100},
                    {name: 'DLC 2', profit: 300},
                    {name: 'DLC 3', profit: 500}
                ]

                return (
                    <>
                        <Title>Прибыль по товарам</Title>
                        <Content>
                            <RechartsBarChart width={400} height={300} data={dlcData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="profit" fill="#8884d8"/>
                            </RechartsBarChart>
                        </Content>
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
                    <div style={{color: "black"}}> Прибыль по всему</div>
                    <div style={{color: selectedMenu === 'profitAll' ? 'blue' : 'black', cursor: 'pointer'}}
                         onClick={() => handleMenuClick('profitAll')}>
                        <BarChart/>
                    </div>
                    <div style={{color: "black", marginLeft: "1vw"}}> Прибыль по продуктам</div>
                    <div style={{color: selectedMenu === 'profitGames' ? 'blue' : 'black', cursor: 'pointer'}}
                         onClick={() => handleMenuClick('profitGames')}>
                        <BarChart/>
                    </div>
                    <div style={{color: "black", marginLeft: "1vw"}}> Прибыль по товарам</div>
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