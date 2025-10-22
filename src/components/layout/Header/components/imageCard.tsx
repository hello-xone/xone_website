import { useTranslation } from "react-i18next";

import { SeeMore } from "@/components/comm/link/SeeMore";

const ImageCard = ({
  group,
  onClose,
}: {
  group: any;
  onClose?: () => void;
}) => {
  const { t } = useTranslation("header");

  if (!group) return null;

  return (
    <div className="flex flex-col flex-1 gap-y-[26px] w-[507px]">
      <div className="flex flex-col gap-y-[14px]">
        {group.mainIcon && (
          <div className="w-full h-[363px]">
            <img
              src={group.mainIcon}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex flex-col gap-y-[14px]">
          <h3 className="text-t1 font-normal text-[14px]">
            {t(group.detailTitle)}
          </h3>
          <p className="text-t2 font-normal text-[12px] leading-[1.6]">
            {t(group.detailDesc)}
          </p>
        </div>
      </div>
      <div className="w-fit">
        <SeeMore
          textClassName="!text-[14px] !font-normal"
          href={group.moreLink}
          text={t("viewMore")}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ImageCard;
