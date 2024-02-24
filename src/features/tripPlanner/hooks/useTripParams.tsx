import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchItemType } from "../../common/SearchItemType";

const defaultSplit = [undefined, undefined];

export type TripParams = {
    originId?: string;
    originType?: SearchItemType;
    destinationId?: string;
    destinationType?: SearchItemType;
}

export default function useTripParams(): TripParams {
    const { origin, destination } = useParams();

    const [originId, originType] = useMemo(() => origin?.split("-") ?? defaultSplit, [origin]);
    const [destinationId, destinationType] = useMemo(() => destination?.split("-") ?? defaultSplit, [destination])

    return {
        originId,
        originType: originType ? originType as SearchItemType : undefined,
        destinationId,
        destinationType: destinationType ? destinationType as SearchItemType : undefined
    }
}