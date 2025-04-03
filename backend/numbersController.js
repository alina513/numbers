const { Number } = require("./numbers.js");
const HttpError = require("./HttpError.js");
const ctrlWrapper = require("./ctrlWrapper.js");

const getNumber = async (req, res) => {
  const result = await Number.find();
  res.json(result);
};

const updateNmber = async (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ message: "Invalid number value" });
  }

  const result = await Number.findOneAndUpdate({}, { number }, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = {
  getNumber: ctrlWrapper(getNumber),
  updateNmber: ctrlWrapper(updateNmber),
};
