
import AgoraRTC from "agora-rtc-sdk-ng";

export let client = AgoraRTC.createClient({
  mode: "live",
  codec: "vp8",
});

//stop output logs of the SDK.
AgoraRTC.setLogLevel(2); 
//2: WARNING. Output logs of the WARNING and ERROR level.

// for record
export let audioTracks = [];
export let recording = false;
export let ac = new AudioContext();
export let sources = [];
export let dest;
//-----
export var localTracks = {
  audioTrack: null,
};
export var remoteUsers = {};
// Agora client options
export let agoraState = {
  role: "audience",
};


//mute & unmute
export async function toggleMic(isMuted = false) {
  if (isMuted) {
    // await localTracks.audioTrack.setEnabled(true)
    await localTracks.audioTrack.setMuted(false);
  } else {
    // await localTracks.audioTrack.setEnabled(false)
    await localTracks.audioTrack.setMuted(true);
  }
}

// Leave
export async function leave() {
  for (let trackName in localTracks) {
    var track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      localTracks[trackName] = undefined;
    }
  }
  // remove remote users and player views
  remoteUsers = {};
  // leave the channel
  await client.leave();
}

// Subscribe to a remote user

 export async function subscribe(user, mediaType) {
  await client.subscribe(user, "audio");
  user.audioTrack.play();

  if (recording) {
    sources.push(
      ac.createMediaStreamSource(
        new MediaStream([user.audioTrack.getMediaStreamTrack()])
      )
    );
    sources[sources.length - 1].connect(dest);
  } else {
    audioTracks.push(user.audioTrack.getMediaStreamTrack());
  }

}


// Handle user left
export function handleUserLeft(user) {
  audioTracks=audioTracks.filter(audioTrack => audioTrack.uid !== user.uid)
  
  const id = user.uid;
  delete remoteUsers[id];
}

export let recorder;
let chunks = [];

export function startRecording(roomName) {
  recording = true;
  // WebAudio MediaStream sources only use the first track.
 

  // The destination will output one track of mixed audio.
  dest = ac.createMediaStreamDestination();

  sources = audioTracks.map((t) =>
    ac.createMediaStreamSource(new MediaStream([t]))
  );
  // Mixing
  sources.forEach((s) => s.connect(dest));

  // Record 10s of mixed audio as an example
  recorder = new MediaRecorder(dest.stream);
  recorder.start();
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    // var clipName = prompt("Enter a name for your recording")
    const blob = new Blob(chunks, {
      type: "audio/mp3",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = roomName + ".mp3";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);

    audioTracks = []
  };
  // setTimeout(() => recorder.stop(), 10000);
}
