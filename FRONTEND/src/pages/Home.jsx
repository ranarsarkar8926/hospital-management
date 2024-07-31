import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessegeForm from '../components/MessegeForm';

const Home=()=>{
    return(
    <>
        <Hero
            title={"Welcome to ABC Hostpital"}
            imageUrl={"/hero.png"}
        />
        <Biography
            imageUrl={"/about.png"}    
        />
        <Departments/>
        <MessegeForm/>
    </>
    )
}
export default Home;