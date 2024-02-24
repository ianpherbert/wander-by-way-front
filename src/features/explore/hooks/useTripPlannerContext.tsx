import { useContext } from "react";
import { tripPlannerContext } from "../../../pages/ExplorePage";

export function useTripPlannerContext(){
    return useContext(tripPlannerContext);
}