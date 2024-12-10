import "./styles.scss";
import { FaCodeFork } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";


import { IdataTableProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { usePagination } from '../../services/hooks/usePagination';
import Pagination from "../pagination";

const ITEMS_PER_PAGE = 8;

export default function DataTable({ data }: IdataTableProps) {
  const navigate = useNavigate();
  
  const pagination = usePagination(data, ITEMS_PER_PAGE);

  const handleGistClick = (id: string|undefined) => {
    navigate(`/gist/${id}`);
  };

  return (
    <div id="data-table">
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
              <td id="name-cell">
                <img src={gist.ownerImageUrl} alt="img" id="profile-img" />
                <p>{gist.ownerName}</p>
              </td>
              <td>{gist.gistName}</td>
              <td>
                <button id="keyword-btn">Keyword</button>
              </td>
              <td>
                <div id="icon-text-container">
                  Last updated at {gist.updatedAt}
                  <div id="icons">
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
             <Pagination pagination={pagination}/>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
