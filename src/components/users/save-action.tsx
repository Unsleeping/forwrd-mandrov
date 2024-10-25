import { getEmptyAndInvalidFieldsCount } from "@/_pages/users/utils";
import { Button } from "@/components/ui/button";
import useNormalizedData from "@/hooks/useNormalizedData";

const SaveAction = () => {
  const normalizedData = useNormalizedData();

  const { emptyFieldsCount, invalidFieldsCount } =
    getEmptyAndInvalidFieldsCount(normalizedData);

  const isSavedBtnDisabled = emptyFieldsCount !== 0 || invalidFieldsCount !== 0;
  return (
    <>
      <div className="flex flex-wrap">
        <span>{`Errors: Empty Fields - ${emptyFieldsCount},`}</span>
        <span>&nbsp;{`Invalid Fields - ${invalidFieldsCount}`}</span>
      </div>
      <Button
        type="submit"
        className="my-4 w-fit"
        disabled={isSavedBtnDisabled}
      >
        Save Changes
      </Button>
    </>
  );
};

export default SaveAction;
