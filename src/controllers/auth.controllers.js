import {User} from '../models/user.model.js';
import {ApiReaponse} from '../utils/apiResponse.js';
import {ApiError} from '../utils/apiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {sendEmail} from '../utils/mail.js';

const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshTokens = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    }catch(error){
        throw new ApiError(500, 'Token generation failed', [error.message]);
    }
}


const register = asyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body;

        const existingUser = await User.findOne({
                $or: [{username}, {email}]
    });
    if (existingUser) {
        throw new ApiError(409, 'User already exists with this email', []);
    }

    const user = await User.create({
        username,
        email,
        password,
        isEmailVerified: false, 
    });
const {unHashedToken, hashedToken, tokenExpiry} =
    user.genrateTemporaryToken();

user.emailVerificationToken = hashedToken;
user.emailVerificationTokenExpiry = tokenExpiry;
await user.save({validateBeforeSave: false});
// Send verification email

await sendEmail({
    email: user?.email,
subject: `Please verify your email using this link`,
mailgenContent: emailVerificationMailgenContent(
    user.username,
    `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${unHashedToken}`
)
});
const createdUser = await User.findById(user._id).select('-password -refreshTokens -emailVerificationToken -emailVerificationTokenExpiry -passwordResetToken -passwordResetTokenExpiry');
if(!createdUser){
    throw new ApiError(500, 'User creation failed');
}
return res
.status(201)
.json(new ApiReaponse(200,
     {user: createdUser},
      'User registered successfully. Please check your email to verify your account'));


});
export{
    registerUser
}