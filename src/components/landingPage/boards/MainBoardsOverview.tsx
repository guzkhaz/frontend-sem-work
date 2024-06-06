import MainBoards from "../components/MainBoards";
import MainMenu from "../components/MainMenu";
import "./mainBoardsOverview.css";

const MainBoardsOverview: React.FC = () => {
    return (<div className="mainBoardsDiv">
        <MainMenu />
        <MainBoards />
    </div>)
}

export default MainBoardsOverview;