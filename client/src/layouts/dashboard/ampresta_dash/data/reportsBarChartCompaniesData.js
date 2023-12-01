import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const CompaniesGraph = () => {
  const [allCompaniesData, setAllCompaniesData] = useState([]);

  useEffect(() => {
    const getCompaniesData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllCompaniesData(data.results);
    };
    getCompaniesData("societe", 7).then((data) => (graph.datasets.data = data));
  }, []);
 
  const today = new Date();
  let lastSixMonths = [];
  for (var i = 8; i >= 0; i -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastSixMonths.push(date.toLocaleDateString("en-US", { month: "short" }));
  }

  let months = lastSixMonths;
  let graph = {
    labels: months,
    datasets: {
      label: "Companies",
      data: allCompaniesData,
    },
  };

  return graph;
};

export default CompaniesGraph;
