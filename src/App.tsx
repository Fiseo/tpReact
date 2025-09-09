import { useEffect, useState, type JSX } from 'react'
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SoftwarePage from './pages/SoftwarePage';
import Information from './pages/Information';
import { getResource, type Shortcut, type Software } from "./api";

export type PageSlug = 'home' | 'software';

function App() {
  const [page, setPage] = useState<PageSlug>('home');
  const [pageResource, setPageResource] = useState<JSX.Element>()
  useEffect(() => {
    let resource: Promise<T[]> | null
      if (page === 'home') {
    resource = getResource<Shortcut>('shortcuts');
  } else if (page === 'software') {
    resource = getResource<Software>('software');
  } else { resource = null}
  
  if (resource == null) {
    return console.log("Une erreur est survenu")
  }

  resource.then((data) => {
    if (data.length === 0) {
      return console.log("Aucune donnée disponible actuellement");
    } else {
        if (data[0].title == undefined){
          const type = "name";
          setPageResource(Information(data,type));
        }
        else {
          const type = "title";
          setPageResource(Information(data,type));
        }
    }}
  )
  }, [page]
  );

  let currentPage = null;
  if (page === 'home') {
    currentPage = <HomePage/>;
  } else if (page === 'software') {
    currentPage = <SoftwarePage/>;
  }

  return (
    <main>

      <Header onNavClick={p => setPage(p)}/>

      {currentPage}
      {pageResource ? pageResource : <p>Chargement en cours...</p>}


    </main>
  )
}

export default App
