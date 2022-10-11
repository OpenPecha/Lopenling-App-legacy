// @flow
import React, { Suspense, lazy } from "react";
import classnames from "classnames";
import type { AppState } from "reducers";
import * as actions from "actions";
import styles from "./App.css";
import utilStyles from "css/util.css";
import favimage from "images/favicon.png";
import HomePage from "components/HomePage";
import Favicon from "react-favicon";
import { history } from "redux-first-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backdrop, Box, CircularProgress, Skeleton } from "@mui/material";

// import Switcher from "./Switcher";
// import Header from "components/Header";
const Switcher = lazy(() => import("./Switcher"));
const Header = lazy(() => import("components/Header"));

type Props = {
    title: string,
    selectedText: {},
    dispatch: (action: actions.Action) => void,
    onChangedTextWidth: (width: number) => void,
    onChangedTextListVisible: (isVisible: boolean) => void,
};

function setTitle(title: string) {
    document.title = title;
}

const App = (props: Props) => {
    let mode = props.theme;

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    navbar: {
                        main: mode !== "dark" ? "#FBFBFA" : "#303030",
                    },
                    links: {
                        main: mode !== "dark" ? "#666666" : "#eee",
                    },
                    heading: {
                        main: mode !== "dark" ? "#eee" : "#383838",
                    },
                    Imagenavbar: {
                        main: mode !== "dark" ? "#aaa" : "#383838",
                    },
                    texts: {
                        main: mode !== "dark" ? "#303030" : "#d3d3d3",
                    },
                },
                typography: {
                    button: {
                        fontWeight: "normal",
                        lineHeight: "normal",
                        textTransform: "capitalize",
                        textDecoration: "none",
                        letterSpacing: 0,
                        borderRadius: "4px",
                        fontFamily:
                            "'Qomolangma-UchenSarchen', 'Overpass', sans-serif",
                    },
                    h6: {
                        color: mode !== "dark" ? "#303030" : "#d3d3d3",
                    },
                },
                props: {
                    MuiButtonBase: {
                        // The properties to apply
                        disableRipple: true, // No more ripple, on the whole application!
                    },
                },
            }),
        [mode]
    );
    const [openEditor, setOpenEditor] = React.useState(false);
    setTitle(props.title);
    let SelectedText = props.selectedText;

    let url = history();
    if (!SelectedText) {
        setTitle("Parkhang");
    }
    React.useEffect(() => {
        if (SelectedText) {
            setOpenEditor(true);
        } else setOpenEditor(true);
    }, [SelectedText]);
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                }}
                className={classnames(
                    styles.container,
                    utilStyles.flex,
                    utilStyles.flexColumn
                )}
            >
                <Favicon url={favimage} />
                <Suspense
                    fallback={
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={true}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                >
                    <Header />
                    <Switcher />
                </Suspense>
            </Box>
        </ThemeProvider>
    );
};

export default App;

//   {
//       url.location.pathname === "/textSelection" ||
//       (url.location.pathname === "" && !SelectedText) ? (
//           <>
//               <ErrorBoundary>
//                   {/* check for any unknown error on Homepage without stopping renders */}
//                   <HomePage />
//               </ErrorBoundary>
//               <Stack
//                   style={{
//                       width: "100%",
//                       position: "fixed",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bottom: 0,
//                   }}
//               >
//                   <Box
//                       sx={{
//                           height: "100%",
//                           display: "flex",
//                           background: "#292826",
//                           width: "100%",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           height: 55,
//                       }}
//                   >
//                       <Typography
//                           textAlign={"center"}
//                           variant="h6"
//                           fontSize={{ md: "20px", xs: "10px" }}
//                           textTransform={"capitalize"}
//                           color="white"
//                       >
//                           Our Trusted partner
//                       </Typography>

//                       <img
//                           src={Indrajala}
//                           alt="indrajala logo"
//                           style={{
//                               objectFit: "contain",
//                               maxHeight: "100%",
//                               marginLeft: "40px",
//                           }}
//                       />
//                   </Box>
//                   <Marquee
//                       pauseOnHover={true}
//                       gradient={false}
//                       style={{
//                           background: "#292826",
//                           color: "white",
//                       }}
//                   >
//                       {prayer}
//                   </Marquee>
//               </Stack>
//           </>
//       ) : openEditor ? (
//           <Editor />
//       ) : (
//           <div>refresh</div>
//       );
//   }
