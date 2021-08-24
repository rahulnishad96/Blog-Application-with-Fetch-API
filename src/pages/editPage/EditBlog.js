import React,{useState,useEffect} from 'react'
import { useHistory,useParams} from 'react-router-dom';

function EditBlog() {
    const url='http://localhost:1000/blog';
    const initaiState={
        title:"",
        description:"",
        status:"",
    };
    const [state, setstate] = useState(initaiState);
    const [blog,setBlog]=useState({});
    let {id}=useParams();
    const [error, setError] = useState("");
    const history = useHistory();
    const {title,description,status}=state;

    useEffect(() => {
        fetch(`${url}/${id}`)
        .then(res => res.json())
        .then (data =>  setBlog(data));
    },[]);

    useEffect(() => {
        console.log(blog);
        if(blog){
            setstate({...blog});
        }
        console.log(state);
    },[blog]);

    const inputChangeHandler = (e) => {
        console.log("changed");
        let {name,value} = e.target;
        setstate({
            ...state,
            [name]: value
        })
        console.log(state);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submited");
        
        if(!title || !description || !status ){
            console.log("fill ");
            setError("Please fill all input Feild");
        }
        else
        {
            fetch(`${url}/${id}`,{
                method:"PUT",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(state)
            })
            .then(res => res.json())
            .then (console.log("updated"));;
            history.push("/");
            setError("");
            setstate(initaiState);
        }
    };

    return (
        <div className="add-page">
            <h1>Edit Page</h1>
            {error && <h2 style={{color:"red"}}>{error}</h2>}
            <form onSubmit={submitHandler}>
                <label for="title">Title : </label>
                <input className="title" type="text" placeholder="Enter Title..." name="title" value={title || ""} onChange={inputChangeHandler} /><br/>
                <label for="description">Description : </label>
                <input className="description" type="textarea" placeholder="Enter Description..." name="description" value={description || ""} onChange={inputChangeHandler} /><br/>
                <label for="status">Choose Blog Status : </label>
                <select className="status" name="status" onChange={inputChangeHandler} >
                    <option value="Comming">Comming</option>
                    <option value="Procesing">Procesing</option>
                    <option value="Ended">Ended</option>
                </select><br/>

                <button type="submit" >Update Blog</button>
            </form>
        </div>
    )
}

export default EditBlog
