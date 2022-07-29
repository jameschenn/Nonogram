import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import { loadSearchThunk } from '../store/search';
import './searchbar.css'

const SearchBar = () => {

  const [query, setQuery] = useState('')


  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(loadSearchThunk())
  }, [dispatch])

  const searchResultsFromThunk = useSelector(state => state.search)

  const fuse = new Fuse(searchResultsFromThunk, {
    keys: [
      { name: 'caption', weight: 0.2},
      // { name: 'username', weight: 2.0},
    ],
    includeScore: true,
    threshold: 0.4,
  });

  const results = fuse.search(query);
  const searchResults = results.map(result => result.item)

  function handleSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }


  return (
    <>
    <div className='search-container'>
      <div className='search-form'>
        <form>
          <label>
            <input
              type='text'
              placeholder='Search for Post'
              value={query}
              onChange={handleSearch}
              />
          </label>
        </form>
      </div>
      <div className='search-dropdown'>
        {searchResults.map(result => (
          <>
          <div className='search-result'>
            <a href={`/images/${result.id}`}>
              <ul style={{ marginLeft:"25px", borderBottom: "solid 1px lightgray"}}>
                <li style={{marginRight:'15px'}}>{result.caption}</li>
                  <li>Posted by <span style={{fontWeight:'bold'}}>{result?.user?.username}</span></li>
              </ul>
            </a>
          </div>
          </>
        ))}
      </div>
    </div>
    </>
  )
}

export default SearchBar;
