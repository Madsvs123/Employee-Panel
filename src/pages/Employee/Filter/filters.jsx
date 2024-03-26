import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useData } from "../../../context/DataContext";
import SortMenu from "../../../components/SortMenu";
import SearchBar from "../../../components/SearchBar";
import FilterButton from "../../../components/FilterButton";
import FilterOptions from "../../../components/FilterOptions";

const Filters = () => {
  const { employees, setFilteredData } = useData();
  const [sortBy, setSortBy] = useState("employeeCode");
  const [direction, setDirection] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    salaryStatus: "All",
    startDate: null,
    endDate: null,
  });

  const FilterData = (
    employees,
    sortBy,
    direction,
    searchValue,
    salaryStatus,
    startDate,
    endDate
  ) => {
    var data = employees.map((employee) => {
      if (employee.jobCode !== null) {
        return { ...employee, jobCode: employee.jobCode.code };
      }
      return employee;
    });

    // Filter By Start and End Date

    data = data.filter((employee) => {
      const hireDate = new Date(employee.dateOfHiring);
      if (startDate && endDate) {
        return hireDate >= startDate && hireDate <= endDate;
      } else if (startDate) {
        return hireDate >= startDate;
      } else if (endDate) {
        return hireDate <= endDate;
      }
      return true;
    });

    // Filter by salary status if provided
    if (salaryStatus !== "All") {
      data = data.filter((employee) => employee.salaryStatus === salaryStatus);
    }

    // Filter by search value if provided
    if (searchValue) {
      data = data.filter((employee) => {
        // Check if the search value exists in any employee property
        for (const key in employee) {
          if (
            employee.hasOwnProperty(key) &&
            employee[key]
              .toString()
              .toLowerCase()
              .includes(searchValue.toString().toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }

    // Sort the filtered employees according to the specified key
    if (sortBy) {
      data.sort((a, b) => {
        if (direction === "asc") {
          if (a[sortBy] < b[sortBy]) return -1;
          if (a[sortBy] > b[sortBy]) return 1;
        } else {
          if (a[sortBy] < b[sortBy]) return 1;
          if (a[sortBy] > b[sortBy]) return -1;
        }
        return 0;
      });
    }

    return [...data];
  };

  useEffect(() => {
    if (employees) {
      setFilteredData(
        FilterData(
          employees,
          sortBy,
          direction,
          searchValue,
          filterOptions.salaryStatus,
          filterOptions.startDate,
          filterOptions.endDate
        )
      );
    }

    console.log(sortBy);
  }, [employees, sortBy, direction, searchValue, filterOptions]);

  return (
    <Box display="flex" justifyContent="space-between" width="65%">
      <SortMenu
        sortBy={sortBy}
        setSortBy={setSortBy}
        direction={direction}
        setDirection={setDirection}
      />

      <Box display="flex" alignItems="center" gap="1rem">
        <SearchBar searchValue={searchValue} setSearch={setSearchValue} />

        <FilterButton>
          <FilterOptions
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </FilterButton>
      </Box>
    </Box>
  );
};

export default Filters;
