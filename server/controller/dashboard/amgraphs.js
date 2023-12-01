const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { model, } = req.body;
	  length=9
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else {
    return res.sendStatus(404);
  }
  if (!length) {
    return res.sendStatus(404);
  }
  chart = await Model.findAll({
	  raw:true,
    attributes: [
      [db.fn("count", db.col("id")), "count"],
      [db.fn("extract", sequelize.literal('month FROM "createdAt"')), "month"],

      [db.fn("extract", sequelize.literal('year FROM "createdAt"')), "year"],
    ],
    group: ["month", "year"],
    order: [sequelize.literal("year"), sequelize.literal("month")],
  });
  if (chart.length == 0) {
    results = Array(length).fill(0);
  } else {

      const date = Date();
      const new_date = new Date(date);
      final_year = new_date.getFullYear();
      final_month = new_date.getMonth() + 1;
    //results = [];
     results = "0".repeat(length).split("");
    d = chart.slice(-length);
    d_length = d.length;
    m = final_month;
    y = final_year;
    res_index = 1;
    d_index = d.length - 1;
    while (true) {

        console.log(d[d_index]);
      val = 0;
      ex = false;
      if (
        m == parseInt(d[d_index].month) &&
        y == parseInt(d[d_index].year)
      ) {
        val = parseInt(d[d_index].count);

        d_index--;
        if (d_index < 0) {
		ex=1
        }

      }
      results[length - res_index] = val;
      res_index++;
     // console.log(res_index);
      if (res_index == length + 1) {
        break;
      }
	    if (ex===1){
		    break}
      m--;
      if (m == 0) {
        m = 12;
        y--;
      }

    }
  }

  return res.send({
    results,
  });
};
