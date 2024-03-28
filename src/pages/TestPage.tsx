import { Box } from "@mui/material";
import CenteredLoader from "../features/common/CenteredLoader";

export default function TestPage() {

    return (
        <Box height={"90vh"} width={500}>
            <CenteredLoader type="circular" longLoadText="Hello there, sorry this is taking so long qsducnbeuqnsdunqsudncqusdncuqsndc qsdfq sdf" longLoadTextDelay={3} longLoadSecondaryText="We are working on th qsdf qsd fqsdfez qqscce qz csdce qze cqze cq ze  cqecz q zdfze qze cqz zecqe e problem, but for now just kick back, relax and enjoy the loading" />
        </Box>
    )
}