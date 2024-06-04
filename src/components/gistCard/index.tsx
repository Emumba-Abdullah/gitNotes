import "highlight.js/styles/default.css";
import "./styles.scss";
import ReactEmbedGist from 'react-embed-gist';
import { useNavigate } from "react-router-dom";
import { IGistsdata } from "../../types/types";

export default function GistCard({
  id,
  ownerName,
  ownerImageUrl,
  gistName,
  createdAt,
}:IGistsdata) {

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gist/${id}`)
  }

  return (
    <div className="card" onClick={handleCardClick}> 
      <div className="card-content">
       
        <ReactEmbedGist
          gist={`${ownerName}/${id}`}
          titleClass="gist-title"
        />
      </div>
      <div className="card-footer">
        <img src={ownerImageUrl} alt="User" className="user-image" />
        <div className="user-details">
          <span className="user-name">{ownerName}</span>{" "}
          <span className="gist-name">{gistName}</span>
          <div className="gist-info">
            <span>Created at {createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
