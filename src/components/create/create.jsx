import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './create.css';

const CreateRecipe = ()=> {
    const navigate = useNavigate()
    const [detail , setDetail] = useState({title:"" , author:"" , image:"" , ingredients:[] , directions:""})

    async function  handleCreate(e){

    // e.preventDefault();

        await fetch("http://localhost:9000/api/v1/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(detail),
            }).then(res => {
                // console.log(res)
                navigate("/recipes")
            }).catch(e => {
                console.log("errr>>> " + e.message);
            })
    }
    return (
        <div className="main-content1">
            <h1>Create a recipe</h1>
            <p>Share a recipe with the club by completing the form below</p>
            <div>
                <label htmlFor="">Recipe Title</label>
                <input type="text" onChange={(e)=>{setDetail({...detail , title:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="">Author</label>
                <input type="text" onChange={(e)=>{setDetail({...detail , author:e.target.value})}}/>
            </div>  <div>
                <label htmlFor="">Please upload your image or paste url link</label>
                <input type="text" onChange={(e)=>{setDetail({...detail , image:e.target.value})}}/>
            </div>  <div>
                <label htmlFor="">Ingredients</label>
                <input type="text" onChange={(e)=>{setDetail({...detail , ingredients:e.target.value})}}/>
            </div>  <div>
                <label htmlFor="">Reciipe Direction</label>
                <input type="text" onChange={(e)=>{setDetail({...detail , directions:e.target.value})}}/>
            </div>
            <button onClick={()=>{handleCreate()}} className='btn1'>Create</button>
        </div>
    )
}

export default CreateRecipe;