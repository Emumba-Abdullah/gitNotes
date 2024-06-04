import "./styles.scss";
import { FaCodeFork } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useState } from "react";
import { IdataTableProps } from "../../types/types";



export default function DataTable({ data }: IdataTableProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
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
    <div className="data-table">
      <table id="gists">
        <thead>
          <tr>
            <th>Name</th>
            <th>Notebook Name</th>
            <th>Keyword</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((gist) => (
            <tr key={gist.id}>
              <td className="name-cell">
                <img
                  src={gist.ownerImageUrl}
                  alt="img"
                  className="profile-img"
                />
                <p>{gist.ownerName}</p>
              </td>
              <td>{gist.gistName}</td>
              <td><button className="keyword-btn">Keyword</button></td>
              <td>
                <div className="icon-text-container">
                  Last updated at {gist.updatedAt}
                  <div className="icons">
                    <FaCodeFork />
                    <CiStar />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  &lt;
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  &gt;
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
