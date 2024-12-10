import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import "./styles.scss"
import { IPagination } from "../../types/types";



export default function Pagination({ pagination }: { pagination:IPagination }) {
    
    return (
         <div className="pagination">
            <button onClick={pagination.handlePrevPage} disabled={pagination.currentPage === 1}>
               <MdOutlineNavigateBefore/>
            </button>
            <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
            <button onClick={pagination.handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
               <MdOutlineNavigateNext/>
            </button>
          </div>
  )
  
}
