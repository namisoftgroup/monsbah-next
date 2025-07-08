// "use client";

// import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";
// import { useTranslations } from "next-intl";
// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import SubmitButton from "../forms/SubmitButton";
// import PhoneInput from "../forms/PhoneInput";
// import OtpContainer from "../forms/OtpContainer";
// import { toast } from "sonner";

// export default function ChangePhoneModal({
//   country_code,
//   phone,
//   showModal,
//   setShowModal,
// }) {
//   console.log(country_code, phone);

//   const t = useTranslations();
//   const [formType, setFormType] = useState("phone");
//   const [phoneLoading, setPhoneLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     country_code: "",
//     phone: "",
//   });
//   const { data } = useGetCurrentLocation();
//   const [otp, setOtp] = useState("");
//   const [otpLoading, setOtpLoading] = useState(false);
//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       country_code: country_code
//         ? country_code
//         : !country_code && phone
//         ? formData.country_code
//         : data?.country_code,
//       phone: phone || "",
//     }));
//   }, [country_code, data?.country_code, formData.country_code, phone]);

//   const handleSubmitPhone = async (e) => {
//     e.preventDefault();
//     setPhoneLoading(true);
//     try {
//       const res = await axiosInstance.post(
//         `/${localStorage.getItem("userType")}/auth/change-phone`,
//         formData
//       );
//       if (res.status === 200) {
//         toast.success(res.data?.message);

//         setFormType("otp");
//       } else {
//         toast.error(t("somethingWentWrong"));
//         throw new Error();
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || t("somethingWentWrong"));
//     } finally {
//       setPhoneLoading(false);
//     }
//   };

//   const handleSubmitOTP = async (e) => {
//     e.preventDefault();
//     setOtpLoading(true);

//     try {
//       const res = await axiosInstance.post(
//         `/${localStorage.getItem("userType")}/auth/confirm-change-phone`,
//         { ...formData, token: otp }
//       );
//       if (res.status === 200) {
//         toast.success(res.data?.message);
//         setFormType("phone");
//         setOtp("");
//         setShowModal(false);
//       } else {
//         toast.error(t("somethingWentWrong"));
//         throw new Error();
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || t("somethingWentWrong"));
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   return (
//     <Modal
//       show={showModal}
//       onHide={() => {
//         setFormType("phone");
//         setShowModal(false);
//       }}
//       centered
//     >
//       {" "}
//       <Modal.Header className="pb-0" closeButton>
//         <h5>{t(`profile.changePhone`)}</h5>
//       </Modal.Header>
//       <Modal.Body>
//         {" "}
//         <div className="container p-0">
//           <div className="col-12">
//             {(formType === "phone" || !formType) && (
//               <form
//                 //    onSubmit={handleSubmitPhone}
//                 className="form"
//               >
//                 <div className="col-12 w-100">
//                   <div className="col-12 py-2 px-0">
//                     <PhoneInput
//                       label={t("auth.phone")}
//                       required
//                       type="number"
//                       id="phone"
//                       name="phone"
//                       placeholder={t("auth.phone")}
//                       value={formData.phone}
//                       countryCode={formData.country_code}
//                       onChange={(e) => handleChange(e, setFormData)}
//                       onSelect={(code, setShow) => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           country_code: code,
//                         }));
//                         setShow(false);
//                       }}
//                     />
//                   </div>
//                   <div className="col-12 py-2 px-0">
//                     <div className="btns">
//                       <SubmitButton
//                         text={t("sendOTP")}
//                         className="wizard_btn next"
//                         loading={phoneLoading}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             )}
//             {formType === "otp" && (
//               <form className="form" onSubmit={handleSubmitOTP}>
//                 <div className="col-12 w-100">
//                   <div className="col-12 py-2 px-0">
//                     <h5>{t("auth.confirmOTPTitle")}</h5>
//                     <span>{t("auth.confirmPhoneOTPSubtitle")}</span>
//                   </div>
//                   <div className="col-12 py-2 px-0">
//                     <OtpContainer formData={otp} setFormData={setOtp} />
//                   </div>
//                   <div className="col-12 py-2 px-0">
//                     <div className="btns">
//                       <SubmitButton
//                         text={t("verify")}
//                         className="wizard_btn next"
//                         loading={otpLoading}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }
// "use client";

import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useGetCurrentLocation from "@/hooks/queries/settings/useGetCurrentLocation";
import { useTranslations } from "next-intl";
import SubmitButton from "../forms/SubmitButton";
import PhoneInput from "../forms/PhoneInput";
import OtpContainer from "../forms/OtpContainer";
import {
  changePhoneAction,
  verifyOtpAction,
} from "@/libs/actions/profileActions";
import { DevTool } from "@hookform/devtools";

// Zod Schema
const phoneSchema = z.object({
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(15, "Phone number is too long"),
  country_code: z.string().min(1, "Select country code"),
});

export default function ChangePhoneModal({ showModal, setShowModal }) {
  const t = useTranslations();
  const [formType, setFormType] = useState("phone");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [otp, setOtp] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const { data: locationData } = useGetCurrentLocation();
  useEffect(() => {
    if (locationData) {
      setSelectedCountry(locationData);
    }
  }, [locationData]);

  useEffect(() => {
    if (selectedCountry) {
      register("country_code", {
        required: true,
        value: selectedCountry.country_code,
      });
    }
  }, [selectedCountry]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      country_code: "965",
    },
  });
  const { phone, country_code } = watch();
  const handlePhoneSubmit = async (data) => {
    setPhoneLoading(true);
    console.log(data);

    try {
      const res = await changePhoneAction(data);
      toast.success(res?.message);
      setFormType("otp");
    } catch (error) {
      toast.error(error?.message || t("somethingWentWrong"));
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    const body = {
      phone,
      country_code,
      token: otp,
    };
    console.log(body);

    try {
      const res = await verifyOtpAction(body);

      toast.success(res?.message);
      setFormType("phone");
      setOtp("");
      setShowModal(false);
      reset();
    } catch (error) {
      toast.error(error.message || t("somethingWentWrong"));
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setFormType("phone");
        setShowModal(false);
        reset();
      }}
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`profile.changePhone`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container p-0">
          <div className="col-12">
            {(formType === "phone" || !formType) && (
              <form onSubmit={handleSubmit(handlePhoneSubmit)} className="form">
                <div className="col-12 w-100">
                  <div className="col-12 py-2 px-0">
                    <Controller
                      name="country_code"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          label={""}
                          id="phone"
                          placeholder={t("auth.phone")}
                          selectedCountry={selectedCountry}
                          setSelectedCountry={setSelectedCountry}
                          limit={selectedCountry?.number_limit}
                          {...register("phone")}
                          onCountryChange={(country) =>
                            field.onChange(country?.country_code)
                          }
                          error={errors?.phone?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 py-2 px-0">
                    <div className="btns">
                      <SubmitButton
                        text={t("sendOTP")}
                        className="wizard_btn next"
                        loading={phoneLoading}
                      />
                    </div>
                  </div>
                </div>
                <DevTool control={control} />
              </form>
            )}

            {formType === "otp" && (
              <form className="form" onSubmit={handleOtpSubmit}>
                <div className="col-12 w-100">
                  <div className="col-12 py-2 px-0">
                    <h5>{t("auth.confirmOTPTitle")}</h5>
                    <span>{t("auth.confirmPhoneOTPSubtitle")}</span>
                  </div>
                  <div className="col-12 py-2 px-0">
                    <OtpContainer formData={otp} setFormData={setOtp} />
                  </div>
                  <div className="col-12 py-2 px-0">
                    <div className="btns">
                      <SubmitButton
                        text={t("verify")}
                        className="wizard_btn next"
                        loading={otpLoading}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
