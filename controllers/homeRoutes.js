const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
//for getting all posts 
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [User]
    })
    const posts = dbPostData.map((post) => post.get({ plain: true }))
    res.render('all-posts', { posts })
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/dashboard', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [User]
    })
    const posts = dbPostData.map((post) => post.get({ plain: true }))
    res.render('all-user-posts', {
      posts,
      layout: "dashboard",
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/dashboard/new', async (req, res) => {
//   try {
//     res.render('new-post', {
//       layout: "dashboard",
//     })
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// })

router.get('/', async (req, res) => {
  try {
    // // Get all projects and JOIN with user data
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      // projects, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//67-87 block is similar to what's needed to get all posts by id. reuse: dbPostData instead of postData
router.get('/post/:id', async (req, res) => {
  console.log("___Post___",req.params.id)
  try {
    const postData = await Post.findByPk(req.params.id)
    // , {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    const project = projectData.get({ plain: true });
    console.log('project -----', project)
    // won't need to reference any login/session info in lines 80-83
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
