import React from "react";
import { Link } from "react-router-dom";

const HeaderCategory = ({ dataAlbum }) => {
  //mini composant Dot pour les points
  const Dot = () => <span className="mx-2">&#8226;</span>;

  return (
    <div className="flex items-center justify-start mt-4">
     
      {dataAlbum?.genre &&
        dataAlbum?.genre.map((category, index) =>
          //si c'est le premier element on ne met pas de Dot devant
          index == 0 
          ? 
            <Link to={"#"} key={index} className="font-medium">{category.label}</Link>
           : 
            <div className="flex" key={index}><Dot /><Link to={"#"} className="font-medium">{category.label}</Link></div>
          
        )}
    </div>
  );
};

export default HeaderCategory;
