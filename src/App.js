import { useEffect, useState } from "react";
import "./App.css";
import { getMovielist, searchMovie } from './api';
function App() {
const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovielist().then((result) => {
      setPopularMovies(result)
    })
  },[])

 const PopularMovieList = () => {
  return popularMovies.map((movie, i) => {
    return (
        <div className="movie-wrapper"key={i}>
          <div className="movie-title">{movie.title}</div>
          <img className="movie-img" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
          <div className="movie-date">Relese: {movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
    )
  })
 }


  const search = async(q) => {
    if(q.length > 3){
    const query = await searchMovie(q)
    setPopularMovies(query.results)
  }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>rifki</h1>
        <input placeholder="cari film mu" onChange={({target}) => search(target.value) } className="movie-search"  />
        <div className="movie-contrainer">
        <PopularMovieList/>
        </div>
        
      </header>
    </div>
  );
}

export default App;
