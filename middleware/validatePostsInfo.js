/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
module.exports = (req, res, next) => {
  const { title, contents } = req.body;

  !title || !contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : next();
};
