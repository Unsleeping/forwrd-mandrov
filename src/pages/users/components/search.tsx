import * as React from "react";
import debounce from "debounce";

import { Input } from "@/components/ui/input";

type SearchProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<SearchProps> = ({ setSearchTerm }) => {
  const debouncedSearch = React.useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  return (
    <Input
      type="text"
      placeholder="Search users..."
      onChange={debouncedSearch}
      className="max-w-60"
    />
  );
};

export default Search;
