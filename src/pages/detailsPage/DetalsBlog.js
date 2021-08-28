import React,{useEffect,useState} from 'react'
import { useHistory,useParams } from 'react-router-dom';
import './DetailsBlog.css';
import {url} from '../../url';

function DetalsBlog() {

    const [blog,setBlog]=useState({});
    let {id}=useParams();
    const history = useHistory();
    const {title,description,status}=blog;

    useEffect(() => {
        fetch(`${url}/${id}`)
        .then(res => res.json())
        .then (data =>  setBlog(data));
    },[]);

    const deleteHandler = id => {
        if(window.confirm("Are you sure wanted to delete this Blog"))
        {
            fetch(`${url}/${id}`,{
                method:'DELETE'
            })
            history.push("/");
        }
    }

    return (
        <div className="detailsBlog-outer-div">
            <h1>Deatails Page</h1>
            <div className="button-div">
                <button className="home" onClick = {() => history.push(`/`)}>Home</button>
                <button className="delete" onClick = {() => deleteHandler(id)}>Delete</button>
                <button className="edit" onClick = {() => history.push(`/editblog/${id}`)}>Edit</button>
            </div>
            <h1>{title}({status})</h1>
            <p>{description}</p>
            
        </div>
    )
}

export default DetalsBlog
