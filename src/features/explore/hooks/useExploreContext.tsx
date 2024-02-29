import { useContext } from "react";
import { exploreContext } from "../../../pages/ExplorePage";

export function useExploreContext(){
    return useContext(exploreContext);
}