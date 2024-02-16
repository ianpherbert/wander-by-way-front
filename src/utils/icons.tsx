import { DirectionsBoat, DirectionsBus, Flight, LocationCity, Train } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { RouteSearchRouteType } from "../features/tripPlanner/RouteSearchResult";


export const PlaneIcon = ({...props}: SvgIconProps) => <Flight {...props}/>;
export const TrainIcon = ({...props}: SvgIconProps) => <Train {...props}/>;
export const CityIcon = ({...props}: SvgIconProps) => <LocationCity {...props}/>;
export const BusIcon = ({...props}: SvgIconProps) => <DirectionsBus {...props}/>;
export const BoatIcon= ({...props}: SvgIconProps) => <DirectionsBoat {...props}/>;

export const routeSearchRouteTypeIcons : {[key in RouteSearchRouteType] : JSX.Element} = {
    [RouteSearchRouteType.BUS]: <BusIcon/>,
    [RouteSearchRouteType.FERRY]: <BoatIcon/>,
    [RouteSearchRouteType.OTHER]: <CityIcon/>,
    [RouteSearchRouteType.PLANE]: <PlaneIcon/>,
    [RouteSearchRouteType.TRAIN]: <TrainIcon/>
}