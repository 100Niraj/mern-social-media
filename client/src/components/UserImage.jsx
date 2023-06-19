import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserImage = ({ image, size = "60px" }) => {
// const BASE_URL = useSelector((state) => state.BASE_URL);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;