import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const CoursesGraph = () => {
  const [allCoursesData, setAllCoursesData] = useState([]);

  useEffect(() => {
    const getData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllCoursesData(data.results);
    };
    getData("cours", 9).then((data) => (graphs.datasets.data = data));
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
      label: "Courses",
      data: allCoursesData,
    },
  };

  return graphs;
};

export default CoursesGraph;
