import { useParams } from "react-router-dom";
import { FaCodeFork, FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import ReactEmbedGist from "react-embed-gist";
import NavBar from "../../components/navbar";
import { useAppSelector } from "../../Store/hooks";
import { useAGist } from "../../services/hooks/useAGist";
import { useStarGist } from "../../services/hooks/useStarGist";
import { useGistFork } from "../../services/hooks/useGistFork";
import "./styles.scss";

export default function GistPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const gistDataQueryResponse = useAGist(id);
  const { isStarred, handleStarClick } = useStarGist(id, isAuthenticated);
  const { handleForkClick } = useGistFork(id, isAuthenticated);

  if (gistDataQueryResponse.isLoading) return <h1>Loading....</h1>;
  if (gistDataQueryResponse.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div className="container">
      <NavBar />
      <div className="gistpage-header">
        <div className="user-info">
          <div className="card-footer">
            <img src={ gistDataQueryResponse.data?.owner?.avatar_url} alt="User" className="user-image" />
            <div className="user-details">
              <span className="user-name">{gistDataQueryResponse.data?.owner?.login}</span>
              <div className="gist-info">
                <span>Created at { gistDataQueryResponse.data?.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button onClick={handleForkClick} className="btn">
            <div className="icon-text">
              <FaCodeFork className="icon" /> <h2>fork</h2>
            </div>
            <div className="action-times">
              <h2>18</h2>
            </div>
          </button>

          <button onClick={handleStarClick} className="btn">
            <div className="icon-text">
              {isStarred ? <FaStar className="filled" /> : <CiStar className="icon" />}
              <h2>star</h2>
            </div>
            <div className="action-times">
              <h2>523</h2>
            </div>
          </button>
        </div>
      </div>

      <div className="gist-content">
        <ReactEmbedGist gist={`${gistDataQueryResponse.data?.owner?.login}/${id}`} titleClass="gist-title" />
      </div>
    </div>
  );
}
