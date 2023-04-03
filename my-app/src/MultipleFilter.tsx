import React, { useState } from 'react'

const SearchFilter = () => {
  const [data, setData] = useState([
    { name: 'Ram', age: 25, gender: 'Male', country: 'USA' },
    { name: 'Ram', age: 25, gender: 'Female', country: 'USA' },
    { name: 'Ram', age: 25, gender: 'Male', country: 'Canada' },
    { name: 'Ram', age: 29, gender: 'Male', country: 'USA' },
    { name: 'Ram', age: 45, gender: 'Female', country: 'USA' },
    { name: 'Shyam', age: 27, gender: 'Female', country: 'Canada' },
    { name: 'Hari', age: 28, gender: 'Male', country: 'USA' },
    { name: 'Hari', age: 30, gender: 'Female', country: 'Mexico' },
    { name: 'Gita', age: 32, gender: 'Male', country: 'Canada' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [ageFilter, setAgeFilter] = useState(0)
  const [genderFilter, setGenderFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handleAgeFilterChange = (event: any) => {
    setAgeFilter(Number(event.target.value))
  }

  const handleGenderFilterChange = (event: any) => {
    setGenderFilter(event.target.value)
  }

  const handleCountryFilterChange = (event: any) => {
    setCountryFilter(event.target.value)
  }

  const applyFilters = () => {
    const filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (ageFilter === 0 || item.age === ageFilter) &&
        (genderFilter === '' || item.gender === genderFilter) &&
        (countryFilter === '' || item.country === countryFilter)
      )
    })
    setFilteredData(filtered)
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <select value={ageFilter} onChange={handleAgeFilterChange}>
        <option value={0}>All ages</option>
        <option value={25}>25</option>
        <option value={27}>27</option>
        <option value={28}>28</option>
        <option value={30}>30</option>
        <option value={32}>32</option>
      </select>
      <select value={genderFilter} onChange={handleGenderFilterChange}>
        <option value=''>All genders</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>
      <select value={countryFilter} onChange={handleCountryFilterChange}>
        <option value=''>All countries</option>
        <option value='USA'>USA</option>
        <option value='Canada'>Canada</option>
        <option value='Mexico'>Mexico</option>
      </select>
      <button onClick={applyFilters}>Apply filters</button>
      <ul>
        {filteredData.map((item) => (
          <li key={item.name}>
            {item.name}, {item.age}, {item.gender}, {item.country}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchFilter
