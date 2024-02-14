import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import useTripParams from "../features/tripPlanner/useTripParams";

export default function TripPlannerPage(){
    const {originId, destinationId} = useTripParams();

    return <Stack>
        {originId} - - {destinationId}
    </Stack>
}