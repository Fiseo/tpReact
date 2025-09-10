import {Suspense, useEffect, useState, type JSX, use} from 'react'
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SoftwarePage from './pages/SoftwarePage';
import { getResource, type Shortcut, type Software } from "./api";

export type PageSlug = 'home' | 'software';

function addLi(value: string):JSX.Element{
  return (
      <li>
        {value}
      </li>
  )
}
function Resource({ promise }: {promise: Promise<T[]>}) {
  const resource = use(promise);
  const result: JSX.Element[] | JSX.Element = [];
  let type: string = "";

  if (resource[0].title == undefined)
    type = "name";
  else
    type = "title";

  for(const data of resource){
    result.push(addLi(data[type]));
  }
  return (
      <section>
        <ul>
          {result}
        </ul>
      </section>
      );
}

function App() {
  const [page, setPage] = useState<PageSlug>('home');
  let resource: Promise<T[]>;
  if (page === 'home') {
    resource = getResource<Shortcut>('shortcuts');
  } else {
    resource = getResource<Software>('software');
  }

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

      <Suspense fallback={<p>Chargement en cours...</p>}>
        <Resource promise={resource}/>
      </Suspense>
      
    </main>
  )
}

export default App
