import MainInfoTab from "@/components/profile/main/MainInfoTab";
import { redirect } from "next/navigation";
import React from "react";

export default function ProfileRootPage() {
  return redirect("/profile/main");
}
