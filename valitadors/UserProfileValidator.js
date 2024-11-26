const { body, param, validationResult } = require('express-validator');

// User Profile Validation Rules
const userProfileValidationRules = () => {
    return [
        body('user_id')
            .notEmpty().withMessage('User ID is required')
            .isInt({ min: 1 }).withMessage('Invalid User ID')
            .toInt(),
        
        body('full_name')
            .optional({ checkFalsy: true })
            .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters.')
            .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters and spaces.'),
        
        body('mobile_number')
            .optional({ checkFalsy: true })
            .isMobilePhone('any').withMessage('Please provide a valid mobile number.')
            .isLength({ min: 10, max: 15 }).withMessage('Mobile number must be between 10 and 15 characters.'),
        
        body('email')
            .optional({ checkFalsy: true })
            .isEmail().withMessage('Please provide a valid email address.')
            .normalizeEmail(),
        
        body('company_name')
            .optional({ checkFalsy: true })
            .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters.')
            .matches(/^[a-zA-Z0-9\s&.-]+$/).withMessage('Company name contains invalid characters.'),
        
        body('credit_limit')
            .optional({ checkFalsy: true })
            .isFloat({ min: 0 }).withMessage('Credit limit must be a positive number.')
            .toFloat(),
        
        body('address')
            .optional({ checkFalsy: true })
            .isLength({ min: 10, max: 500 }).withMessage('Address must be between 10 and 500 characters.'),
        
        body('pincode')
            .optional({ checkFalsy: true })
            .isPostalCode('IN').withMessage('Please provide a valid Indian pincode.')
            .isLength({ min: 6, max: 6 }).withMessage('Pincode must be 6 digits.'),
        
        body('landmark')
            .optional({ checkFalsy: true })
            .isLength({ max: 100 }).withMessage('Landmark cannot exceed 100 characters.')
            .matches(/^[a-zA-Z0-9\s,-]+$/).withMessage('Landmark contains invalid characters.'),
        
        body('city')
            .optional({ checkFalsy: true })
            .isLength({ min: 2, max: 50 }).withMessage('City name must be between 2 and 50 characters.')
            .matches(/^[a-zA-Z\s]+$/).withMessage('City name can only contain letters and spaces.'),
        
        body('state')
            .optional({ checkFalsy: true })
            .isLength({ min: 2, max: 50 }).withMessage('State name must be between 2 and 50 characters.')
            .matches(/^[a-zA-Z\s]+$/).withMessage('State name can only contain letters and spaces.')
    ];
};

// Profile Update Validation Middleware
const validateUserProfile = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next();
};

module.exports = {
    userProfileValidationRules,
    validateUserProfile
};