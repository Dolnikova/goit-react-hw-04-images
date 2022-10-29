import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchBar,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!search.trim()) {
      toast.error('Type something to find');
      return;
    }
    onSubmit(search);
  };
  return (
    <header>
      <SearchBar>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={search}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBar>
    </header>
  );
};
