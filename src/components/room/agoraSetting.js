// import { changeMutestate, Me, changeVolumesIndicator } from "./room.js";
import AgoraRTC from "agora-rtc-sdk-ng";

export let client = AgoraRTC.createClient({
  mode: "live",
  codec: "vp8",
});

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

// let roomInfo = {};

// export const changeRole = async (token) => {
//   // await client.leave();
//   leave();
//   join(roomInfo.appid, token, roomInfo.channelName, roomInfo.uid);
// };

// export const join = async (appid, token, channel, uid) => {
//   // create Agora client
//   roomInfo.channelName = channel;
//   roomInfo.appid = appid;
//   roomInfo.uid = uid;
//   console.log(roomInfo);

//   client.setClientRole(agoraState.role);
//   client.enableAudioVolumeIndicator();

//   console.log(agoraState.role);
//   await client.join(appid, channel, token, uid);


//   // join the channel
//   if (agoraState.role === "host") {
//     // create local audio and video tracks
//     // console.log(AgoraRTC);
//     localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    
//     audioTracks.push(localTracks.audioTrack.getMediaStreamTrack());
//     if (ac.state === "suspended") {
//         ac.resume();
//     }
//     console.log("audio tracks after adding media track", audioTracks);
    
//     await client.publish(Object.values(localTracks));
//     // audioTracks.push(localTracks.audioTrack.getMediaStreamTrack())
//     // if (ac.state === 'suspended') {
//     //     ac.resume();
//     // }
//     console.log("Successfully published.");
//   }

//   client.on("user-published", handleUserPublished);
//   client.on("user-left", handleUserLeft);
//   client.on("user-mute-updated", function (evt) {
//     console.log("mute audio:=====>", evt);
//   });

//   client.on("user-unpublished", function (evt) {
//     // changeMutestate(evt)
//   });

//   client.on("volume-indicator", (volumes) => {
//     // changeVolumesIndicator(volumes)
//   });
// };

//mute & unmute
export async function toggleMic(isMuted = false) {
  if (isMuted) {
    // await localTracks.audioTrack.setEnabled(true)
    await localTracks.audioTrack.setMuted(false);
    console.log(" un muted ===>");
  } else {
    // await localTracks.audioTrack.setEnabled(false)
    await localTracks.audioTrack.setMuted(true);
    console.log(" muted ===>");
  }
  console.log('loacalTracks in toggle Mic ====>',localTracks)
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
  console.log("user left agora*******------****--");
  await client.leave();
  console.log("userleft==>", audioTracks);
}

// Subscribe to a remote user

 export async function subscribe(user, mediaType) {
  console.log("<============ userJoined ======>");
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
  console.log("AudioTracks ======>", audioTracks);
  console.log("Successfully subscribed.");
}

// Handle user joined
// export function handleUserPublished(user, mediaType) {
//   console.log("userjoined ======= agora", user);
//   // changeMutestate(user)
//   const id = user.uid;
//   remoteUsers[id] = user;
//   subscribe(user, mediaType);
// }

// Handle user left
export function handleUserLeft(user) {
  
  audioTracks=audioTracks.filter(audioTrack => audioTrack.uid !== user.uid)
  console.log("userLeft ===> ", audioTracks);
  console.log("userLeft ===> ", user);
  const id = user.uid;
  delete remoteUsers[id];
}

export let recorder;
let chunks = [];

export function startRecording(roomName) {
  recording = true;
  // WebAudio MediaStream sources only use the first track.
  console.log("<====audioTracks ======>", audioTracks);

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
