import { useTranslation } from "react-i18next";

import { SeeMore } from "@/components/comm/link/SeeMore";

const ImageCard = ({ group }: { group: any }) => {
  const { t } = useTranslation("header");

  if (!group) return null;

  return (
    <div className="flex flex-col flex-1 gap-y-[20px] w-[507px]">
      {group.mainIcon && (
        <div className="w-full h-[363px]">
          <img
            src={group.mainIcon}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="w-fit">
        <SeeMore
          textClassName="!text-[14px] !font-normal"
          href={group.link}
          text={t("viewMore")}
        />
      </div>
    </div>
  );
};

export default ImageCard;
