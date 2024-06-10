import { useParams } from "react-router-dom";
import { FaCodeFork, FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import ReactEmbedGist from "react-embed-gist";
import NavBar from "../../components/navbar";
import { useAppSelector } from "../../Store/hooks";
import { useAGist } from "../../services/hooks/useAGist";
import { useStarGist } from "../../services/hooks/useStarGist";
import { useGistFork } from "../../services/hooks/useGistFork";
import { TailSpin } from "react-loader-spinner";
import "./styles.scss";

export default function GistPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const gistDataQueryResponse = useAGist(id);
  const { isStarred, handleStarClick } = useStarGist(id, isAuthenticated);
  const { handleForkClick } = useGistFork(id, isAuthenticated);

  if (gistDataQueryResponse.isLoading) return <div id='spinner-container'><TailSpin color='#003b44'/> </div>
  if (gistDataQueryResponse.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div id="container">

      <NavBar />
      <div id="gistpage-header">
        <div id="user-info">
          <div  id="card-footer">
            <img src={ gistDataQueryResponse.data?.owner?.avatar_url} alt="User" id="user-image" />
            <div id="user-details">
              <span id="user-name">{gistDataQueryResponse.data?.owner?.login}</span>
              <div id="gist-info">
                <span>Created at { gistDataQueryResponse.data?.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="btn-container">

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
              {isStarred ? <FaStar id="filled" /> : <CiStar className="icon" />}
              <h2>star</h2>
            </div>
            <div className="action-times">
              <h2>523</h2>
            </div>
          </button>
        </div>
      </div>

      <div id="gist-content">
        <ReactEmbedGist gist={`${gistDataQueryResponse.data?.owner?.login}/${id}`} titleClass="gist-title" />
      </div>
    </div>
  );
}
