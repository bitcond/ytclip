const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();

// ✅ Use Render's assigned port if available, otherwise default to 3001 locally
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('YouTube Transcript Backend is running 🚀');
});

app.get('/api/transcript', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: 'Video URL is required.' });
  }

  try {
    const transcriptParts = await YoutubeTranscript.fetchTranscript(videoUrl);
    const formattedTranscript = transcriptParts
      .map(part => {
        const minutes = Math.floor(part.offset / 60);
        const seconds = Math.floor(part.offset % 60).toString().padStart(2, '0');
        return `(${minutes}:${seconds}) ${part.text}`;
      })
      .join('\n');

    res.json({ transcript: formattedTranscript });
  } catch (error) {
    console.error('Failed to fetch transcript:', error.message);
    res.status(500).json({
      error: 'Failed to fetch transcript. The video might not have captions enabled or is restricted.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Transcript server listening at http://localhost:${PORT}`);
});
