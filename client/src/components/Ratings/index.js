// prop-types is library for typechecking of props
import PropTypes from "prop-types";

const { Icon } = require("@mui/material");

const Ratings = ({ rating, fontSize, color }) => {
  const ratings = {
    0.5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    1: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    1.5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star_half
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    2: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    2.5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star_half
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    3: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    3.5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star_half
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    4: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_outline
      </Icon>,
    ],
    4.5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star_half
      </Icon>,
    ],
    5: [
      <Icon key={1} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={2} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={3} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={4} fontSize={fontSize} color={color}>
        star
      </Icon>,
      <Icon key={5} fontSize={fontSize} color={color}>
        star
      </Icon>,
    ],
  };

  return ratings[rating];
};

// Setting default values for the props of DefaultReviewCard
Ratings.defaultProps = {
  color: "dark",
  fontSize: "small",
};

// Typechecking props for the DefaultReviewCard
Ratings.propTypes = {
  rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
  fontSize: PropTypes.oneOf(["small", "large", "medium"]),
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
};

export default Ratings;
