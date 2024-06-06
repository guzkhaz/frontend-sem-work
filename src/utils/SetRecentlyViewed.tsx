import { RecentlyViewedInterface } from "../interfaces/RecentlyViewedInterface";

export const handleSetRecentlyViewed = (
  recents: RecentlyViewedInterface[],
  name: string | undefined,
  background: string | undefined,
  workspace: string | undefined,
  workspaceId: string | undefined,
  id: string | undefined,
  setRecentlyViewed: React.Dispatch<
    React.SetStateAction<RecentlyViewedInterface[]>
  >
) => {
  if (!recents.some((boards) => boards.name === name)) {
    if (recents.length <= 3) {
      setRecentlyViewed((rw) => [
        ...rw,
        {
          name: name,
          background: background,
          workspace: workspace,
          workspaceId: workspaceId,
          id: id,
        },
      ]);
    } else {
      recents.pop();
      setRecentlyViewed((rw) => [
        {
          name: name,
          background: background,
          workspace: workspace,
          workspaceId: workspaceId,
          id: id,
        },
        ...rw,
      ]);
    }
  }
};

export const handleRemoveRecentlyViewed = (
  recents: RecentlyViewedInterface[],
  id: string,
  setRecentlyViewed: React.Dispatch<
    React.SetStateAction<RecentlyViewedInterface[]>
  >
) => {
  const removedRecent = recents.filter((board) => board.id !== id);

  setRecentlyViewed(removedRecent);
};

export const handleRemoveAllRecentsFromDeletedBoard = (
  recents: RecentlyViewedInterface[],
  workspaceName: string,
  setRecentlyViewed: React.Dispatch<
    React.SetStateAction<RecentlyViewedInterface[]>
  >
) => {
  const removedRecent = recents.filter(
    (board) => board.workspace !== workspaceName
  );

  setRecentlyViewed(removedRecent);
};
