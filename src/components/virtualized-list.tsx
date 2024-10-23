import { Control, FieldArrayWithId } from "react-hook-form";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";

import { FormType } from "@/lib/types";
import { UserRow } from "@/pages/users/user-row";

const getSize = () => {
  if (window.innerWidth < 648) {
    return 393;
  }
  return 90;
};

type ItemDataType = FieldArrayWithId<FormType, "users", "id">[];

type VirtualizedListProps = {
  itemsCount: number;
  control: Control<FormType>;
  onRemove: (idx: number) => void;
  itemData: ItemDataType;
};

export const VirtualizedList = ({
  itemData,
  itemsCount,
  control,
  onRemove,
}: VirtualizedListProps) => (
  <div>
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          height={height}
          itemCount={itemsCount}
          // TODO: fix bug with resize
          itemSize={() => getSize()}
          width={width}
          itemData={itemData}
        >
          {({ index, style }) => (
            <UserRow
              index={index}
              style={style}
              onRemove={() => onRemove(index)}
              formControl={control}
            />
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  </div>
);
