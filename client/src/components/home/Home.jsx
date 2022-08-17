import React, {useState} from 'react';
import SearchBar from '../search_bar/SearchBar'
import Cards from './../cards/Cards';
import style from './Home.module.scss'


const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);

    return(
        <div className={style.homeContainer}>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Cards currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}


export default Home;