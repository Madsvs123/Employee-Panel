import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {

  const [employees, setEmployees] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [jobs, setJobs] = useState(null);


  const getData = async() => {
    await axios.get(`https://kaied-employee-panel-api.onrender.com/employee`).then(reponse => {
     setEmployees(reponse.data.employees)
     setJobs(reponse.data.jobs)
   })
   }

  useEffect(() => {
    getData()
  }, [])

  const data = {
    employees,
    setEmployees,
    jobs,
    setJobs,
    filteredData,
    setFilteredData,
    getData : () => getData(),
  }


  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;