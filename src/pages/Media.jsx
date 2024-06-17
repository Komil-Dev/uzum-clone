import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Media = () => {
  return (
    <>
      {/* 900px */}
      <Box
        display={{ xs: "block", sm: "block", md: "none" }}
        bgcolor={"blue"}
        padding={2}
        width={"100%"}
        position={"fixed"}
      ></Box>
      {/* 300px */}
      <Box
        display={{ xs: "block", sm: "none", md: "none" }}
        bgcolor={"blue"}
        padding={2}
        width={"100%"}
        position={"fixed"}
        bottom={0}
      ></Box>
      {/* Desc 1200px */}
      <Box
        display={{ xs: "none", sm: "none", md: "block" }}
        bgcolor={"red"}
        padding={2}
        width={"100%"}
        position={"fixed"}
      >
        <Stack direction={"row"} justifyContent={"space-between"} pl={2} pr={6}>
          <Stack bgcolor={"blue"} width={"50px"} height={"50px"} borderRadius={"100%"} />
          <Stack display={{ xs: "none", sm: "none", md: "flex" }} direction={"row"} gap={2} alignItems={"center"}>
            <Typography>Link</Typography>
            <Typography>Link</Typography>
            <Typography>Link</Typography>
            <Typography>Link</Typography>
            <Typography>Link</Typography>
          </Stack>

          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography>User</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Media;
