const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  const length = 9;
  result = [];
  let filters = {
    raw: true,
    where: {
      SocieteId: req.societe,
	    admin:false
    },
    attributes: [
      [sequelize.fn("count", sequelize.col("Collaborateur.id")), "count"],
      [
        db.fn(
          "extract",
          sequelize.literal('month FROM "Collaborateur"."createdAt"')
        ),
        "month",
      ],

      [
        sequelize.fn(
          "extract",
          sequelize.literal('year FROM "Collaborateur"."createdAt"')
        ),
        "year",
      ],
    ],
    group: ["month", "year"],
    order: [sequelize.literal("year"), sequelize.literal("month")],
  };
  for (let index = 0; index < 2; index++) {
    if (index == 1) {
      filters = {
        raw: true,
        where: {
          SocieteId: req.societe,
		admin:false
        },
        include: {
          model: Session_Collab,
          attributes: [],
          required: true,
          include: {
            model: Proof,
            as: "certifs",
            attributes: [],
            where: {
              status: "accepted",
            },
          },
        },
        attributes: [
          [sequelize.fn("count", sequelize.col("Collaborateur.id")), "count"],
          [
            sequelize.fn(
              "extract",
              sequelize.literal(
                'month FROM "Session_Collabs->certifs"."createdAt"'
              )
            ),
            "month",
          ],
          [
            sequelize.fn(
              "extract",
              sequelize.literal(
                'year FROM "Session_Collabs->certifs"."createdAt"'
              )
            ),
            "year",
          ],
        ],
        group: ["month", "year"],
        order: [sequelize.literal("year"), sequelize.literal("month")],
      };
    }
    chart = await Collaborateur.findAll(filters);
    let results = "0".repeat(length).split("");
    if (chart.length > 0) {
      const date = Date();
       // (date);
      const new_date = new Date(date);
      final_year = new_date.getFullYear();
      final_month = new_date.getMonth() + 1;
      d = chart.slice(-length);
       // ("heeey", index, d);
      d_length = d.length;
       // (final_year, final_month);
      m = final_month;
      y = final_year;
      res_index = 1;
      d_index = d.length - 1;
      while (true) {
        val = 0;ex=0
         // (index, d[d_index], m, y);
        if (m == parseInt(d[d_index].month) && y == parseInt(d[d_index].year)) {
          val = parseInt(d[d_index].count);
          d_index--;
          if (d_index < 0) {
		  ex=1
            
          }
        }
        results[length - res_index] = val;
         // ("inside", results, val, length - res_index);
        res_index++;
        //  // (res_index);
        if (res_index == length+1) {
          break;
        }
	      if(ex===1){
		break	
	      }
        m--;
        if (m == 0) {
          m = 12;
          y--;
        }
      }
      //  // (length, d_length);
    }
    result.push(results);
     // ("result", index, results);
  }
  return res.send({
    status: true,
    result,
  });
};
