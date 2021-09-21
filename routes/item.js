const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Item = require("../model/item");
router.post("/item", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let item = new Item({
      name: req.body.name,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      description: req.body.description,
      quantity: req.body.quantity,
      type: req.body.type,
      locationIndex: req.body.locationIndex,
      price: req.body.price,
    });
    await item.save();
    res.send(item);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let item = await Item.find();
    res.send(item);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    console.log(item);
    await cloudinary.uploader.destroy(item.cloudinary_id);
    await item.remove();
    res.send("Item Deleted");
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    await cloudinary.uploader.destroy(item.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };
    item = await Item.findByIdAndUpdate(req.params.id, data, { new: true });
    res.send(item);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    res.send(item);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
