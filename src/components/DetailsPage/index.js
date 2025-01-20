import './index.css';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinnerComponent from 'react-spinners-components';
const status = {
    initial:'INITIAL',
    failure:'FAILURE',
    loading:'LOADING',
    success:'SUCCESS'
}
const DetailsPage = (props) =>
{
    const {match} = props;
    const {params} = match;
    const {id} = params
    const [activeState,setActiveState] = useState(status.loading);
    const [responseObject,setResponseData] = useState([]);
    useEffect(()=>
    {
        const fetchFunction= async ()=>
            {
                setActiveState(status.loading);
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
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
        return (
            <div className='details-container'>
                <Link to="/"><button className='back-btn'>back</button></Link>
                <div className='content'>
                    <div className='content-div'>
                    <h1 className='details-name-head'>Name : {responseObject.name}</h1>
                    <p className='deatils-para'><b>Email :</b> {responseObject.email}</p>
                    <p className='deatils-para'><b>phone :</b> {responseObject.phone}</p>
                    <p className='deatils-para'><b>Company Name :</b> {responseObject.company.name}</p>
                    <p className='deatils-para'><b>Website :</b> <a href={responseObject.website}>{responseObject.website}</a></p>
                    </div>
                </div>
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
export default DetailsPage