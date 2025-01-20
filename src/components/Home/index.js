import './index.css';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinnerComponent from 'react-spinners-components';
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
const status = {
    initial:'INITIAL',
    failure:'FAILURE',
    loading:'LOADING',
    success:'SUCCESS'
}
const Home = () =>
{
    const [activeState,setActiveState] = useState(status.loading);
    const [responseData,setResponseData] = useState([]);
    const [search,setSearch] = useState('');
    const [sortItem,setSort] = useState('ASC');
    const [darkmode,setDarkMode] = useState(false);
    useEffect(()=>
    {
        const fetchFunction= async ()=>
            {
                setActiveState(status.loading);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if(response.ok)
                {
                    const data = await response.json();
                    setActiveState(status.success);
                    setResponseData(data);
                    console.log(data);
                }
                else
                {
                    setActiveState(status.failure);
                }
            }
            fetchFunction();
    },[]);
    console.log(activeState)
    const failureState = ()=>
    {
        return (
            <div className='failure-container'>
                <h1 className='failure-heading'>Page Not Found</h1>
            </div>
        )
    }
    const loadingState = ()=>
    {
        return (
            <div className='loader-container'>
                <LoadingSpinnerComponent type={ 'Infinity' } color={ 'black' } size={ '150px' } />
            </div>
        )
    }
    const successState = ()=>
    {
        const filteredList = responseData.filter((item)=>
        {
            if(item.name.toLowerCase().includes(search.toLowerCase()))
            {
                return item;
            }
        })
        const sortedList = (sortItem==='ASC')?[...filteredList].sort((a, b) =>
            a.name > b.name ? 1 : -1,
          ): [...filteredList].sort((a, b) =>
            a.name > b.name ? -1 : 1,
          );
        return (
            <div className={darkmode?'dark-background':'home-container'}>
                <div className='header'>
                    <h1 className={darkmode&&'dark'}>Users</h1>
                    <form className='form-container'>
                    <button className='mode-btn' onClick={(event)=>{ event.preventDefault(); setDarkMode(prevState=>!prevState)}}>{darkmode?<FiSun className='sun'/>:<FaMoon/>}</button>
                        <input placeholder='Search' value={search} className='search-input' onChange={(event)=>{setSearch(event.target.value)}}/>
                        <select className='filter-input' value={sortItem} onChange={(event)=>{setSort(event.target.value)}}>
                            <option value="ASC">A-Z</option>
                            <option value="DESC">Z-A</option>
                        </select>
                    </form>
                </div>
                <ul className='users-list'>
                    {
                        (sortedList.length===0)?(
                            <div className='no-users-found'>
                                <p>No Users Found</p>
                            </div>
                        ):
                        sortedList.map((item)=>
                        {
                            return(
                                <Link to={`/${item.id}`} className='link'>
                                    <li className='users-list-item'>
                                        <h1 className='name'><span className={darkmode?'dark':'name-span'}>Name  : </span>{item.name}</h1>
                                        <p className='email'><span className={darkmode?'dark':'email-span'}>Email : </span>{item.email}</p>
                                        <p className='city'><span className={darkmode?'dark':'city-span'}>City   : </span>{item.address.city}</p>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    switch(activeState)
    {
        case (status.failure):
            return failureState();
        case (status.loading):
            return loadingState();
        case (status.success):
            return successState();
        default:

    }
}
export default Home