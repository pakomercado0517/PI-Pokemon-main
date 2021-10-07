import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

const IndexPage = () => {
  return (
    <div>
      <div className="lp_container">
        <h1>Bienvenido a Pokémons Henry's App</h1>
        <h3>
          En nuestra App, podrás ver, crear y buscar a los Pokémones que más te
          agraden.{" "}
        </h3>
        <h4>Agradecemos que hagas uso de nuestra App.</h4>
        <img
          src="http://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif"
          alt="lp_img"
        />
        <hr />
        <div className="lp_button_container">
          <NavLink to="/home">
            <h2 className="lp_button">Para iniciar. Haz click aquí...</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
// http://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif
// https://images.chesscomfiles.com/uploads/v1/group/76962.73d2aef4.50x50o.05adf4794fcc.gif

export default IndexPage;
