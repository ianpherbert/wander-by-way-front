import { Card, CardProps } from "@mui/material";
import { backgroundUrls, getBackgroundUrl } from "../../assets/images";

type WanderCardProps = Omit<CardProps, "background"> & {
    background?: keyof typeof backgroundUrls
}

export default function WanderCard({ children, background,  ...props }: WanderCardProps) {
    const sx = background ? {
        ...props.sx,
        backgroundImage: `url(${getBackgroundUrl(background)})`,
        backgroundSize: 'cover', // Cover the entire Card
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    } : props.sx
    return <Card {...props} sx={sx}>{children}</Card>
}
