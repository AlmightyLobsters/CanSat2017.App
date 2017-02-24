import path from 'path';
import url from 'url';
import { app, crashReporter, BrowserWindow, Menu, screen } from 'electron';
import wallpaper from 'wallpaper';
import sizeOf from 'image-size';
import sharp from 'sharp';

const isDevelopment = (process.env.NODE_ENV === 'development');

let scrWidth;
let scrHeight;
let wallpprScaledWidth;
let wallpprScaledHeight;
let wallpprYDelta;

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

wallpaper.get().then(wpPath => {
    sharp(wpPath)
    .blur(11)
    .toFile(path.join(__dirname, `./cache/wallpaper${path.extname(wpPath)}`));
});

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
        const [xPos, yPos] = mainWindow.getPosition();
        mainWindow.webContents.executeJavaScript(`document.body.style.backgroundPosition = "${-xPos - 7}px ${-yPos - 7 - 40 - wallpprYDelta}px";`);
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
        wallpaper.get().then(wpPath => {
            const { width: imgWidth, height : imgHeight } = sizeOf(wpPath);
            [scrWidth, scrHeight] = [screen.getPrimaryDisplay().size.width, screen.getPrimaryDisplay().size.height];
            wallpprScaledWidth = scrWidth;
            wallpprScaledHeight = wallpprScaledWidth * imgHeight / imgWidth;
            wallpprYDelta = (wallpprScaledHeight - scrHeight) / 2;
            const [xPos, yPos] = mainWindow.getPosition();
            console.log(wallpprYDelta);
            mainWindow.webContents.executeJavaScript(`
                document.body.style.backgroundImage = "url(./cache/wallpaper${path.extname(wpPath)})";
                document.body.style.backgroundSize = "${wallpprScaledWidth}px ${wallpprScaledHeight}px";
                document.body.style.backgroundPosition = "${-xPos - 7}px ${-yPos - 7 - 40 - wallpprYDelta}px"; // TODO: Figure out the meaning of the magical number 29
            `);
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
