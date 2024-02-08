import { DirectionsBoat, DirectionsBus, Flight, LocationCity, Train } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";


export const PlaneIcon = ({...props}: SvgIconProps) => <Flight {...props}/>;
export const TrainIcon = ({...props}: SvgIconProps) => <Train {...props}/>;
export const CityIcon = ({...props}: SvgIconProps) => <LocationCity {...props}/>;
export const BusIcon = ({...props}: SvgIconProps) => <DirectionsBus {...props}/>;
export const BoatIcon= ({...props}: SvgIconProps) => <DirectionsBoat {...props}/>;
