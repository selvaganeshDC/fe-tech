const Distributor = require('../model/Distributorsmodel');
const DistributorImage = require('../model/DistributorImagesmodel');
const { Op } = require('sequelize');


// Add a new distributor with an image
exports.addDistributor = async (req, res) => {
        try {
            // Create the distributor
            const distributor = await Distributor.create(req.body);

            if (req.files && req.files.length > 0) {
                const imageEntries = req.files.map((file) => ({
                    distributor_id: distributor.did,
                    image_path: file.path,
                }));

                await DistributorImage.bulkCreate(imageEntries);
            }

            res.status(201).json({ message: 'Distributor added successfully', distributor });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

// Get all distributors
exports.getAllDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.findAll({
            include: [
                { model: DistributorImage,
                    as: 'image',        
                    attributes: ['image_path'],  
                 }
            ]
        });
        res.status(200).json(distributors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a distributor by ID
exports.getDistributorById = async (req, res) => {
    try {
        const distributor = await Distributor.findByPk(req.params.id, {
            include: [
                { model: DistributorImage,
                    as: 'image',        
                    attributes: ['image_path'],  
                 }
            ]
        });
        if (distributor) {
            res.status(200).json(distributor);
        } else {
            res.status(404).json({ message: 'Distributor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a distributor
exports.updateDistributor = async (req, res) => {
    try {
        const distributor = await Distributor.findOne({
            where: { did: req.params.id },
            include: [{
                model: DistributorImage,
                as: 'image',
                attributes: ['image_path']
            }]
        });

        if (!distributor) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

        // Update distributor data if provided
        if (Object.keys(req.body).length > 0) {
            await distributor.update(req.body);
        }

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            // Add new images
            const newDistributorImages = req.files.map(file => ({
                distributor_id: distributor.did,
                image_path: file.path
            }));
            await DistributorImage.bulkCreate(newDistributorImages);
        }

        // Fetch updated distributor with images
        const updatedDistributor = await Distributor.findOne({
            where: { did: req.params.id },
            include: [{
                model: DistributorImage,
                as: 'image',
                attributes: ['image_path']
            }]
        });

        res.status(200).json({
            message: 'Distributor updated successfully',
            distributor: updatedDistributor
        });

    } catch (error) {
        console.error('Error updating distributor:', error);
        res.status(500).json({
            error: error.message || 'Error updating distributor'
        });
    }
};



// Delete a distributor
exports.deleteDistributor = async (req, res) => {
    try {
        const distributor = await Distributor.findByPk(req.params.id);
        if (distributor) {
            await distributor.destroy();
            res.status(204).json({ message: 'Distributor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Distributor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for distributors by query
exports.searchDistributors = async (req, res) => {
    try {
        const { query } = req.query;
        const distributors = await Distributor.findAll({
            where: {
                [Op.or]: [
                    { companyname: { [Op.like]: `%${query}%` } },
                    { contact_person_name: { [Op.like]: `%${query}%` } },
                    { location: { [Op.like]: `%${query}%` } },
                ]
            },
            include: [
                {
                    model: DistributorImage,
                    as: 'image',
                    attributes: ['image_path']
                }
            ]
        });
        
        if(distributors.length === 0){
            return res.status(404).json({message:"Distributor Not found"});
        }

        res.status(200).json(distributors);
    } catch (error) {
        console.error('Error in searchDistributors:', error);
        res.status(500).json({ error: error.message });
    }
};
