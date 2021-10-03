import React from 'react'
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import Product from './Product';
import Preorder from './Preorder';
import ProductInfo from './ProductInfo';
import Navbar from "../components/Navbar";
import Cart from './Cart';
import Payment from './Payment';
import Promotion from './Promotion';
import Brand from './Brand';
import BrandProduct from './BrandProduct';
import Category from './Category';
import Home2 from './Home2';


function Home() {
    return (
        <>
        <Navbar />
            <Router>
                <Switch>
                    <Route path='/' exact  component={Home2} />
                    <Route path='/Home' exact  component={Home2} />
                    <Route path='/Home/Product'  component={Product} />
                    <Route path='/Home/Preorder'  component={Preorder} />
                    <Route path='/Home/ProductInfo'  component={ProductInfo} />
                    <Route path='/Home/Cart'   component={Cart}/> 
                    <Route path='/Home/Payment'   component={Payment}/>
                    <Route path='/Home/Promotion'  component={Promotion} />
                    <Route path='/Home/Brand'  component={Brand} />
                    <Route path='/Home/BrandProduct'  component={BrandProduct} />
                    <Route path='/Home/Category'  component={Category} />
                </Switch>
            </Router>

        
        </>
    )
}

export default Home