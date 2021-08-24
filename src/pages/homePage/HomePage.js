import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useHistory } from 'react-router-dom';

const url= "http://localhost:1000/blog";


function HomePage() {
    const [blogs,setBlogs]=useState([]);
    const [searchValue, setSearchValue] = useState("");
    let history = useHistory();
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then (data =>  setBlogs(data));
    },[]);
        


    const SearchHandler = (e) =>{
        e.preventDefault();
        blogs.map((blog) => {
          if(blog.title === searchValue)
          {
            history.push(`/detailsblog/${blog.id}`); 
          }
        });
    };
        const list = blogs.map( (blog) => {
            return (<div key={blog.id} className="blog-outer-div">
                        <h2>{blog.title}</h2>
                        <button onClick = {() => history.push(`/detailsblog/${blog.id}`)}>Details</button>
                    </div>)
        });

        console.log(list);
    return (
        <div>
            <h1>Home Page</h1>
            <div className="blog-inner-div">
                <form>
                    <input placeholder="Search By Title" value ={searchValue}  onChange={(e) => {setSearchValue(e.target.value)}} required/>
                    <button type="submit" onClick={SearchHandler}>Search</button>
                </form>
                <button className="creat-button" type="submit" onClick={() => {history.push("/addblog")}}>Create New Blog</button>
            </div>
            {list}
        </div>
    )
}

export default HomePage
