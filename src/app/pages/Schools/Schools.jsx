import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgCard from "../../components/BgCard";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import FilterComponent from "../../components/FilterComponent";

import {
  setSchoolList,
  setDeleteToggle,
  setSelectedId,
  setFilters,
} from "../../../features/schools/schoolsSlice";

import trash from "../../../assets/img/trash.svg";
import Sidebar from "../Sidebar/Sidebar";
import ProContainer from "../../components/ProContainer";
import { schoolsJson } from "../../../services/schoolsJson";

function School() {
  const dispatch = useDispatch();
  const schoolList = useSelector((state) => state.schools.schoolList);
  const deleteToggle = useSelector((state) => state.schools.deleteToggle);
  const selectedId = useSelector((state) => state.schools.selectedId);
  const filters = useSelector((state) => state.schools.filters);


  useEffect(() => {
    getSchoolList();
    setupFilters();
  }, []);

  const setupFilters = async () => {
    try {
      const fetchedFilters = [
        { key: "address", label: "Address", type: "text" },
        { key: "number", label: "Number", type: "number" },
      ];
      dispatch(setFilters(fetchedFilters));
    } catch (error) {
      console.log("setupFilters error: ", error);
    }
  };

  const getSchoolList = async () => {
    try {
      dispatch(setSchoolList(schoolsJson));
    } catch (error) {
      console.log("getSchoolList error: ", error);
    } 
  };

  const applyFilters = async (appliedFilters) => {
    try {
      let filteredList = schoolsJson;
      if (appliedFilters) {
        if (appliedFilters.name) {
          filteredList = filteredList.filter((item) =>
            item.name_en
              .toLowerCase()
              .includes(appliedFilters.name.toLowerCase())
          );
        }
        if (appliedFilters.address) {
          filteredList = filteredList.filter((item) =>
            item.address_en.toLowerCase().includes(appliedFilters.address)
          );
        }
        if (appliedFilters.number) {
          filteredList = filteredList.filter((item) =>
            item.number.includes(appliedFilters.number)
          );
        }
      }
      dispatch(setSchoolList(filteredList));
    } catch (error) {
      console.log("applyFilters error: ", error);
    }
  };

  const deleteSchool = () => {
    dispatch(setSchoolList(schoolList.filter((v) => v.id !== selectedId)));
    dispatch(setDeleteToggle(false));
  };

  const openDeleteModal = (v) => {
    dispatch(setSelectedId(v.id));
    dispatch(setDeleteToggle(true));
  };

  const handleFilterChange = (changedFilters) => {
    applyFilters(changedFilters);
  };

  const handleClearFilters = () => {
    getSchoolList();
  };

  return (
    <ProContainer>
      <div className="block md:flex ">
        <Sidebar />
        <div className="overflow-x-auto w-full">
          <BgCard>
            <h1 className="text-[20px]">Schools</h1>
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
                  { schoolList.length === 0 ? (
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
                              <span>{item.name_en}</span>
                            </td>
                            <td className="py-3 px-6 ">
                              <span className=" ">{item.address_en}</span>
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
          onDelete={deleteSchool}
          selectedId={selectedId}
        />
      </div>
    </ProContainer>
  );
}

export default School;
