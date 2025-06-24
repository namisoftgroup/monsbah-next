"use client";

import { useAuthModal } from "@/stores/useAuthModal";
import { Modal } from "react-bootstrap";
import { GoX } from "react-icons/go";
import Login from "./Login";
import Image from "next/image";
import { useEffect } from "react";
import ChooseRegisterType from "./ChooseRegisterType";
import Register from "./Register";

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
            <Image
              width={500}
              height={600}
              className="bg-img"
              alt="auth-banner"
              src="/auth-benner.png"
            />
          </div>

          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && <Login />}
            {formType === "register-type" && <ChooseRegisterType />}
            {formType === "register" && <Register />}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
