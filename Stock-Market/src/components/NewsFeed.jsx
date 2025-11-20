import React from "react";

const dummyNews = [
  {
    title: "Market opens flat as investors await Fed decision",
    time: "2 hours ago",
  },
  {
    title: "Tech stocks surge after strong quarterly results",
    time: "5 hours ago",
  },
  {
    title: "Oil prices hit 6-month high",
    time: "1 day ago",
  },
];

const NewsFeed = () => {
  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">📰 Latest Market News</h2>
      {dummyNews.map((n, idx) => (
        <div key={idx} className="mb-4 border-b pb-3">
          <p className="font-semibold">{n.title}</p>
          <span className="text-gray-500 text-sm">{n.time}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
