// import components
import UserPerks from "./UserPerks";
import CompletedChores from "./CompletedChores";

// import context
import useGlobalContext from "../hooks/useGlobalContext";

const UserWrapper = () => {
  const { state } = useGlobalContext();
  const { userPerks, choreHistory } = state.userInventory;

  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #USER WRAPPER#
      </h1>
      <UserPerks perkData={userPerks} />
      <CompletedChores choreData={choreHistory} />
    </div>
  );
};

export default UserWrapper;
