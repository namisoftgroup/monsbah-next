"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { IoLanguage } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLanguageChange(lang) {
    router.replace(pathname, {
      locale: lang,
    });
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        aria-label="Language"
        id="dropdown-basic"
        className="link"
      >
        <IoLanguage />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange("ar")}>
          العربية
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange("en")}>
          English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
