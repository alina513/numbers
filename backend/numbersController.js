const { NumberModel } = require("./numbers.js");
const HttpError = require("./HttpError.js");
const ctrlWrapper = require("./ctrlWrapper.js");

const getNumber = async (req, res) => {
  const referer = req.get("Referer");
  const acceptHeader = req.get("Accept");
  if (!referer && acceptHeader && acceptHeader.includes("text/html")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const result = await NumberModel.find();
  res.json(result);
};

const updateNmber = async (req, res) => {
  const { number } = req.body;

  const result = await NumberModel.findOneAndUpdate(
    {},
    { number },
    { new: true }
  );

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = {
  getNumber: ctrlWrapper(getNumber),
  updateNmber: ctrlWrapper(updateNmber),
};
