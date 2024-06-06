import MainHighlights from "../components/MainHighlights";
import MainMenu from "../components/MainMenu";
import MainRecent from "../components/MainRecent";
import "./mainOverview.css";

const MainOverview: React.FC = () => {
    return (<div className="mainOverviewDiv">
        <MainMenu />
        <MainHighlights />
        <MainRecent />
    </div>)
}

export default MainOverview;