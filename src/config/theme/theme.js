import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#c79efc",
            dark: "#825db0",
            main: "#ba86fc",
        },
        secondary: {
            light: "#87f3be",
            dark: "#49a879",
            main: green["A200"],
        },
    },
    props: {
        MuiButton: {
            variant: "contained",
        },
        MuiFab: {
            color: "secondary",
        },
    },
});

theme.overrides = {
    ...theme.overrides,
    MuiFab: {
        ...theme.MuiFab,
        root: {
            ...theme.root,
            position: "fixed",
            bottom: theme.spacing(10),
            right: theme.spacing(4),
        },
    },
};

export default theme;
