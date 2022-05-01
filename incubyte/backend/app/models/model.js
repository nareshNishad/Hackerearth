module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      word: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Incubyte = mongoose.model("Incubyte", schema);
  return Incubyte;
};
