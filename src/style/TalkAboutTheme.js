import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#313628",
      light: "#5a6050",
      dark: "#091000",
    },
    secondary: {
      main: "#c8dd9d",
      light: "#fbffce",
      dark: "#97ab6e",
    },
    background: {
      default: "#313628",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Fredoka One"],
    h2: {
      fontFamily: "Fredoka One",
    },
    overline: {
      fontFamily: "Fredoka One",
      fontSize: 16,
      paddingLeft: 5,
      marginTop: 7,
      marginBottom: 7,
      lineHeight: 1,
      cursor: "default",
    },
  },
  miniTitle: {
    fontFamily: "Fredoka One",
    fontSize: 16,
    paddingLeft: 5,
    marginTop: 7,
    marginBottom: 7,
    lineHeight: 1,
    cursor: "default",
  },
});

export default theme;
