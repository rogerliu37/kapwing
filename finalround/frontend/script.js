function main() {
  function start_subtitle() {
    var subtitles_element = document.getElementById('subtitles');
    var video_element = document.getElementById('video');
    let currentTime = video_element.currentTime;
    const subtitles = [
      {
        text: "Back here LIVE at the waterfront village",
        startTime: 0,
        endTime: 2.75,
      },
      {
        text: "with my friend the zombie, Jonathan",
        startTime: 2.75,
        endTime: 5.21,
      },
      {
        text:
          "You're looking good! Jonathan just got an awesome face-paint job, what do you think?",
        startTime: 5.21,
        endTime: 8.78,
      },
      {
        text: "I LIKE TURTLES!!!",
        startTime: 8.78,
        endTime: 10.18,
      },
      {
        text: "...Alright! You're a great zombie.",
        startTime: 10.18,
        endTime: 12.9,
      },
      {
        text:
          "And good times here at the Waterfront Village, open for the next 11 days ....",
        startTime: 12.9,
        endTime: 17.08,
      },
    ];
    console.log('line 39 before for loop');
    for (const subtitle of subtitles) {
      let startTime = subtitle.startTime;
      let endTime = subtitle.endTime;
      console.log('line 43 in for loop before if conditional');
      console.log(subtitle)
      if (video_element.currentTime >= startTime && video_element.currentTime <= subtitle.endTime) {
        subtitles_element.innerHTML = subtitle.text
        console.log(subtitles.text)
      }
    }

  }
  video_element = document.getElementById("video");
  video_element.addEventListener('timeupdate', (event) => {
    start_subtitle();
  });
  console.log("sup");
}
