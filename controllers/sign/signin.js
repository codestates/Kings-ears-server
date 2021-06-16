const { user } = require('../../models');
const bcrypt = require('bcrypt');
const { comparebcrypt } = require('../../bcryptmodule')

const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../../token');

module.exports = async (req, res) => {

    const { email, password } = req.body;
    const userInfo = await user.findOne({
        where: { email: email }, raw: true
    })
    const dbpass = userInfo.password;
    // const pass = bcrypt.compareSync(password, dbpass);
    // user.instanceMethods.validPassword(password, dbpass);
   
    // const lalal = await userInfo.validPassword(password)
    // console.log(lala)
    
 
    if (userInfo && await comparebcrypt(password, dbpass)) {
        delete userInfo.password;
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);

        sendRefreshToken(res, refreshToken)
        sendAccessToken(res, accessToken);
    } else {
        res.status(404).send({
            message: 'No user data'
        })
    }

}