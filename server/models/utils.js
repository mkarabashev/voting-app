export default instance => (propName, cb) => instance.validate(
  function validate (err) {
    expect(err.errors[propName]).to.exist;
    cb();
  });
