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
