import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsSocRoute } from "utils/APIRoutes";

const CompaniesGraph = () => {
  const [allCompaniesData, setAllCompaniesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  let lastSixMonths = [];

  for (var i = 8; i >= 0; i -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastSixMonths.push(date.toLocaleDateString("en-US", { month: "short" }));
  }

  let months = lastSixMonths

  useEffect(() => {
    const getCompaniesData = async () => {
      const { data } = await axios.post(graphsSocRoute);
      if (data.status) {
        setLoading(true);
        setAllCompaniesData(data);
        console.log("heet", data);
      }
    };
    getCompaniesData();
  }, []);

  console.log("heet", allCompaniesData);
  const values = {
    labels: months,
    datasets: [
      {
        label: "Total Collaborators",
        color: "success",
        data:
          loading && allCompaniesData.result ? allCompaniesData.result[0] : [],
        // data: ["0", "20", 40],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#1A73E8",
        borderColor: "#1A73E8",
        maxBarThickness: 6,
      },
      {
        label: "Total Certifications",
        color: "info",
        data:
          loading && allCompaniesData.result ? allCompaniesData.result[1] : [],
        // data: [],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#344767",
        borderColor: "#344767",
        maxBarThickness: 6,
      },
    ],
  };

  return values;
};

export default CompaniesGraph;
