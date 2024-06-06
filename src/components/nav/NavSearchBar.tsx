import "../../styles/navStyles/navSearch.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Link } from "react-router-dom";
import { includesIgnoredCase } from "../../utils/IgnoreCase";

interface SearchedData {
  name: string;
  background: string;
  workspaceId: string;
  boardId: string;
}

const NavSearchBar: React.FC = () => {
  const [boards, setBoards] = useState<SearchedData[]>([]);
  const [filteredData, setFilteredData] = useState<SearchedData[]>([]);
  const [enteredValue, setEnteredValue] = useState<string>("");

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    const tempBoards: SearchedData[] = [];

    workspaces.forEach((board) => {
      board.workspaceBoards.forEach((boardData) => {
        tempBoards.push({
          name: boardData.boardName,
          background: boardData.boardBackground,
          workspaceId: boardData.boardWorkspace,
          boardId: boardData.boardId,
        });
      });
    });

    setBoards(tempBoards);
  }, [workspaces]);

  const handleSearchValueChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setEnteredValue(e.currentTarget.value);

    const filtered = boards.filter((board) => {
      return includesIgnoredCase(board.name, e.currentTarget.value);
    });

    setFilteredData(filtered);
  };

  const clearInput = () => {
    setEnteredValue("");
  };

  return (
    <div className="navSearchBarDiv">
      <form
        className="navigationSearchForm"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={enteredValue}
          onChange={handleSearchValueChange}
          className="navSearchInput"
          placeholder="Поиск.."
          type="text"
          name="search"
        />
        <i id="navSearchIcon" className="bi bi-search" />
      </form>

      {enteredValue && (
        <div className="searchHints">
          {filteredData.length === 0 ? (
            <p className="searchHint">No matching data</p>
          ) : (
            filteredData.map((data) => {
              return (
                <Link
                  onClick={clearInput}
                  className="searchingLink"
                  key={data.boardId}
                  to={`/board/${data.workspaceId}/${data.boardId}`}
                >
                  <div className="searchHintDiv">
                    <div
                      className="searchHintColorDiv"
                      style={{ background: `${data.background}` }}
                    />
                    <p className="searchHint">
                      {data.name} <span>board</span>
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
