import { useEffect, useState } from 'react';
import NavBar from '../../components/navbar';
import GistCard from '../../components/gistCard';
import { IGistsdata } from '../../types/types';
import './styles.scss';

import { usePagination } from '../../services/hooks/usePagination';
import { usePublicGistsData } from '../../services/hooks/usePublicGistData';

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;
const itemsPerPage = 2;
const isAuthenticated = true;

export default function MyGists() {
  const [filteredData, setFilteredData] = useState([]);

  const publicGistData = usePublicGistsData(isAuthenticated);
   
  const pagination = usePagination(filteredData, itemsPerPage);

  useEffect(() => {
    if (publicGistData.data) {
      setFilteredData(publicGistData.data);
    }
  }, [publicGistData.data]);

  if (publicGistData.isLoading) {
    return <div id='spinner-container'><TailSpin color='#003b44'/> </div>
  }

  if (publicGistData.isError) {
    return <h1>Error loading data!!!</h1>;
  }

  return (
    <div id="container">
      <NavBar />
      
      <div className="myGistsContainer">
        <div className="personal-info-container">
          <img src="https://avatars.githubusercontent.com/u/169022063?s=400&u=bac1bf25039c7f2adbd1ec36c5b9274d88315617&v=4" alt="userImage" />
          <h2>{parsedUser?.displayName}</h2>
          <button className="profile-btn">View GitHub Profile</button>
        </div>
        
        <div className="userGistData">
          <div id="gist-num">
            <h2>All Gists</h2>
            <div className="num"><p>{publicGistData.data.length}</p></div>
          </div>
          
          <div>
            {pagination.selectedData.map((gist: IGistsdata) => (
              <GistCard
                key={gist.id}
                id={gist.id}
                ownerName={gist.ownerName}
                ownerImageUrl={gist.ownerImageUrl}
                gistName={gist.gistName}
                createdAt={gist.createdAt}
              />
            ))}
          </div>
          
          <div className="pagination">
            <button onClick={pagination.handlePrevPage} disabled={pagination.currentPage === 1}>
              <MdOutlineNavigateBefore/>
            </button>
            <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
            <button onClick={pagination.handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
               <MdOutlineNavigateNext/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
