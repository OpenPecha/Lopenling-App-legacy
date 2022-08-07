// @flow
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import styles from "./Header.css";
import User from "lib/User";
import type { AppState } from "reducers";
import { FormattedMessage, injectIntl } from "react-intl";
import LocaleSwitcher from "components/LocaleSwitcher/LocaleSwitcher";
import NavigationButton from "components/UI/NavigationButton";
import AccountButton from "./AccountButton";
import AccountOverlay from "./AccountOverlay";
import {
    getTextListVisible,
    getAccountOverlayVisible,
    getUser,
    getActiveLocale,
} from "reducers";
import * as actions from "actions";
import lopenlingLogo from "images/lopenling_logo_173x.png";
import UserIcon from "images/discourse_user.svg";
import { NavLink } from "redux-first-router-link";
import TranslateButton from "components/utility/TranslateButton";
import { history } from "redux-first-router";
import Resources from "components/Resources";

import {
    Container,
    Button,
    Tooltip,
    Stack,
    Box,
    Menu,
    IconButton,
    MenuItem,
    Typography,
    Drawer,
} from "@mui/material";
import { Person as PersonIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useEffect } from "react";
type LoginProps = {
    successRedirect: string,
    csrfToken: string,
};

export const LoginControls = (props: LoginProps) => (
    <Stack direction="row" spacing={2}>
        <a href={SSO_SIGNUP_URL}>
            <Button
                variant="contained"
                style={{
                    padding: "6px 10px",
                    boxShadow:
                        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
            >
                <FormattedMessage id="header.signUp" />
            </Button>
        </a>

        <form method="post" action="/discourse/login_redirect/">
            {/* <IconButton>
                <UserIcon width="11" />
            </IconButton> */}
            <Button
                variant="contained"
                type="submit"
                style={{
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    boxShadow:
                        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
            >
                <PersonIcon style={{ height: 18, width: 19 }} />
                <FormattedMessage id="header.login" />
            </Button>
            <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value={props.csrfToken}
            />
            <input
                type="hidden"
                name="success_redirect"
                value={props.successRedirect}
            />
        </form>
    </Stack>
);

type LoggedInControlsProps = {
    user: User,
    overlayVisible: boolean,
    accountButtonClicked: () => void,
};

export const LoggedInControls = (props: LoggedInControlsProps) => (
    <div className={styles.controls}>
        <AccountButton
            name={props.user.name}
            onClick={props.accountButtonClicked}
        />
        <Menu
            id="account-menu"
            open={props.overlayVisible}
            // onClick={props.accountButtonClicked}
            onClose={props.accountButtonClicked}
            MenuListProps={{
                "aria-labelledby": "account-menu-button",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            style={{ top: 20 }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
        >
            <AccountOverlay top={60} right={0} user={props.user} />
        </Menu>
    </div>
);

type HeaderProps = {
    user: User,
    activeLocale: string,
    accountOverlayVisible: boolean,
    navigationButtonClicked: () => void,
    intl: { formatMessage: ({ [id: string]: string }) => string },
    accountButtonClicked: () => void,
    successRedirect: string,
    csrfToken: string,
};

export const Header = (props: HeaderProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    let locations = history();
    let controls = null;
    if (props.user.isLoggedIn) {
        controls = (
            <LoggedInControls
                user={props.user}
                overlayVisible={props.accountOverlayVisible}
                accountButtonClicked={props.accountButtonClicked}
            />
        );
    } else {
        controls = (
            <LoginControls
                successRedirect={props.successRedirect}
                csrfToken={props.csrfToken}
            />
        );
    }

    let toggleTitle = props.intl.formatMessage({
        id: "header.toggleTextList",
    });
    const image_location = lopenlingLogo;

    const LinkRef = React.forwardRef((props, ref) => (
        <div ref={ref}>
            <NavLink {...props} />
        </div>
    ));

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box
            sx={{
                width: "100vw",
            }}
            className={styles.header}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{
                    height: "100%",
                    width: "100%",
                    paddingInline: 2,
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        gap: 3,
                        display: { xs: "none", md: "flex" },
                        alignItems: { md: "center" },
                    }}
                >
                    {!locations.location.pathname.includes("/texts") && (
                        <NavLink to="/">
                            <div className={styles.logo}>
                                <img
                                    src={image_location}
                                    height="37"
                                    width={173}
                                    alt="parkhang-logo"
                                />
                            </div>
                        </NavLink>
                    )}

                    {locations.location.pathname.includes("/texts") && (
                        <NavigationButton
                            onClick={props.navigationButtonClicked}
                            className={styles.navigationButton}
                            title={toggleTitle}
                            isListVisible={props.textListVisible}
                        />
                    )}
                    <Box display={{ xs: "none", md: "flex" }}>
                        <Button
                            to={"/textSelection"}
                            style={{ color: "#676767" }}
                            component={LinkRef}
                            variant="text"
                        >
                            <FormattedMessage id={"header.texts"} />
                        </Button>
                        <Button
                            to={"/texts/2"}
                            style={{ color: "#676767" }}
                            component={LinkRef}
                            variant="text"
                            disabled
                        >
                            <FormattedMessage id={"header.editor"} />
                        </Button>
                        <Tooltip title="Forum">
                            <Button
                                href={"https://www.lopenling.org"}
                                style={{ color: "#676767" }}
                                variant="text"
                                component={"a"}
                            >
                                <FormattedMessage id={"lopenlingForum"} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button
                                to={"/textSelection"}
                                style={{ color: "#676767" }}
                                component={LinkRef}
                                variant="text"
                            >
                                <FormattedMessage id={"header.texts"} />
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button
                                href={"https://www.lopenling.org"}
                                style={{ color: "#676767" }}
                                variant="text"
                                component={"a"}
                            >
                                <FormattedMessage id={"lopenlingForum"} />
                            </Button>
                        </MenuItem>
                    </Menu>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ float: { sx: "right" } }}
                >
                    {/* <LocaleSwitcher /> */}
                    <TranslateButton />
                    {controls}
                </Stack>
            </Stack>

            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    open={props.textListIsVisible}
                    onClose={props.navigationButtonClicked}
                >
                    <Resources />
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

const mapStateToProps = (state: AppState): { user: User } => {
    const user = getUser(state);
    const activeLocale = getActiveLocale(state);
    const successRedirect = document.location.pathname;
    // TODO: move global CSRF_TOKEN into redux
    const csrfToken = CSRF_TOKEN;

    return {
        user: user,
        activeLocale: activeLocale,
        textListIsVisible: getTextListVisible(state),
        accountOverlayVisible: getAccountOverlayVisible(state),
        textListVisible: getTextListVisible(state),
        successRedirect: successRedirect,
        csrfToken: csrfToken,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        navigationButtonClicked: () => {
            dispatchProps.dispatch(
                actions.changedTextListVisible(!stateProps.textListIsVisible)
            );
        },
        accountButtonClicked: () => {
            dispatchProps.dispatch(
                actions.changedAccountOverlay(!stateProps.accountOverlayVisible)
            );
        },
    };
};

const HeaderContainer = connect(mapStateToProps, null, mergeProps)(Header);

export default injectIntl(HeaderContainer);
