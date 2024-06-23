import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgCard from "../../components/BgCard";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import FilterComponent from "../../components/FilterComponent";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  setUniList,
  setSelectedUni,
  setViewModal,
  setDeleteToggle,
  setSelectedId,
  setFilters,
} from "../../../features/universities/universitiesSlice";
import { universitiesApi } from "../../../services/JsonServer";
import eye from "../../../assets/img/eye.svg";
import trash from "../../../assets/img/trash.svg";
import Sidebar from "../Sidebar/Sidebar";
import ProContainer from "../../components/ProContainer";

function HighSchool() {
  const dispatch = useDispatch();
  const uniList = useSelector((state) => state.universities.uniList);
  const selectedUni = useSelector((state) => state.universities.selectedUni);
  const viewModal = useSelector((state) => state.universities.viewModal);
  const deleteToggle = useSelector((state) => state.universities.deleteToggle);
  const selectedId = useSelector((state) => state.universities.selectedId);
  const filters = useSelector((state) => state.universities.filters);

  useEffect(() => {
    getUniversityList();
    setupFilters();
  }, []);

  const setupFilters = async () => {
    try {
      // universitiesApi'den benzersiz bölgeleri getir
      const uniqueRegions = [
        ...new Set(universitiesApi.universities.map((uni) => uni.region)),
      ];

      // Benzersiz bölgeleri seçenekler formatında eşle
      const regionOptions = uniqueRegions.map((region) => ({
        value: region,
        label: region,
      }));

      // Gerekirse diğer filtreleri tanımla
      const fetchedFilters = [
        { key: "name", label: "Name", type: "text" },
        { key: "createdDate", label: "Created Date", type: "date" },
        {
          key: "region",
          label: "Region",
          type: "select",
          options: [{ value: "", label: "All" }, ...regionOptions],
        },
      ];

      dispatch(setFilters(fetchedFilters));
    } catch (error) {
      console.log("setupFilters error: ", error);
    }
  };

  const getUniversityList = async () => {
    try {
      dispatch(setUniList(universitiesApi.universities));
    } catch (error) {
      console.log("getUniversityList error: ", error);
    }
  };

  const applyFilters = async (appliedFilters) => {
    try {
      let filteredList = universitiesApi.universities;

      if (appliedFilters) {
        if (appliedFilters.name) {
          filteredList = filteredList.filter((uni) =>
            uni.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
          );
        }
        if (appliedFilters.createdDate) {
          filteredList = filteredList.filter((uni) =>
            uni.created_date.includes(appliedFilters.createdDate)
          );
        }
        if (appliedFilters.region) {
          filteredList = filteredList.filter(
            (uni) => uni.region === appliedFilters.region
          );
        }
      }

      dispatch(setUniList(filteredList));
    } catch (error) {
      console.log("applyFilters error: ", error);
    }
  };

  const viewCorpus = (uni) => {
    dispatch(setSelectedUni(uni));
    dispatch(setViewModal(true));
  };

  const deleteUniversity = () => {
    dispatch(setUniList(uniList.filter((uni) => uni.id !== selectedId)));
    dispatch(setDeleteToggle(false));
  };

  const openDeleteModal = (uni) => {
    dispatch(setSelectedId(uni.id));
    dispatch(setDeleteToggle(true));
  };

  const handleFilterChange = (changedFilters) => {
    applyFilters(changedFilters);
  };

  const handleClearFilters = () => {
    getUniversityList();
  };

  return (
    <ProContainer>
    <div className="block md:flex ">
       <Sidebar />
     <div className="overflow-x-auto w-full">
       <BgCard>
         <h1 className="text-[20px]">Universities</h1>

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
               <table className="min-w-max w-full table-auto">
                 <thead>
                   <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                     <th className="py-3 px-6 "></th>
                     <th className="py-3 px-6 text-left">Name</th>
                     <th className="pr-3 px-6 pl-[3.5rem]">Corpus</th>
                   </tr>
                 </thead>
                 <tbody className="text-gray-600 text-sm font-light">
                   {uniList.map((uni, index) => (
                     <tr
                       className="border-b border-gray-200 hover:bg-gray-100"
                       key={index}
                     >
                       <td></td>
                       <td className="py-3 px-6">
                         <span>{uni.name}</span>
                       </td>
                       <td className="py-3 px-6">
                         <div className="flex items-center justify-around cursor-pointer">
                           <span onClick={() => viewCorpus(uni)}>
                             <img src={eye} alt="view" />
                           </span>
                           <span onClick={() => openDeleteModal(uni)}>
                             <img src={trash} alt="delete" />
                           </span>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         </BgCard>
       </div>
     </div>

     {/*view corpus list */}

     <Modal
       isOpen={viewModal}
       toggle={() => dispatch(setViewModal(!viewModal))}
       centered
       className="modal-md all-modal-style"
     >
       <ModalHeader toggle={() => dispatch(setViewModal(!viewModal))}>
         {selectedUni && (
           <h5 className="text-[18px] font-semibold">{selectedUni.name}</h5>
         )}
       </ModalHeader>
       <ModalBody>
         <ul>
           {selectedUni &&
             selectedUni.corpus_list.map((corpus, index) => (
               <li key={index}>{corpus}</li>
             ))}
         </ul>
       </ModalBody>
     </Modal>

     {/* Delete confirmation modal */}
     <DeleteConfirmationModal
       isOpen={deleteToggle}
       toggle={() => dispatch(setDeleteToggle(!deleteToggle))}
       onDelete={deleteUniversity}
       selectedId={selectedId}
     />
   </div>
  </ProContainer>
  );
}

export default HighSchool;
