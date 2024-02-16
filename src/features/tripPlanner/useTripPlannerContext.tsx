import { useContext } from "react";
import { tripPlannerContext } from "../../pages/TripPlannerPage";

export function useTripPlannerContext(){
    return useContext(tripPlannerContext);
}