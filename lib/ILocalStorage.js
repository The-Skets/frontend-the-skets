import ApiSyncSession from "./ApiSyncSession";

const useStorage = () => {
    const isBrowser = (() => typeof window !== 'undefined')();

    const syncSession = () => {
        if (isBrowser && !window["sessionStorage"]["synced"]) {
            ApiSyncSession((resp) => {
                if (resp.status == "failure") {
                    if (isLoggedIn()) {
                        logout();
                    }

                    window["sessionStorage"]["synced"] = "true";
                } else {
                    setItem("logged_in", "true");
                    setObj("profile", resp["session"]);
                    window["sessionStorage"]["synced"] = "true";
                }
            })
        }
    }

    const forceSyncSession = () => {
        ApiSyncSession((resp) => {
            if (resp.status == "failure") {
                if (isLoggedIn()) {
                    logout();
                }
            } else {
                setItem("logged_in", "true");
                setObj("profile", resp["session"]);
            }
        })
    }

    const getItem = (key) => {
        return isBrowser ? window["localStorage"].getItem(key) : '';
    };

    const setItem = (key, value) => {
        if (isBrowser) {
            window["localStorage"].setItem(key, value);
            return true;
        }
        return false;
    };

    const removeItem = (key) => {
        if (isBrowser) {
            window["localStorage"].removeItem(key);
            return true;
        }
        return false;
    };

    const logout = () => {
        setItem("logged_in", false);
        removeItem("profile");
    }

    const isLoggedIn = () => {
        if (isBrowser) {
            return !(window["localStorage"].getItem("logged_in") == null || window["localStorage"].getItem("logged_in") === false || window["localStorage"].getItem("logged_in") === "false");
        }

        return true;
    }

    const isAdmin = () => {
        if (isBrowser) {
            if (window["localStorage"].getItem("logged_in") == null || window["localStorage"].getItem("logged_in") === false || window["localStorage"].getItem("logged_in") === "false") {
                return false;
            }

            if (getObj("profile")["account_type"] === "Band Member" || getObj("profile")["account_type"] === "Admin") {
                return true;
            }

            return false;
        }

        return true
    }

    const getObj = (key) => {
        if (isBrowser) {
            return JSON.parse(getItem(key));
        }

        return {
            "name": "",
            "account_type": "",
            "email": "",
            "pfp_url": "",
            "registration_date": ""
        };
    }

    const setObj = (key, obj) => {
        if (isBrowser) {
            setItem(key, JSON.stringify(obj));
        }
    }

    const setLogin = (profile) => {
        setItem("profile", profile);
        setItem("logged_in", true);
    }

    return {
        getItem,
        setItem,
        removeItem,
        isLoggedIn,
        setLogin,
        logout,
        getObj,
        setObj,
        syncSession,
        forceSyncSession,
        isAdmin
    };
};

export default useStorage;