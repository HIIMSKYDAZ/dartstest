import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import {DartsListPage} from "./DartsListPage";
import { DartsCreatePage } from "./DartsCreatePage";
import { DartsModPage } from "./DartsModPage";
import { DartsDelPage } from "./DartsDelPage";
import { DartsSinglePage } from "./DartsSinglePage";
import './App.css';

export const App =()=> {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Darts</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/uj-darts'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új Dartsozó felvitele</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<DartsListPage />} />
        <Route path="/uj-darts" exact element={<DartsCreatePage />} />
        <Route path="/mod-darts/:dartsId" exact element={<DartsModPage />} />
        <Route path="/del-darts/:dartsId" exact element={<DartsDelPage />} />
        <Route path="/darts/:dartsId" exact element={<DartsSinglePage />} />
      </Routes>
    </Router>
  );
};