chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.txt == "hello") {
    // click on fp-player surface if it exists
    let srfcs = document.getElementsByClassName('fp-ui');
    for (srfc of srfcs) {
      if (srfc) {
        srfc.click();
      }
    }
    // get a list of all video elements
    let vids = document.getElementsByTagName('video');
    if (vids.length != 0) {
      // click on openload surface if it exists
      let srfc2 = document.getElementById('videooverlay');
      if (srfc2) {
      	srfc2.click();
      }
      // refresh the list to include the modified video after the click
      let vids = document.getElementsByTagName('video');
      // open all videos on the page
      let done = false;
      for (vid of vids) {
        // console.log(vid);
        done = done || openVid(vid);
      }
      // check for sources that are children of video elements
      // but only if a video hasn't been opened
      let srcs = document.getElementsByTagName('source');
      if (srcs.length != 0 && !done) {
        for (src of srcs) {
          // console.log(src);
          openVid(src);
        }
      }
    }
  }
}

function openVid(elt) {
  let link = elt.getAttribute('src');
  if (link && link.indexOf("vd.ads.memevideoad") != -1) {
    return false;
  }
  if (link && (link.indexOf("https://") == 0 || link.indexOf("http://") == 0)) {
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  else if (link && link.indexOf("//") == 0) {
    let tmp = 'https:';
    link = tmp.concat(link);
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  else if (link && link.indexOf("/") == 0) {
    let tmp = location.href.indexOf("//") + 2;
    let tmp2 = location.href.substr(tmp).indexOf("/");
    let tmp3 = location.href.substr(0, tmp+tmp2);
    link = tmp3.concat(link);
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  else if (link && link.indexOf("blob:") == 0 && location.href.indexOf("estream") != -1) {
    let tmp = 'https://www.gzaas.com/preview/preview?gs_form=youtube-dl%20';
    link = tmp.concat(location.href);
    link = link.concat("%20--hls-prefer-native");
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  else if (link && link.indexOf("blob:") == 0) {
    let tmp = 'https://www.gzaas.com/preview/preview?gs_form=youtube-dl%20';
    link = tmp.concat(location.href);
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  else if (link && elt.getAttribute('id') == 'olvideo_html5_api') {
    let tmp = 'https://openload.co';
    link = tmp.concat(link);
    chrome.runtime.sendMessage({txt: "bye", url: link});
    return true;
  }
  return false;
}
