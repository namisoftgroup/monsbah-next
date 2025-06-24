import { API_URL } from "@/utils/constants";
import { refreshToken } from "@/utils/refreshTokens";
import { log } from "console";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const t = await getTranslations();
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  let userType = cookieStore.get("user_type")?.value;

  if (!token) {
    if (cookieStore.get("refreshToken")?.value) {
      const newTokenData = await refreshToken();
      if (newTokenData) {
        token = newTokenData.token;
        cookieStore.set("token", newTokenData.token, {
          path: "/",
          expires: new Date(newTokenData.expires),
          httpOnly: true,
          sameSite: "lax",
        });
      } else {
        cookieStore.delete("token");
        cookieStore.delete("refreshToken");
        return NextResponse.json({ message: "Unauthorized", status: 401 });
      }
    } else {
      return NextResponse.json(
        { message: "errors.noUserLoggedIn" },
        { status: 200 }
      );
    }
  }

  try {
    const res = await fetch(
      API_URL + `/${userType === "user" ? "client" : "company"}/auth/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("Profile data:", data);

    return NextResponse.json(
      { user: data?.data, token },
      { status: res.status }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "errors.somethingWentWrong", data: e },
      { status: 500 }
    );
  }
}
