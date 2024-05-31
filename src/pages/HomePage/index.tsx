import NavBar from "../../components/Navbar";
import "./styles.scss"; 
import { getGistsApiCall } from "../../services/gistServices";
import GistCard from "../../components/gistCard";
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['gists'],
    queryFn: getGistsApiCall,
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  console.log(data);

  return (
    <div className="container">
      <NavBar />
      <div className="grid-container">
        {data.map((gist) => (
          <GistCard
            
            key={gist.id}
            id={gist.id}
            fileContent={gist.fileContent}
            OwnerName={gist.ownerName}
            OwnerImageURL={gist.ownerImageURL}
            gistName={gist.gistName}
            createdAt={gist.createdAt}
            gistDescription={gist.gitDescripton}
            />
        ))}
      </div>
    </div>
  );
}
