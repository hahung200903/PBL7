// src/components/WordCloud.jsx
import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const WordCloudComponent = ({
  data = [],
  font = "Impact",
  fontSizeMapper = (word) => Math.log2(word.value) * 5,
  rotate = 0,
  width = 500,
  height = 300,
  colors = schemeCategory10,
}) => {
  const colorScale = scaleOrdinal(colors);

  return (
    <div style={{ width, height }}>
      <WordCloud
        data={data}
        font={font}
        fontSize={fontSizeMapper}
        rotate={rotate}
        fill={(_, i) => colorScale(i)}
        width={width}
        height={height}
      />
    </div>
  );
};

export default WordCloudComponent;
