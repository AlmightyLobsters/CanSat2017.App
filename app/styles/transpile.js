const render = require('node-sass').render;
const join = require('path').join;
const fs = require('fs');

module.exports = function transpile(cb) {
    render({
        file: join(__dirname, './main.scss'),
        outputStyle: 'compressed'
    }, (err, result) => {
        if(err) console.log(err);
        else {
            if (!fs.existsSync(join(__dirname, '../../build'))) fs.mkdirSync(join(__dirname, '../../build'));
            if (!fs.existsSync(join(__dirname, '../../build/styles'))) fs.mkdirSync(join(__dirname, '../../build/styles'));
            fs.writeFile(join(__dirname, '../../build/styles/main.css'), result.css, err => {
                if (err) console.error(err);
                if (cb) cb();
            });
        }
    });
};
