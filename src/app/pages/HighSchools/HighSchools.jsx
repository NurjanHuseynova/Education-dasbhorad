import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgCard from "../../components/BgCard";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import FilterComponent from "../../components/FilterComponent";

import {
  setHighSchoolList,
  setDeleteToggle,
  setSelectedId,
  setFilters,
} from "../../../features/highSchools/highSchoolsSlice";

import trash from "../../../assets/img/trash.svg";
import Sidebar from "../Sidebar/Sidebar";
import ProContainer from "../../components/ProContainer";
import { highSchoolJson } from "../../../services/highSchoolsJson";

function HighSchools() {
  const dispatch = useDispatch();
  const schoolList = useSelector((state) => state.highSchools.highSchoolList);

  const deleteToggle = useSelector((state) => state.highSchools.deleteToggle);
  const selectedId = useSelector((state) => state.highSchools.selectedId);
  const filters = useSelector((state) => state.highSchools.filters);


  useEffect(() => {
    getHighSchoolList();
    setupFilters();
  }, []);

  const setupFilters = async () => {
    try {
      const fetchedFilters = [
        { key: "name", label: "Name", type: "text" },
        { key: "address", label: "Address", type: "text" },
        { key: "email", label: "Email", type: "text" },
      ];

      dispatch(setFilters(fetchedFilters));
    } catch (error) {
      console.log("setupFilters error: ", error);
    }
  };

  const getHighSchoolList = async () => {
    try {
      dispatch(setHighSchoolList(highSchoolJson));
    } catch (error) {
      console.log("getHighSchoolList error: ", error);
    } 
  };

  const applyFilters = async (appliedFilters) => {
    try {
      let filteredList = highSchoolJson;

      if (appliedFilters) {
        if (appliedFilters.name) {
          filteredList = filteredList.filter((item) =>
            item.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
          );
        }
        if (appliedFilters.address) {
          filteredList = filteredList.filter((item) =>
            item.address.toLowerCase().includes(appliedFilters.address)
          );
        }
        if (appliedFilters.email) {
          filteredList = filteredList.filter((item) =>
            item.email.toLowerCase().includes(appliedFilters.email)
          );
        }
      }
      dispatch(setHighSchoolList(filteredList));
    } catch (error) {
      console.log("applyFilters error: ", error);
    }
  };

  const deleteHighSchool = () => {
    dispatch(
      setHighSchoolList(schoolList.filter((item) => item.id !== selectedId))
    );
    dispatch(setDeleteToggle(false));
  };

  const openDeleteModal = (item) => {
    dispatch(setSelectedId(item.id));
    dispatch(setDeleteToggle(true));
  };

  const handleFilterChange = (changedFilters) => {
    applyFilters(changedFilters);
  };

  const handleClearFilters = () => {
    getHighSchoolList();
  };

  return (
    <ProContainer>
      <div className="block md:flex ">
        <Sidebar />
        <div className="overflow-x-auto w-full">
          <BgCard>
            <h1 className="text-[20px]">High Schools</h1>

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
                  {schoolList.length === 0 ? (
                    <div className="text-center py-10">No data found</div>
                  ) : (
                    <table className="min-w-max w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 "></th>
                          <th className="py-3 px-6 text-left">Name</th>
                          <th className="pr-3 px-6 pl-[3.5rem] ">Address</th>
                          <th className="pr-3 px-6 pl-[3.5rem] ">Email</th>
                          <th className="py-3 px-6 "></th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {schoolList.map((item, index) => (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={index}
                          >
                            <td></td>
                            <td className="py-3 px-6">
                              <span>{item.name}</span>
                            </td>
                            <td className="py-3 px-6 ">
                              <span className=" ">{item.address}</span>
                            </td>
                            <td className="py-3 px-6 ">
                              <span className=" ">{item.email}</span>
                            </td>
                            <td>
                              <button onClick={() => openDeleteModal(item)}>
                                <img src={trash} alt="delete" />
                              </button>
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
          onDelete={deleteHighSchool}
          selectedId={selectedId}
        />
      </div>
    </ProContainer>
  );
}

export default HighSchools;
