"use client";

import { useAuthModal } from "@/stores/useAuthModal";
import { Modal } from "react-bootstrap";
import { GoX } from "react-icons/go";
import Login from "./Login";

export default function AuthModal() {
  const show = useAuthModal((state) => state.isOpen);
  const formType = useAuthModal((state) => state.formType);
  const handleClose = useAuthModal((state) => state.onClose);

  return (
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="xl"
    >
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={handleClose}
        >
          <GoX />
        </button>
        <section className="auth_section">
          <div className={`img_wrapper ${formType}`}>
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/auth-benner.png"
            />
          </div>

          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && <Login />}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
