import { useState } from "react";

import MenuItem from "./menuItem";

const ResourceCard = ({ group }: { group: any }) => {
  const [detailId, setDetailId] = useState<any>("");

  if (!group) return null;

  return (
    <div className="flex flex-col flex-1 gap-y-[15px] w-[283px]">
      {group.links &&
        group.links.map((gel: any) => (
          <MenuItem
            key={`children-item-${gel.id}`}
            item={gel}
            detailId={detailId}
            onMouseEnter={() => setDetailId(gel.id)}
            isResource
          />
        ))}
    </div>
  );
};

export default ResourceCard;
