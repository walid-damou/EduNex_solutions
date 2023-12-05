import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const PartnersGraph = () => {
  const [allPartnersData, setAllPartnersData] = useState([]);

  useEffect(() => {
    const getData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllPartnersData(data.results);
    };
    getData("provider", 9).then((data) => (graphs.datasets.data = data));
  }, []);

  const today = new Date();
  let lastSixMonths = [];
  for (var i = 8; i >= 0; i -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastSixMonths.push(date.toLocaleDateString("en-US", { month: "short" }));
  }

  let months = lastSixMonths;
  let graphs = {
    labels: months,
    datasets: {
      label: "Partners",
      data: allPartnersData,
    },
  };

  return graphs;
};

export default PartnersGraph;
