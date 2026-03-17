'use client'

import { WordCloud } from "@isoterik/react-word-cloud";

interface DataItem {
  text: string;
  value: number;
  type: string;
}

export default function WordCloudSentiment({ data }: { data: DataItem[] }) {

  // Attach style per word
  const wordsStyled = data.map(word => ({
    text: word.text,
    value: word.value,
    style: {
      fill: word.type === "positive" ? "#3b82f6" : "#ef4444", // blue / red
      fontWeight: 600,
      cursor: "pointer",
    }
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full h-[400px]  flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Keyword Sentiment
      </h2>

      <div className="flex-1 flex items-center justify-center">
        <WordCloud
          words={wordsStyled}
          width={400}
          height={200}
          padding={4} // keep horizontal (clean look)
          enableTooltip
        />
      </div>
    </div>
  );
}