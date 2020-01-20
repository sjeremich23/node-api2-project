/* eslint-disable no-unused-expressions */
const router = require("express").Router();
const Posts = require("./posts-model");
const validatePostsInfo = require("../../middleware/validatePostsInfo");

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(posts => {
      if (posts.length !== 0) {
        res.status(200).json({ posts });
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The post information could not be retrieved.",
        err
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(posts => {
      if (posts.length !== 0) {
        Posts.findPostComments(id).then(comments => {
          if (comments) {
            res.status(200).json({ comments });
          } else {
            res.status(404).json({
              errorMessage: "The post with the specified ID does not exist."
            });
          }
        });
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The post information could not be retrieved.",
        err
      });
    });
});

router.post("/", validatePostsInfo, (req, res) => {
  const { body } = req;

  Posts.insert(body)
    .then(posts => res.status(201).json({ posts }))
    .catch(err => {
      res.status(500).json({
        err,
        error: "There was an error while saving the post to the database"
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.findById(id)
      .then(post => {
        if (post.length !== 0) {
          Posts.insertComment(body)
            .then(comment => {
              res.status(201).json({ ...comment, ...body });
            })
            .catch(err => {
              res.status(500).json({
                errorMessage:
                  "There was an error while saving comment to database.",
                err
              });
            });
        } else {
          res.status(404).json({
            errorMessage: "The post with the specified ID does not exist "
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving comment to database",
          err
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(count => {
      count > 0
        ? res.status(200).json({ message: "Post Removed" })
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "The post could not be removed"
      });
    });
});

router.put("/:id", validatePostsInfo, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Posts.findById(id).then(posts => {
    !posts
      ? res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      : Posts.update(id, body).then(() => {
          res
            .status(200)
            .json({ message: `ID:${id} Post updated successfully` });
        });
  });
});

module.exports = router;
