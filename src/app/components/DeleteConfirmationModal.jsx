import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import question from "../../assets/img/question.svg";

const DeleteConfirmationModal = ({ isOpen, toggle, onDelete, selectedId }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      className="modal-md all-modal-style"
      backdrop="static"
    >
      <ModalHeader toggle={toggle}>
        <h5 className="text-[18px] font-semibold"> Information</h5>
      </ModalHeader>
      <ModalBody>
        <div className="flex align-center">
          <img src={question} alt="Question Icon" />
          <p className="p-3">Are you sure you want to delete it? </p>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="flex justify-end mt-3 gap-3">
            <Button outline className="px-5 rounded-lg " onClick={toggle}>
              No
            </Button>
            <Button
              color="danger"
              className="px-5 rounded-lg "
              onClick={() => onDelete(selectedId)}
            >
              Yes
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteConfirmationModal;
