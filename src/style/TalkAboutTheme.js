import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0097a7",
      light: "#56c8d8",
      dark: "#006978",
    },
    secondary: {
      main: "#43a047",
      light: "#76d275",
      dark: "#00701a",
    },
    background: {
      default: "#f5f5f5",
		},
		black: {
			main: "#212121",
      light: "#484848",
      dark: "#000000",
		},
		white: {
			main: "#f5f5f5",
			light: "#ffffff",
			dark: "#c2c2c2",
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
      lineHeight: 1,
      cursor: "default",
		},
  },
	test: {
		color: '#ff0000',
	}
});

export default theme;

