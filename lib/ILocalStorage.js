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
            return !(window["localStorage"].getItem("logged_in") == null || window["localStorage"].getItem("logged_in") === false);
        }

        return true;
    }

    const getObj = (key) => {
        if (isBrowser) {
            return JSON.parse(getItem(key));
        }

        return {};
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
        syncSession
    };
};

export default useStorage;