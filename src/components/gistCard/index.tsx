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
    <div id="card" onClick={handleCardClick}> 
      <div id="card-content">
        <ReactEmbedGist
          gist={`${ownerName}/${id}`}
          titleClass="gist-title"
        />
      </div>
      <div id="card-footer">
        <img src={ownerImageUrl} alt="User" id="user-image" />
        <div id="user-details">
          <span id="user-name">{ownerName}</span>{" "}
          <span id="gist-name">{gistName}</span>
          <div id="gist-info">
            <span>Created at {createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
