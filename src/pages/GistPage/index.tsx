import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import ReactEmbedGist from "react-embed-gist";
import { useQuery } from "@tanstack/react-query";
import { forkAGist, getAGist, isGistStarred, starAGist } from "../../services/gistServices";
import { useAppSelector } from "../../Store/hooks";
import { FaCodeFork, FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

import "./styles.scss";
import dayjs from "dayjs";

import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

export default function GistPage() {
  const { id } = useParams();
  const [isStarred, setIsStarred] = useState<boolean>(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const checkIsGistStarred = async () => {
    if (id){
       try {
      const res = await isGistStarred(id);
      if (res.status === 204) {
        setIsStarred(true);
      } else {
        setIsStarred(false);
      }
    } catch (error) {
      toast.error("Error checking if gist is starred");
    }
    }
   
  };

  useEffect(() => {
    if (isAuthenticated)
    {
       checkIsGistStarred();
      }
   
  }, [id,isAuthenticated]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gist", id],
    queryFn: () => getAGist(id),
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  const ownerName = data?.owner?.login;
  const ownerImageUrl = data?.owner?.avatar_url;
  const createdAt = dayjs(data?.created_at).format("YYYY-MM-DD");

  
  const handleForkClick = async () => {
    if (isAuthenticated) {
      if (id) {
        try {
          const res = await forkAGist(id);
          if (res.status === 201) {
            toast.success('Forked successfully!');
          } else if (res.status === 403) {
            toast.error('Request Forbidden');
          } else if (res.status === 404) {
            toast.error('Resource not found!');
          } else if (res.status === 422) {
            toast.error('Endpoint spammed');
          }
        } catch (error) {
          toast.error('Sorry, cannot fork your own gist');
        }
      }
    } else {
      toast.info('Please log in to your account first!');
    }
  };


  const handleStarClick = async () => {
    if (isAuthenticated) {
      if (id) {
        try {
          const res = await starAGist(id);
          if (res.status === 204) {
            setIsStarred(true);
            toast.success('Starred successfully!');
          } else if (res.status === 304) {
            toast.error('Action not done');
          } else if (res.status === 404) {
            toast.error('Resource not found!');
          } else if (res.status === 403) {
            toast.error('Request Forbidden');
          }
        } catch (error) {
          toast.error("Action not performed");
        }
      }
    } else {
      toast.info('Please authenticate first');
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
              <span className="user-name">{ownerName}</span>
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
        <ReactEmbedGist gist={`${ownerName}/${id}`} titleClass="gist-title" />
      </div>
    </div>
  );
}
