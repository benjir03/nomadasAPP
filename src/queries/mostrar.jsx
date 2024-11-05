const { default: axios } = require("axios");
const { useState, useEffect } = require("react");
const { Link } = require("react-router-dom");

const URI = "http:://localhost/8000/blogs/"

const CompShowBlogs = () => {
    const[blogs, setBlog] = useEffect([])
    useEffect(() =>{
        getBlogs()
    },[])
    
    const getBlogs = async () => {
        const res = await axios.get(URI)
        setBlog(res.data)
    }
    
    const deleteBlogs = async (id) => {
    
    }
    
    return(
        <div>
            
        </div>
    )
}

export default CompShowBlogs