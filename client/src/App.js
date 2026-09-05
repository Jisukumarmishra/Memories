
import React from "react";
import {
  Container,
  AppBar,
  Grow,
  Typography,
  Grid,
} from "@mui/material";

import Posts from "./componenets/Posts/Posts";
import Form from "./componenets/Form/Form";
import memories from "./images/memories.png";

const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: "15px",
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: "rgba(0,183,255,1)",
          }}
        >
          Memories
        </Typography>

        <img
          src={memories}
          alt="memories"
          height="60"
          style={{
            marginLeft: "15px",
          }}
        />
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid size={{ xs: 12, sm: 7 }}>
              <Posts />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
