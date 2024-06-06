import MainPage from "./components/landingPage/MainPage";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";
import Board from "./components/board/Board";
import Nav from "./components/nav/Nav";
import MainOverview from "./components/landingPage/overview/MainOverview";
import MainBoardsOverview from "./components/landingPage/boards/MainBoardsOverview";
import NotFoundPage from "./components/NotFoundPage";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/Store";
import CreateBoardPopUp from "./components/popups/createBoard/CreateBoardPopUp";
import CreateWorkspacePopUp from "./components/popups/createWorkspace/CreateWorkspacePopUp";
import {
  hideCreateWorkspace,
  hideCreateBoard,
} from "./redux/features/popUpCreateComponentSlice";
import UseClickOutside from "./hooks/UseClickOutside";
import { RWProvider } from "./context/recentlyViewedContext";
import { HTProvider } from "./context/highlightedTaskContext";
import PopUpMessage from "./components/popups/PopUpMessage";

function App() {
  const dispatch = useDispatch();

  const createBoard = useSelector(
    (state: RootState) => state.create.createBoard
  );

  const createWorkspace = useSelector(
    (state: RootState) => state.create.createWorkspace
  );

  const createWorkspaceRef = useRef<HTMLDivElement>(null);
  const createBoardRef = useRef<HTMLDivElement>(null);

  const closeWorkspacePopUp = () => {
    dispatch(hideCreateWorkspace());
  };

  UseClickOutside(createWorkspaceRef, closeWorkspacePopUp);

  const closeBoardPopUp = () => {
    dispatch(hideCreateBoard());
  };

  UseClickOutside(createBoardRef, closeBoardPopUp);

  return (
    <RWProvider>
      <HTProvider>
        <div className="App">
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/overview" element={<MainOverview />} />
              <Route path="/boards" element={<MainBoardsOverview />} />
              <Route path="/workspace/:workspaceId" element={<Workspace />} />
              <Route path="/board/:workspaceId/:boardId" element={<Board />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {createWorkspace && (
              <CreateWorkspacePopUp forwardRef={createWorkspaceRef} />
            )}
            {createBoard && <CreateBoardPopUp forwardRef={createBoardRef} />}
            {<PopUpMessage />}
          </BrowserRouter>
        </div>
      </HTProvider>
    </RWProvider>
  );
}

export default App;
