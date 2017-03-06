import path from 'path';
import url from 'url';
import { app, crashReporter, BrowserWindow, Menu, screen } from 'electron';
import wallpaper from 'wallpaper';
import fs from 'fs';
import sharp from 'sharp';
import fileUrl from 'file-url';

const isDevelopment = (process.env.NODE_ENV === 'development');
const localDir = isDevelopment ? __dirname : app.getPath('userData');

let mainWindow = null;
let forceQuit = false;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const extensions = [
        'REACT_DEVELOPER_TOOLS',
        'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
        try {
            await installer.default(installer[name], forceDownload);
        } catch (e) {
            console.log(`Error installing ${name} extension: ${e.message}`);
        }
    }
};

const blurBackground = async (radius, dir, name) => {
    const wpPath = await wallpaper.get();
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    return sharp(wpPath).blur(1 + radius / 2).jpeg().toFile(path.join(dir, `${name}.jpeg`));
};

crashReporter.start({
    productName: 'AlmightyApp',
    companyName: 'AlmightyLobsters',
    submitURL: 'http://almighty.lobsters.tech',
    uploadToServer: false
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    if (isDevelopment) {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 640,
        minHeight: 480,
        show: false
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('move', () => {
        const {x: boundX, y: boundY} = mainWindow.getBounds();
        const {x: contentBoundX, y: contentBoundY} = mainWindow.getContentBounds();
        const [xPos, yPos] = mainWindow.getPosition();
        mainWindow.webContents.executeJavaScript(`document.body.style.backgroundPosition = "${-xPos - (contentBoundX - boundX)}px ${-yPos - (contentBoundY - boundY)}px";`);
    });

    mainWindow.webContents.on('did-finish-load', async () => {
        mainWindow.show();
        mainWindow.focus();
        const {x: boundX, y: boundY} = mainWindow.getBounds();
        const {x: contentBoundX, y: contentBoundY} = mainWindow.getContentBounds();
        const [scrWidth, scrHeight] = [screen.getPrimaryDisplay().size.width, screen.getPrimaryDisplay().size.height];
        const [xPos, yPos] = mainWindow.getPosition();
        mainWindow.webContents.executeJavaScript(`
            document.body.style.backgroundSize = "${scrWidth}px ${scrHeight}px";
            document.body.style.backgroundPosition = "${-xPos - (contentBoundX - boundX)}px ${-yPos - (contentBoundY - boundY)}px";
        `);
        blurBackground(200, path.join(localDir, './cache'), 'wallpaper')
        .then(info => {
            mainWindow.webContents.executeJavaScript(`document.body.style.backgroundImage = 'url(${fileUrl(path.join(localDir, 'cache/wallpaper.jpeg'))})';`);
        });

    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
        if (process.platform === 'darwin') {
            mainWindow.on('close', function (e) {
                if (!forceQuit) {
                    e.preventDefault();
                    mainWindow.hide();
                }
            });

            app.on('activate', () => {
                mainWindow.show();
            });

            app.on('before-quit', () => {
                forceQuit = true;
            });
        } else {
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
        }
    });

    if (isDevelopment) {
    // auto-open dev tools
        mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
        mainWindow.webContents.on('context-menu', (e, props) => {
            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.inspectElement(props.x, props.y);
                }
            }]).popup(mainWindow);
        });
    }
});
