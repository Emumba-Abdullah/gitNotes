import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import ReactEmbedGist from "react-embed-gist";
import { useQuery } from "@tanstack/react-query";
import { forkAGist, getAGist, starAGist } from "../../services/gistServices";
import { useAppSelector } from "../../Store/hooks";
import { FaCodeFork } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

import "./styles.scss";
import dayjs from "dayjs";

export default function GistPage() {
  const { id } = useParams();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gist", id],
    queryFn: () => getAGist(id),
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  const ownerName = data.owner.login;
  const ownerImageUrl = data.owner.avatar_url;
  const createdAt = dayjs(data.created_at).format("YYYY-MM-DD");

  const handleForkClick = async () => {
    if (isAuthenticated) {
      if (id) {
        const res = await forkAGist(id);
        console.log(res);
        alert(res.status);
      }
    } else {
      alert("You need to authenticate first");
    }
  };

  const handleStarClick = async () => {
    if (isAuthenticated) {
      if (id) {
        const res = await starAGist(id);
        console.log(res);
        alert(res.status);
      }
    } else {
      alert("You need to authenticate first");
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="gistpage-header">
        <div className="user-info">
        <div className="card-footer">
        <img src={ownerImageUrl} alt="User" className="user-image" />
        <div className="user-details">
          <span className="user-name">{ownerName}</span>{" "}
          <div className="gist-info">
            <span>Created at {createdAt}</span>
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
              <CiStar className="icon" /> <h2>star</h2>
            </div>
            <div className="action-times">
              <h2>523</h2>
            </div>
          </button>
        </div>
      </div>

      <div className="gist-content">
        <ReactEmbedGist gist={`${ownerName}/${id}`} titleClass="gist-title" />
      </div>
    </div>
  );
}

//<CiStar />
