import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export function DartsSinglePage() {
    const params = useParams();
    const id = params.dartsId;
    const[darts,setDarts] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
                axios.get(`https://darts.sulla.hu/darts/${id}`)
                .then((res) => res.data)
                .then((data) => setDarts(data))
                .catch(console.log)
                .finally(() => {
                    setPending(false);
                });   
            } 
, [id]);    
 

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !darts.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Dartsozó neve: {darts.name}</h5>
                                <div className="lead">Születési dátuma: {darts.birth_date}</div>
                                <div className="lead">Nyert világbajnokságok: {darts.world_ch_won}</div> <br />
                                <div><NavLink to={darts.profile_url}  target="_blank" className={"btn btn-success"}>Profile link</NavLink></div><br/>
                                    <img alt={darts.name}
                                    className="img-fluid rounded"
                                    style={{maxHeight: "300px"}}
                                    src={darts.image_url ? darts.image_url : 
                                    "https://via.placeholder.com/400x800"} 
                                    />
                                  </div>
                                  
                                  <div>
                                  <NavLink key="y" to={"/darts/" + darts.id} className={"btn btn-primary"}><i class="bi bi-info-circle"></i></NavLink>&nbsp;&nbsp;
                                  <NavLink key="x" to={"/mod-darts/" + darts.id} className={"btn btn-warning"}><i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                  <NavLink key="y" to={"/del-darts/" + darts.id} className={"btn btn-danger"}><i className="bi bi-trash3"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}
export default DartsSinglePage;
