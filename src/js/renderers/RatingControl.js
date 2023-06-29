import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { DuotonePicker, DuotoneSwatch } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { rankWith, scopeEndsWith } from "@jsonforms/core";

const DUOTONE_PALETTE = [
  {
    colors: ["#8c00b7", "#fcff41"],
    name: "Purple and yellow",
    slug: "purple-yellow",
  },
  { colors: ["#000097", "#ff4747"], name: "Blue and red", slug: "blue-red" },
];

const COLOR_PALETTE = [
  { color: "#ff4747", name: "Red", slug: "red" },
  { color: "#fcff41", name: "Yellow", slug: "yellow" },
  { color: "#000097", name: "Blue", slug: "blue" },
  { color: "#8c00b7", name: "Purple", slug: "purple" },
];

const Example = () => {
  const [duotone, setDuotone] = useState(["#000000", "#ffffff"]);
  return (
    <>
      <DuotonePicker
        duotonePalette={DUOTONE_PALETTE}
        colorPalette={COLOR_PALETTE}
        value={duotone}
        onChange={setDuotone}
      />
      <DuotoneSwatch values={duotone} />
    </>
  );
};

const RatingControl = ({ data, handleChange, path }) => (
  <Example values={["#000", "#fff"]} />
);

export const ratingControlTester = rankWith(
  3, //increase rank as needed
  scopeEndsWith("rating")
);

export default withJsonFormsControlProps(RatingControl);
