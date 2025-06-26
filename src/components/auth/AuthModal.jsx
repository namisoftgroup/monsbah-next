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
import ResetPassword from "./ResetPassword";
import OTPConfirm from "./OTPConfirm";
import ForgetPassword from "./ForgetPassword";
import CompanyOTPConfirm from "./CompanyOTPConfirm";
import { useForgetPasswordForm } from "@/hooks/controllers/useForgetPasswordForm";
import { useTranslations } from "next-intl";

export default function AuthModal() {
  const {
    isOpen: show,
    onClose,
    setFormType,
    formType,
  } = useAuthModal((state) => state);
  const methods = useRegisterForm();
  const companyFormMethods = useCompanyRegisterForm();
  const forgetPassordMethods = useForgetPasswordForm();
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
              {formType === "register-company" && <RegisterCompany />}{" "}
              {formType === "companyOtp" && <CompanyOTPConfirm />}
            </FormProvider>
            <FormProvider {...forgetPassordMethods}>
              {formType === "forget" && <ForgetPassword />}

              {formType === "otp" && <OTPConfirm />}
            </FormProvider>
            {formType === "reset" && <ResetPassword />}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
