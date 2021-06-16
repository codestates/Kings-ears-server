const bcrypt = require('bcrypt');
// const { user } = require('../models')

module.exports =  {
    // comparebcrypt: async (req) => {
    //     let email, password;
    //     if (req.headers.password) {
    //         email = req.headers.email;
    //         password = req.headers.password;
    //     } else {
    //         email = req.body.email;
    //         console.log('@#####', email)
    //         password = req.body.password;
    //     }
    //     const userInfo = await user.findOne({
    //         where: { email: email }, raw: true
    //     })
    //     const dbpass = userInfo.password;
    //     const pass = bcrypt.compareSync(password, dbpass)
        
    //     return { pass, userInfo };
    // }
    comparebcrypt: async (password, dbpass) => {
        const pass = bcrypt.compareSync(password, dbpass) 
        return pass;
    },
    hashbcrypt: async (password) => {
        
        const salt = await bcrypt.genSaltSync(10, 'a');
        return bcrypt.hashSync(password, salt);
        
    },
    
}