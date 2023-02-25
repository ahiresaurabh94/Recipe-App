import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandImage from "../expand/expand";
import './recipe.css'


const Recipe = () => {

    const [recipe, setRecipe] = useState("")
    const [info, setData] = useState()
    const [expand, setExpand] = useState(false)
  const [showLogout, setShowLogout] = useState(false);

    const navigate = useNavigate()



    useEffect(() => {
        fetch(`http://localhost:9000/api/v1/product/${recipe}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: token,
            },
        })
            .then((response) => {
                // if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setData(data.products);
                ///console.log(data);
            });
    }, [recipe]);

    const detail = (data)=>{
        setExpand(!expand)
        let details = data
    }

    const changeHandler = () => {
        setShowLogout(!showLogout);
      };
      
      const logoutHandler = () => {
        localStorage.clear();
        navigate("/");
      };

    return (
        <div>
            {expand ? (<ExpandImage detail={detail}/>) : (
                <div className="main-content">
                    <div className="inp">

                        <h1 onClick={changeHandler  }>Recipe App</h1>
                        {showLogout && (
                            <div onClick={logoutHandler} className="logout">
                                Logout
                            </div>
                        )}
                        <input type="text" placeholder="Enter Recipe" onKeyUp={(e) => { setRecipe(e.target.value) }} />
                    </div>
                    <div>
                        <div className="new">
                            <button onClick={() => { navigate('/buildRecipe') }}>New</button>
                        </div>
                        <div>

                            <h3>All Recipies</h3>
                            {info?.map((data, i) => {
                                return (
                                    <div key={i} className="img-content" >
                                        <img src={data.image} alt="img-i" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}

export default Recipe;