import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsListPage = () => {
  const [darts, setDarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://darts.sulla.hu/darts')
      .then(response => {
        setDarts(response.data);
      })
      .catch(error => {
        console.error("Hiba történt az adatok betöltésekor", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div role="status" className="spinner-border text-primary">
        <span className="visually-hidden">Betöltés...</span>
      </div>
    );
  }

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      <h2>Dartsozók</h2>
      {darts.map(dart => (
        <div key={dart.id} data-testid="dart-card" className="card col-sm-3 d-inline-block m-1 p-2">
          <p className="text-dark">Dartsozó neve: {dart.name}</p>
          <p className="text-danger">Születési éve: {dart.birth_date}</p>
          <p className="text-danger">Nyert világbajnokságai: {dart.world_ch_won}</p>

          <div className="card-body">
            {/* Külső vagy belső link megfelelő kezelése */}
            <a 
              href={dart.profile_url} 
              className="btn btn-success"
              {...(dart.profile_url.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Profile link
            </a>

            <br /><br />

            {/* Kép kezelése: ha nincs megadva, akkor placeholder */}
            <Link to={`/darts/${dart.id}`}>
              <img
                alt={dart.name}
                className="img-fluid"
                src={dart.image_url || 'https://via.placeholder.com/400x800'}
                style={{ maxHeight: "200px" }}
              />
            </Link>

            <br /><br />

            {/* Gombok a részletek, szerkesztés és törlés funkciókhoz */}
            <Link to={`/darts/${dart.id}`} className="btn btn-primary" aria-label="Részletek">
              <i className="bi bi-info-circle" /> Részletek
            </Link>

            <Link to={`/mod-darts/${dart.id}`} className="btn btn-warning" aria-label="Szerkesztés">
              <i className="bi bi-pencil" /> Szerkesztés
            </Link>

            <Link to={`/del-darts/${dart.id}`} className="btn btn-danger" aria-label="Törlés">
              <i className="bi bi-trash3" /> Törlés
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
