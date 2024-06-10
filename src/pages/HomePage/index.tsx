import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import NavBar from '../../components/navbar';
import GistCard from '../../components/gistCard';
import DataTable from '../../components/dataTable';
import { IGistsdata, IPagination } from '../../types/types';
import grid from './../../assets/layout.png';
import table from './../../assets/list.png';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import { usePagination } from '../../services/hooks/usePagination';
import { usePublicGistsData } from '../../services/hooks/usePublicGistData';
import NoResultsFound from '../../components/notFound';

import { TailSpin } from "react-loader-spinner";
import Pagination from '../../components/pagination';

export default function HomePage() {
  
  const [filteredData, setFilteredData] = useState<IGistsdata[]>([]);
  const itemsPerPage = 8;
  const [layout, setLayout] = useState('tabular');
  const isAuthenticated = false; 

  const publicGistResponse = usePublicGistsData(isAuthenticated);

  const pagination:IPagination = usePagination(filteredData, itemsPerPage);

  useEffect(() => {
    if (publicGistResponse.data) {
      setFilteredData(publicGistResponse.data);
      if (pagination)
      {
        pagination.setCurrentPage(1);
      }
      
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
          <button className="icon-btn" onClick={() => handleLayoutChange('grid')}>
            <img src={grid} alt="table" className="icon" />
          </button>
          <button className="icon-btn" onClick={() => handleLayoutChange('tabular')}>
            <img src={table} alt="card" className="icon" />
          </button>
        </div>
      </div>
      
      {filteredData?.length === 0 ? (
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
            <Pagination pagination={pagination}/>
        </div>
      )}
    </div>
  );
}
