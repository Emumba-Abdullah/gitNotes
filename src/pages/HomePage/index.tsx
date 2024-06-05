import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import NavBar from "../../components/Navbar";
import GistCard from "../../components/gistCard";
import DataTable from "../../components/dataTable";

import { getGistsApiCall } from "../../services/gistServices";
import { getFilteredResults } from "../../utils/queries";

import { IGistsdata } from "../../types/types";

import grid from "./../../assets/layout.png";
import table from "./../../assets/list.png";
import "./styles.scss";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 8;
  const [layout, setLayout] = useState("tabular");
  const { data, isLoading, isError } = useQuery({
    queryKey: ['gists'],
    queryFn: getGistsApiCall,
    select: getFilteredResults,
  });

  useEffect(() => {
    if (data)
      setFilteredData(data);
  }, [data]);

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
  };

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

  const handleSearchText = (text: string) => {
    setSearchText(text);
    const temp = data.filter((gist) => {
      return gist.fileName.filename.toLowerCase() === text.toLowerCase();
    });

    console.log(temp)

    if (temp.length === 0 && text) {
      toast.warn('No results found. Displaying all gists.');
      setFilteredData(data);
    } else {
      setFilteredData(temp);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <NavBar setSearchText={handleSearchText} />
      <div className="layout-manager">
        <h2>Public Gists</h2>
        <div>
          <button className="icon-btn" onClick={() => handleLayoutChange("tabular")}>
            <img src={grid} alt="table" className="icon" />
          </button>
          <button className="icon-btn" onClick={() => handleLayoutChange("grid")}>
            <img src={table} alt="card" className="icon" />
          </button>
        </div>
      </div>
      {layout === "tabular" ? (
        filteredData && <DataTable data={filteredData} />
      ) : (
        <div className="cardLayout">
          <div className="grid-container">
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
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
