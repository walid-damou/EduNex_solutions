import { useEffect, useState } from "react";
import axios from "services/authAxios";

import { baseURL, topCoursesRoute } from "utils/APIRoutes";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axios.post(topCoursesRoute);
      setPopularCourses(data.companies);
    };
    getAllCourses();
  }, []);

  let Conversation = [];
  popularCourses.map((course) =>
    Conversation.push({
      image: `${baseURL}/${course.image}`,
      name: course.nom,
      description: course.Provider.nom,
    })
  );

  return Conversation;
};

export default PopularCourses;
