/*
* @Author: lsx
* @Date:   2021-06-15 10:39:31
* @Last Modified by:   smallsky
* @Last Modified time: 2021-06-15 10:53:38
*/
module.exports = {
    module: {
        rules: [
            {
                test: /index\.js$/,
                use: ['./loaders/loader1', './loaders/loader2']
            },
            {
                test: /\.js$/,
                use: ['./loaders/loader3', './loaders/loader4']
            }
        ]
    }
};