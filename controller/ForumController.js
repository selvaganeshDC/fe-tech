const { where, Sequelize } = require('sequelize');
const Forum = require('../model/ForumModel'); 
const ForumTake = require('../model/ForumTakesmodel');

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
    const forums = await Forum.findAll({
      where: {
        status: 'Not Taken'
      }
    });

    return res.status(200).json({ message: 'Forums retrieved successfully', data: forums });
  } catch (error) {
    console.error('Error fetching forums:', error);
    return res.status(500).json({ message: 'Failed to fetch forums', error: error.message });
  }
};

const takeForum = async (req, res) => {
  const forumId = req.params.id;
  const { distributor_id } = req.body;

  if (!forumId || !distributor_id) {
    return res.status(400).json({
      message: 'Forum ID and Distributor ID are required',
    });
  }

  try {
    const forum = await ForumTake.create({
      forum_id: forumId,
      distributor_id,
    });
    const updatedForum = await Forum.update(
      { status: 'Taken' }, // New status
      { where: { fid: forumId } } // Condition to identify the forum
    );

    // Check if the update was successful
    if (!updatedForum[0]) {
      return res.status(404).json({
        message: 'Forum not found or already taken',
      });
    }
    return res
      .status(201)
      .json({ message: 'Forum taken successfully', data: forum });
  } catch (error) {
    console.error('Error taking forum:', error);
    return res.status(500).json({
      message: 'Failed to take forum',
      error: error.message,
    });
  }
};

const showNotifyForDistributor = async (req, res) => {
  const userId = req.params.id;

  try {
    // Verify user exists first (commented out based on your current code)
    // const userExists = await User.findByPk(userId);
    // if (!userExists) {
    //   return res.status(404).json({
    //     message: 'User not found',
    //     data: null
    //   });
    // }

    const forums = await ForumTake.findAll({
      where: {
        distributor_id: userId
      },
      include: [
        {
          model: Forum,
          as: 'forum',
        }
      ],
      order: [['taken_at', 'DESC']] // Sort by most recent first
    });

    // Check if any forum takes exist
    if (forums.length === 0) {
      return res.status(200).json({
        message: 'No forum takes found for this user',
        data: []
      });
    }

    // Transform the results to a more readable format with comprehensive null checks
    const formattedForums = await Promise.all(
      forums.map(async (forum) => {
        if (!forum || !forum.forum) {
          console.warn('Incomplete forum take data:', forum);
          return null;
        }

        const forumData = await Forum.findOne({
          where: {
            fid: forum.forum_id
          }
        });

        // Ensure forumData exists before proceeding
        if (!forumData) {
          console.warn('Forum data not found for forum_id:', forum.forum_id);
          return null;
        }

        return {
          takeId: forum.ftid,
          forumId: forumData.fid,
          forumOwnerId: forumData.user_id,
          takenAt: forum.taken_at
        };
      })
    );

    // Filter out null entries
    const validForums = formattedForums.filter(forum => forum !== null);

    return res.status(200).json({
      message: 'Forums retrieved successfully',
      data: validForums
    });
  } catch (error) {
    console.error('Detailed error retrieving forums:', {
      message: error.message,
      stack: error.stack,
      userId: userId
    });

    return res.status(500).json({
      message: 'Failed to retrieve forums',
      error: {
        message: error.message,
        name: error.name
      }
    });
  }
};


module.exports = {
  addForum,
  viewForums,
  takeForum,
  showNotifyForDistributor
};
