import "highlight.js/styles/default.css";
import "./styles.scss";
import { IGistCardProps } from "../../types/types";
import ReactEmbedGist from 'react-embed-gist';
import { useNavigate } from "react-router-dom";

export default function GistCard({
  id,
  OwnerName,
  OwnerImageURL,
  gistName,
  createdAt,
  gitDescripton,
}: IGistCardProps) {

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gist/${id}`)
  }

  return (
    <div className="card" onClick={handleCardClick}> 
      <div className="card-content">
       
        <ReactEmbedGist
          gist={`${OwnerName}/${id}`}
          titleClass="gist-title"
        />
      </div>
      <div className="card-footer">
        <img src={OwnerImageURL} alt="User" className="user-image" />
        <div className="user-details">
          <span className="user-name">{OwnerName}</span>{" "}
          <span className="gist-name">{gistName}</span>
          <div className="gist-info">
            <span>Created at {createdAt}</span>
            <span>{gitDescripton}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
