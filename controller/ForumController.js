const Forum = require('../model/ForumModel'); 

// Add a new forum
const addForum = async (req, res) => {
  try {
    const forum = await Forum.create(req.body);
    return res.status(201).json({ message: 'Forum created successfully', data: forum });
  } catch (error) {
    console.error('Error creating forum:', error);
    return res.status(500).json({ message: 'Failed to create forum', error: error.message });
  }
};

// View all forums
const viewForums = async (req, res) => {
  try {
    const forums = await Forum.findAll();

    return res.status(200).json({ message: 'Forums retrieved successfully', data: forums });
  } catch (error) {
    console.error('Error fetching forums:', error);
    return res.status(500).json({ message: 'Failed to fetch forums', error: error.message });
  }
};

module.exports = {
  addForum,
  viewForums,
};
