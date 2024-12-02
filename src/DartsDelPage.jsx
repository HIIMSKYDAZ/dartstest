import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsDelPage=()=> {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const[chess,setChess] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://darts.sulla.hu/darts/${id}`)
            const chess = await res.json();
            setChess(chess);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);
 return (
    <div className="p-5 m-auto text-center content bg-lavender">
        {isPending || !chess.id ? (
            <div className="spinner-border"></div>
        ) : (
                        <div className="card p-3">
                            <div className="card-body">
                            <h5 className="card-title">Törlendő elem: {chess.name}</h5>
                            <div className="lead">Születési éve: {chess.birth_date}</div>
                            <div className="lead">Nyert világbajnokságok: {chess.world_ch_won}</div>
                            <div className="lead">Profil: {chess.profile_url}</div>
                                <img alt={chess.name}
                                className="img-fluid rounded"
                                style={{maxHeight: "500px"}}
                                src={chess.image_url ? chess.image_url : 
                                "https://via.placeholder.com/400x800"} 
                                />
                              </div>
                              <form onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`https://darts.sulla.hu/darts/${id}`, {
                method: "DELETE",
            }).then(() => {
                navigate("/");
            })
            }}>
                              <div>
<NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
&nbsp;&nbsp;
<button type='submit' className="bi bi-trash3">&nbsp;Törlés</button></div></form>   
                        </div>
                    
                )}
            </div>
        );
};
