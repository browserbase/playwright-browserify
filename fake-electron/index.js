// fake-electron.js

module.exports = {
    app: {
        getPath: () => '',
        on: () => {},
        // Other necessary app methods...
    },
    BrowserWindow: class {
        loadURL() {}
        on() {}
        // Other necessary BrowserWindow methods...
    },
    // Other necessary Electron exports...
};
