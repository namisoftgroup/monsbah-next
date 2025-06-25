"use client";

import { useAuthModal } from "@/stores/useAuthModal";
import { Modal } from "react-bootstrap";
import { GoX } from "react-icons/go";
import Login from "./Login";
import Image from "next/image";
import { useEffect } from "react";
import ChooseRegisterType from "./ChooseRegisterType";
import Register from "./Register";
import { FormProvider } from "react-hook-form";
import { useRegisterForm } from "@/hooks/controllers/useRegisterForm";
import RegisterOTPConfirm from "./RegisterOTPConfirm";
import RegisterCompany from "./RegisterCompany";
import useCompanyRegisterForm from "@/hooks/controllers/useCompanyRegisterForm";

export default function AuthModal() {
  const {
    isOpen: show,
    onClose,
    setFormType,
    formType,
  } = useAuthModal((state) => state);
  const methods = useRegisterForm();
  const companyFormMethods = useCompanyRegisterForm();
  const handleClose = () => {
    onClose();
    setFormType("login");
    methods.reset();
  };

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
            <FormProvider {...methods}>
              {formType === "register" && <Register />}
              {formType === "registerOtp" && <RegisterOTPConfirm />}
            </FormProvider>
            <FormProvider {...companyFormMethods}>
              {formType === "register-company" && <RegisterCompany />}
            </FormProvider>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
