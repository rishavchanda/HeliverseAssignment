import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  Popover,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { FilterAltRounded, SearchRounded } from "@mui/icons-material";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 4px 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Filter = styled.div`
  background: ${({ theme }) => theme.text_secondary + 10};
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
`;
const FilterIcon = styled(FilterAltRounded)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const FilterContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.card};
  border-radius: 4px;
`;

const FilterSection = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchBarWithFilters = ({ onSearch, onFilter, filters }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "",
    domain: "",
    availability: "",
  });

  const handleSearch = (e) => {
    // Invoke the provided onSearch callback with the search query
    setSearchQuery(e.target.value);
    onSearch(searchQuery);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    // Invoke the provided onFilter callback with the selected filters
    onFilter(selectedFilters);
    handleFilterClose();
  };

  return (
    <SearchBarContainer>
      <SearchBar>
        <SearchRounded sx={{ color: "inherit" }} />
        <SearchInput
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          variant="outlined"
        />
      </SearchBar>
      <Filter onClick={handleFilterClick}>
        <FilterIcon />
        Filters
      </Filter>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={open ? "filter-popover" : undefined}
        open={open}
        onClose={handleFilterClose}
      >
        <FilterContainer>
          <FilterSection>
            <FormControl>
              <FormLabel
                id="gender-label"
                sx={{ color: theme.text_primary, fontSize: "18px" }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender-label"
                name="gender"
                value={selectedFilters.gender}
                onChange={handleFilterChange}
              >
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="All"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="Female"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="Female"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="Male"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="Male"
                  sx={{ color: theme.text_secondary }}
                />
                {/* Add more gender options as needed */}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel
                id="domain-label"
                sx={{ color: theme.text_primary, fontSize: "18px" }}
              >
                Domain
              </FormLabel>
              <RadioGroup
                aria-labelledby="domain-label"
                name="domain"
                value={selectedFilters.domain}
                onChange={handleFilterChange}
              >
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="All"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="IT"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="IT"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="Sales"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="Sales"
                  sx={{ color: theme.text_secondary }}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel
                id="availability-label"
                sx={{ color: theme.text_primary, fontSize: "18px" }}
              >
                Availability
              </FormLabel>
              <RadioGroup
                aria-labelledby="availability-label"
                name="availability"
                value={selectedFilters.availability}
                onChange={handleFilterChange}
              >
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="All"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="Available"
                  sx={{ color: theme.text_secondary }}
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      sx={{
                        color: theme.text_secondary,
                        "&.Mui-checked": {
                          color: theme.primary,
                        },
                      }}
                    />
                  }
                  label="Not Available"
                  sx={{ color: theme.text_secondary }}
                />
              </RadioGroup>
            </FormControl>
          </FilterSection>
          <Button variant="contained" onClick={applyFilters}>
            Apply Filters
          </Button>
        </FilterContainer>
      </Popover>
    </SearchBarContainer>
  );
};

export default SearchBarWithFilters;
