import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import NavBar from '../../components/navbar';
import GistCard from '../../components/gistCard';
import DataTable from '../../components/dataTable';
import { IGistsdata } from '../../types/types';
import grid from './../../assets/layout.png';
import table from './../../assets/list.png';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import { usePagination } from '../../services/hooks/usePagination';
import { usePublicGistsData } from '../../services/hooks/usePublicGistData';
import NoResultsFound from '../../components/notFound';

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import { TailSpin } from "react-loader-spinner";

export default function HomePage() {
  
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 8;
  const [layout, setLayout] = useState('tabular');
  const isAuthenticated = false; 

  const publicGistResponse = usePublicGistsData(isAuthenticated);

  const pagination = usePagination(filteredData, itemsPerPage);

  useEffect(() => {
    if (publicGistResponse.data) {
      setFilteredData(publicGistResponse.data);
      pagination.setCurrentPage(1);
    }
  }, [publicGistResponse.data, pagination.setCurrentPage]);

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
  };

  const handleSearchText = (text: string) => {
    const temp = publicGistResponse.data.filter((gist) => {
      return gist.fileName.filename.toLowerCase() === text.toLowerCase();
    });

    if (temp.length === 0 && text) {
      toast.warn('No results found.');
      setFilteredData([]);
    } else {
      setFilteredData(temp);
    }
    pagination.setCurrentPage(1);
  };

  if (publicGistResponse.isLoading) {
    return <div id='spinner-container'><TailSpin color='#003b44'/> </div>
  }

  if (publicGistResponse.isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container">
      <NavBar setSearchText={handleSearchText} />
      
      <div className="layout-manager">
        <h2>Public Gists</h2>
        <div>
          <button className="icon-btn" onClick={() => handleLayoutChange('tabular')}>
            <img src={grid} alt="table" className="icon" />
          </button>
          <button className="icon-btn" onClick={() => handleLayoutChange('grid')}>
            <img src={table} alt="card" className="icon" />
          </button>
        </div>
      </div>
      
      {filteredData.length === 0 ? (
        <NoResultsFound/>
      ) : layout === 'tabular' ? (
        filteredData && <DataTable data={filteredData} />
      ) : (
        <div className="cardLayout">
          <div className="grid-container">
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
      )}
    </div>
  );
}
