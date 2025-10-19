import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

import Close from "@/components/Icons/Close";
import { changeLanguage } from "@/i18n";
import { cookieName, langs, LanguageType } from "@/i18n/settings";

const MobileLanguagePopover = ({
  isOpen,
  close,
}: {
  isOpen: true;
  close: () => void;
}) => {
  const [_, setCookies] = useCookies();

  const { t, i18n } = useTranslation("header");
  const handleChangeLanguage = async (type: LanguageType) => {
    await changeLanguage(type);
    setCookies(cookieName, type);
  };

  const currentLanguage = useMemo(() => {
    const fallback = langs.find((item) => item.type === LanguageType.en);
    return (
      langs.find((item) => {
        return item.type === i18n.language;
      }) || fallback
    );
  }, [i18n.language]);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => close()}
    >
      <DialogBackdrop className="fixed inset-0 bg-b1 opacity-70 backdrop-blur-[10px] z-[2] w-screen h-screen" />
      <DialogPanel
        transition
        className="p-[20px] h-screen w-[68vw] !max-h-screen fixed right-0 !top-0 !left-[unset] z-[9999] shadow-[0px_10px_32px_0px_#1F1F1F26] rounded-l-[16px] bg-b1 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        <div className="flex mb-4 items-center justify-end h-[24px]">
          <Close
            className="text-[#8E8E92]"
            onClick={() => {
              // setIsOpen(false)
              close();
            }}
          ></Close>
        </div>
        <div className="">
          {langs &&
            langs.map((el) => (
              <div
                onClick={() => {
                  handleChangeLanguage(el.type);
                  close();
                }}
                className={clsx(
                  `px-[10px] py-[8px] hover:text-t1 hover:bg-b3 rounded-[8px] cursor-pointer`,
                  {
                    "bg-b3 text-t1": currentLanguage?.type === el.type,
                  }
                )}
                key={`lang-item-${el.name}`}
              >
                {el.name}
              </div>
            ))}
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileLanguagePopover;
