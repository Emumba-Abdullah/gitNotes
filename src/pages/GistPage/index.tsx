import { useParams } from 'react-router-dom';
import NavBar from "../../components/Navbar";
import ReactEmbedGist from 'react-embed-gist';
import { useQuery } from '@tanstack/react-query';
import { forkAGist, getAGist, starAGist } from '../../services/gistServices';
import { useAppSelector } from '../../Store/hooks';

import "./styles.scss"

export default function GistPage() {
  const { id } = useParams();

  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gist', id],
    queryFn: () => getAGist(id),
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;
  
  const ownerName = data.owner.login;

  const handleForkClick = async() => {
    if (isAuthenticated) {
      if (id)
      {
      const res = await forkAGist(id);
        console.log(res);
        alert(res.status)
      }
      
    } else {
      alert("You need to authenticate first")
    }
  }

  const handleStarClick = async() => {
      if (isAuthenticated) {
      if (id)
      {
      const res = await starAGist(id);
        console.log(res);
        alert(res.status)
      }
      
    } else {
      alert("You need to authenticate first")
    }
  }


  return (
    <div className="container">
      <NavBar />
      <button onClick={handleForkClick}>
        fork
      </button>
      <button onClick={handleStarClick}>
        star
      </button>
      <div className='gist-content'>
          <ReactEmbedGist
        gist={`${ownerName}/${id}`}
        titleClass="gist-title"
      />
      </div>
    
    </div>
  );
}
