import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useMaterialUIController } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

const App = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      Welcome to To Market...
    </ThemeProvider>
  );
};

export default App;
