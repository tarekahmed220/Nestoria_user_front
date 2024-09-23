<<<<<<< Updated upstream
function NotfountPage() {
  return <div>NotfountPage</div>;
}

export default NotfountPage;
=======
import React from "react";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";

const PageNotFound = () => {
    const translate = useSelector((state) => state.language.translation);

  const backgroundImage = "/images/home/2.jpg";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        margin: 0,
      }}
    >
      <Typography variant="h1" style={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        {translate.NotfountPage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {translate.Go_to_Home}
      </Button>
    </div>
  );
};

export default PageNotFound;
>>>>>>> Stashed changes
