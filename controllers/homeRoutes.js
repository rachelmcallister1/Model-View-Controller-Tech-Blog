const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts, 
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
    const postData = await Post.findByPk(req.params.id
    , {
      include: [ User, 
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log('post -----', post)
    // won't need to reference any login/session info in lines 80-83
    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err,"ERR++++++++")
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
