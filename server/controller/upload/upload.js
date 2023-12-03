module.exports = async (Model, id, file, filters) => {
  try {
    if (filters !== {}) {
      u = await Model.findOne({ where: { id } });
    } else {
      u = await Model.findOne(filters);
    }
    u.image = file;
    await u.save();
    return { go: file };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
};
