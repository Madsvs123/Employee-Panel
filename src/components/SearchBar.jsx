import { useState } from 'react';
import { InputBase, IconButton, Paper, useTheme } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchBar = ({searchValue, setSearch }) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    setSearch(query)
  }


  const handleClear = () => {
    setQuery('')
    setSearch('')
  }

  const handleSubmit = () => {
    return searchValue ? handleClear() : handleSearch()
  }

  return (
    <Paper component='form' 
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: '3rem',
            bgcolor : searchValue ? theme.palette.neutral.light : theme.palette.background.default}}>

      <InputBase
        sx={{
         marginLeft: theme.spacing(1),
         flex: 1,
        }}
        value={query}
        onChange={handleChange}
        placeholder='Search For (Code - Name - Job)'
        disabled={searchValue ? true : false}
      />
      <IconButton
        sx={{p : 1, 
             bgcolor: searchValue ? theme.palette.primary.dark : theme.palette.primary.light,
             "&:hover" : {bgcolor : searchValue ? theme.palette.primary.dark : theme.palette.primary.light}
        }}
        aria-label="search"
        onClick={handleSubmit}
      >
        {searchValue ? (<Clear sx={{color : theme.palette.primary.light}} />) : (<Search />)}
      </IconButton>
      
    </Paper>
  );
};

export default SearchBar;