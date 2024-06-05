import { useState } from "react";
import NavBar from "../../components/Navbar";
import { useQuery } from '@tanstack/react-query';
import { getGistsApiCall } from "../../services/gistServices";
import { getFilteredResults } from "../../utils/queries";
import GistCard from "../../components/gistCard";
import { IGistsdata } from "../../types/types";

import "./styles.scss"

const itemsPerPage = 2; 
const user = JSON.parse(localStorage.getItem("user"));


export default function MyGists() {
  const [currentPage, setCurrentPage] = useState(1);
 
  const { data, isLoading, isError } = useQuery({
    queryKey: ['gists'],
    queryFn: getGistsApiCall,
    select: getFilteredResults,
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div id="container">
      <NavBar />
      <div className="myGistsContainer">
        <div className="personal-info-container">
          <img src="https://avatars.githubusercontent.com/u/169022063?s=400&u=bac1bf25039c7f2adbd1ec36c5b9274d88315617&v=4" alt="userImage" />
          <h2>{user.displayName}</h2>
          <button className="profile-btn">View GitHub Profile</button>
        </div>
        <div className="userGistData">
          <div id="gist-num">
            <h2>All Gists</h2>
            <div className="num"><p>{data.length}</p></div>
          </div>
          <div>
            {
              <div >
                <div>
                  {selectedData.map((gist: IGistsdata) => (
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
                <div className="pagination" >
                  <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &lt;
                  </button>
                  <span> Page {currentPage} of {totalPages} </span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt;
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
