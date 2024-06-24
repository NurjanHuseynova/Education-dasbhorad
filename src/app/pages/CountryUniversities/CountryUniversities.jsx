import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgCard from "../../components/BgCard";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import FilterComponent from "../../components/FilterComponent";
import {
   setCountryUniList,
  setDeleteToggle,
  setSelectedName,
  setFilters,
} from "../../../features/countryUniversities/countryUniversitiesSlice";
import axios from "axios";
import trash from "../../../assets/img/trash.svg";
import Sidebar from "../Sidebar/Sidebar";
import ProContainer from "../../components/ProContainer";

function CountryUniversities() {
  const dispatch = useDispatch();
  const countryUniList = useSelector((state) => state.countryUni.countryUniList);
  const deleteToggle = useSelector((state) => state.countryUni.deleteToggle);
  const selectedName = useSelector((state) => state.countryUni.selectedName);
  const filters = useSelector((state) => state.countryUni.filters);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    getCountries();
    setupFilters();
  }, []);

  useEffect(() => {
    getUniversityList();
  }, [selectedCountry, nameFilter]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryOptions = response.data.map((country) => ({
        value: country.name.common,
        label: country.name.common,
      }));
      setCountries(countryOptions);
    } catch (error) {
      console.log("getCountries error: ", error);
    }
  };

  const getUniversityList = async () => {
    try {
      let url = `http://universities.hipolabs.com/search?`;

      if (selectedCountry) {
        url += `country=${selectedCountry}&`;
      }

      if (nameFilter) {
        url += `name=${nameFilter}&`;
      }

      const response = await axios.get(url);
      dispatch(setCountryUniList(response.data));
    } catch (error) {
      console.log("getUniversityList error: ", error);
    }
  };

  const setupFilters = () => {
    const fetchedFilters = [
      { key: "name", label: "Name", type: "text" },
      {
        key: "countryFilter",
        label: "Country",
        type: "select",
        options: countries,
      },
    ];

    dispatch(setFilters(fetchedFilters));
  };

  const handleFilterChange = (changedFilters) => {
    if (changedFilters.nameFilter !== undefined) {
      setNameFilter(changedFilters.nameFilter);
    }
    if (changedFilters.countryFilter !== undefined) {
      setSelectedCountry(changedFilters.countryFilter);
    }
  };

  const deleteUniversity = () => {
    dispatch(setCountryUniList(countryUniList.filter((uni) => uni.name !== selectedName)));
    dispatch(setDeleteToggle(false));
  };

  const openDeleteModal = (uni) => {
    dispatch(setSelectedName(uni.name));
    dispatch(setDeleteToggle(true));
  };

  const handleClearFilters = () => {
    dispatch(setCountryUniList([]));
  
  };

  useEffect(() => {
    setupFilters();
  }, [countries]);

  return (
    <ProContainer>
      <div className="block md:flex">
        <Sidebar />
        <div className="overflow-x-auto w-full">
          <BgCard>
            <h1 className="text-[20px]">Country Universities</h1>
            <FilterComponent
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </BgCard>
          <div className="min-w-screen min-h-screen bg-gray-100 flex bg-gray-100 font-sans overflow-hidden">
            <BgCard>
              <div className="w-full">
                <div className="bg-white shadow-md rounded">
                  {countryUniList.length === 0 ? (
                    <div className="text-center py-10">No data found</div>
                  ) : (
                    <table className="min-w-max w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 "></th>
                          <th className="py-3 px-6 text-left">Name</th>
                          <th className="pr-3 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {countryUniList.map((uni, index) => (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={index}
                          >
                            <td></td>
                            <td className="py-3 px-6">
                              <span>{uni.name}</span>
                            </td>
                            <td className="py-3 px-6">
                              <div className="flex items-center justify-center">
                                <button onClick={() => openDeleteModal(uni)}>
                                  <img src={trash} alt="delete" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </BgCard>
          </div>
        </div>

        {/* Delete confirmation modal */}
        <DeleteConfirmationModal
          isOpen={deleteToggle}
          toggle={() => dispatch(setDeleteToggle(!deleteToggle))}
          onDelete={deleteUniversity}
          selectedId={selectedName}
        />
      </div>
    </ProContainer>
  );
}

export default CountryUniversities;
