const { body, validationResult } = require('express-validator');

const shipmentValidationRules = () => [
    body('order_id').notEmpty().withMessage('Order ID is required'),
    body('distributor_name').notEmpty().withMessage('Distributor name is required'),
    body('product_id').isArray({ min: 1 }).withMessage('Product ID must be a non-empty array'),
    body('quantity').isArray({ min: 1 }).withMessage('Quantity must be a non-empty array'),
    body('price').isArray({ min: 1 }).withMessage('Price must be a non-empty array'),
    body('dispatch_date').isArray({ min: 1 }).withMessage('Dispatch Date must be a non-empty array'),
    body('dispatch_address').isArray({ min: 1 }).withMessage('Dispatch Address must be a non-empty array'),
    body('transport').isArray({ min: 1 }).withMessage('Transport must be a non-empty array'),
];

const validateShipment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    shipmentValidationRules,
    validateShipment
};
