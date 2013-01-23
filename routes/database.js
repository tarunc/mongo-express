exports.viewDatabase = function(req, res) {
  var ctx = {
    title: 'Viewing Database: ' + req.dbName,
    colls: req.collections[req.dbName]
  };
  res.render(MOGNO_EXPRESS_VIEW_DIR + 'database.html', ctx);
}
