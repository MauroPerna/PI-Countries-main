import React from 'react';
import SearchBar from '../search_bar/SearchBar'
import Cards from './../cards/Cards';
import style from './Home.module.scss'


const Home = () => {
    return(
        <div className={style.homeContainer}>
            <SearchBar/>
            <Cards/>
        </div>
    )
}


export default Home;