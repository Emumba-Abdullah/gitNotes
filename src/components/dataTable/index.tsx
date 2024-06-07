import "./styles.scss";
import { FaCodeFork } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import { IdataTableProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { usePagination } from '../../services/hooks/usePagination';

const ITEMS_PER_PAGE = 8;

export default function DataTable({ data }: IdataTableProps) {
  const navigate = useNavigate();
  
  const pagination = usePagination(data, ITEMS_PER_PAGE);

  const handleGistClick = (id: string) => {
    navigate(`/gist/${id}`);
  };

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
          {pagination.selectedData.map((gist) => (
            <tr key={gist.id} onClick={() => handleGistClick(gist.id)}>
              <td className="name-cell">
                <img src={gist.ownerImageUrl} alt="img" className="profile-img" />
                <p>{gist.ownerName}</p>
              </td>
              <td>{gist.gistName}</td>
              <td>
                <button className="keyword-btn">Keyword</button>
              </td>
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
                <button onClick={pagination.handlePrevPage} disabled={pagination.currentPage === 1}>
                  <MdOutlineNavigateBefore />
                </button>
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button onClick={pagination.handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
                  <MdOutlineNavigateNext />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
