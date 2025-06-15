// index.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

// URL ของ m3u8 ที่คุณอยาก proxy
const TARGET_URL = 'https://dolive.thaim3u.com/doolive4k-tv/siamsport-9/chunks.m3u8';

app.get('/iptv.m3u8', async (req, res) => {
  try {
    const r = await fetch(TARGET_URL, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
        'Referer': 'https://dolive.thaim3u.com/',
      },
    });

    const data = await r.text();
    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error fetching playlist.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
