import "../../styles/workspaceStyles/searchForBoards.css";
import { BoardInterface } from "../../interfaces/WorkspaceInterface";

interface SearchForBoardsInterface {
  boards: BoardInterface[] | undefined;
  showSearchedBoards: (searchingValue: string) => void;
}

const SearchForBoards: React.FC<SearchForBoardsInterface> = ({
  showSearchedBoards,
  boards,
}) => {
  const handleSearchValueChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    showSearchedBoards(e.currentTarget.value);
  };

  return (
    <div className="searchBoardsDiv">
      {boards && (
        <form autoComplete="off">
          <input
            onChange={handleSearchValueChange}
            className="searchBoardsInput"
            placeholder="Поиск доски.."
            type="text"
            name="search"
          />
        </form>
      )}
    </div>
  );
};

export default SearchForBoards;
