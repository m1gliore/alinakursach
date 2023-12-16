import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, wrapper} from '../redux/store';
import Head from "next/head";
import Layout from "../components/Layout";
import CurrencyContext from "../context/CurrencyContext";

const App = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Head>
                    <title>Alina Kursach</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                <CurrencyContext.Consumer>
                    {(currency) => (
                        <Layout>
                            <Component {...props} currency={currency} />
                        </Layout>
                    )}
                </CurrencyContext.Consumer>
            </PersistGate>
        </Provider>
    )
}

export default App
