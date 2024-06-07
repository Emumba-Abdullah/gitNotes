
import './styles.scss';

const NoResultsFound = () => {
  return (
    <div id="no-results-container">
      <div id="no-results-icon">🔍</div>
      <h2 id="no-results-text">No Results Found</h2>
      <p id="no-results-subtext">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );
};

export default NoResultsFound;
