const express = require("express");
const {
  registerAstrologer,
  getAllAstrologers,
  deleteAstrologer,
  updateAstrologer,
  activeAstrologer,
  getAstrologer,
} = require("../controllers/astrologerController");
const multer = require("multer");
const router = express.Router();
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // You can choose the destination based on the file type or other conditions
      if (file.fieldname === "certificates") {
        cb(null, path.join(__dirname, "..", "uploads/certificates"));
      } else if (file.fieldname === "profilePic") {
        cb(null, path.join(__dirname, "../", "uploads/profilepic"));
      } else {
        cb(new Error("Invalid fieldname for destination"));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

router.route("/astrologer/register").post(
  upload.fields([{ name: "certificates" }, { name: "profilePic" }]),

  registerAstrologer
);
router.route("/astrologer/allAstrologers").get(getAllAstrologers);
router.route("/astrologer/getAstrologer/:id").get(getAstrologer);
router.route("/astrologer/delete/:id").delete(deleteAstrologer);
router.route("/astrologer/update/:id").put(updateAstrologer);
router.route("/astrologer/state/:id").put(activeAstrologer);
module.exports = router;
