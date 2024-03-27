import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { SearchItemType } from "../../common/SearchItemType";

const defaultSplit = [undefined, undefined];

export type TripParams = {
    originId?: string;
    originType?: SearchItemType;
    startDate?: string,
    valid: boolean;
}

export default function useExploreParams(): TripParams {
    const query = new URLSearchParams(useLocation().search);
    const origin = query.get("origin");
    const dateFrom = query.get("startDate") ?? undefined;
    const [originId, originType] = useMemo(() => origin?.split("-") ?? defaultSplit, [origin]);

    return {
        originId,
        originType: originType ? originType as SearchItemType : undefined,
        startDate: dateFrom,
        valid: Boolean(originId) && Boolean(originType) && Boolean(dateFrom)
    }
}