const useStorage = () => {
    const isBrowser = (() => typeof window !== 'undefined')();

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
        logout
    };
};

export default useStorage;