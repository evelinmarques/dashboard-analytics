const express = require("express");
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());

const generateRandomData = () => {
  const labels = [];
  const accessData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];
    labels.unshift(formattedDate);
    accessData.unshift(Math.floor(Math.random() * 100)); 
  }

  return { labels, accessData };
};





const generateRandomLinks = () => {
  const staticLinks = [
    { url: "https://sdwc.me/login", clicks: 150 },
    { url: "https://sdwc.me/perfil", clicks: 200 },
  ];

  const dynamicLinks = [];

  for (let i = 0; i < 10; i++) {
    dynamicLinks.push({
      url: `https://sdwc.me/${i}`,
      clicks: Math.floor(Math.random() * 1000), 
    });
  }

  return [...staticLinks, ...dynamicLinks];
};

app.get("/api/access", (req, res) => {
  const { labels, accessData } = generateRandomData();

  res.json({
    dailyAccess: { labels, accessData, total: accessData.reduce((total, value) => total + value, 0) },
    linksAccessed: generateRandomLinks(),
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
