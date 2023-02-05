import './App.css';
import movieListData from './components/Movie-List';
import MovieData from './components/Movie-Data';
import NavBar from './components/Nav';


function App() {
  const movieList = movieListData.map(movie => {
    return (
      <MovieData
        key={movie.id}
        movie={movie}
      />
    )
  })
  return (
    <div className="App">

      <NavBar />
      <div className="container">
        <section className="card-container">{movieList}</section>
      </div>
    </div>
  );
}

export default App;
