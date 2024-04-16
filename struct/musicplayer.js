const  SpotifyParser  = require('./SpotifyParser');
require('dotenv').config()
const spotifyID = process.env.SPOTIFY_ID; // Your Spotify app client ID
const spotifySecret = process.env.SPOTIFY_SECRET; // Your Spotify app client secret
const node = {
	host: process.env.LAVALINK_HOST,
	port: process.env.LAVALINK_PORT,
	password: process.env.LAVALINK_PASS
};
async function main(){
    const  spotilink = new SpotifyParser(node, spotifyID, spotifySecret);

const song = await spotilink.getTrack("spotify:track:7l5yjQ9I3tL6t5yC6qDp5Y");
const album = await spotilink.getAlbumTracks("spotify:album:2mJj5qQqJ9kRqkqXuqkTjT");
const playlist = await spotilink.getPlaylistTracks("spotify:playlist:37i9dQZF1DWSf2RVEtJp4Z");
const track = await spotilink.fetchTrack(song)
    .catch(() => console.log("Error fetching track"));

const tracks = [];
await Promise.all(album.map(async (name)=>{
    const track = await spotilink.fetchTrack(name)
    tracks.push(track)
}))
}

class MusicPlayer {
    constructor() {
        this.queue = []; 
        this.isPlaying = false;
    }
    addTrack(track) {
        this.queue.push(track);
        if (!this.isPlaying) {
            this.playNextTrack();
        }
    }

    playNextTrack() {
        if (this.queue.length > 0) {
            const track = this.queue.shift();
            this.isPlaying = true;
            console.log(`Now playing: ${track}`);
        } else {
            this.isPlaying = false;
            console.log("Queue is empty. Music player stopped.");
        }
    }

    skipTrack() {
        if (this.queue.length > 0) {
            console.log("Skipping current track...");
            this.playNextTrack();
        } else {
            console.log("No track to skip. Queue is empty.");
        }
    }

    stop() {
        this.queue = [];
        this.isPlaying = false;
        console.log("Music player stopped.");
    }
}

module.exports = MusicPlayer;
