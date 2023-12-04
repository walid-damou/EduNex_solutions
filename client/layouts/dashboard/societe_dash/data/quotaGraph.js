import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { quotaSocRoute } from "utils/APIRoutes";

const CompaniesGraph = () => {
  const [allCompaniesData, setAllCompaniesData] = useState([]);

  useEffect(() => {
    const getCompaniesData = async () => {
      const { data } = await axios.post(quotaSocRoute);
      if (data.status) {
        setAllCompaniesData(data);
      }
    };
    getCompaniesData();
  }, []);

  const data = {
    labels: allCompaniesData.providers,
    datasets: {
      color: "success",
      data: allCompaniesData.quotas,
      fill: true,
      label: "Referral",
      maxBarThickness: 6,
      pointBackgroundColor: "#344767",
      pointRadius: 3,
    },
  };

  return data;
};

export default CompaniesGraph;
