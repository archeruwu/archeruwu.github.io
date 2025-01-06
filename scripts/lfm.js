// this is yoinked from https://deathlobotomy.nekoweb.org

const LASTFM_API_KEY = "3ae3c03ca1fedcad05a41132e9306226"
const username = "archer_uwu" // change username here
const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&api_key=" + LASTFM_API_KEY + "&limit=1&user=" + username

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

function relativeTime(time, time_text) {
    var time_now = Math.round(Date.now() / 1000)
    var time_diff = time_now - time

    let SEC_IN_MIN = 60
    let SEC_IN_HOUR = SEC_IN_MIN * 60
    let SEC_IN_DAY = SEC_IN_HOUR * 24

    if (time_diff < SEC_IN_HOUR) {
        let minutes = Math.round(time_diff / SEC_IN_MIN)
        return "was listening " + minutes + " minute" +
            ((minutes != 1) ? "s" : "") + " ago:"
    }
    if (time_diff >= SEC_IN_HOUR && time_diff < SEC_IN_DAY) {
        let hours = Math.round(time_diff / SEC_IN_HOUR)
        return hours + " hour" +
            ((hours != 1) ? "s" : "") + " ago:"
    }
    if (time_diff >= SEC_IN_DAY)
        return time_text
}

var json = JSON.parse(httpGet(url));
var last_track = json.recenttracks.track[0]
var track = last_track.name
var trackLink = last_track.url
var artist = last_track.artist['#text']
let relative_time = null
if (last_track.date) {
    var unix_date = last_track.date.uts
    var date_text = last_track.date["#text"]
    relative_time = relativeTime(unix_date, date_text)
}
var now_playing = (last_track["@attr"] == undefined) ? false : true
var imageLink = last_track.image[2]["#text"]

trackElem = document.getElementById('track')
artistElem = document.getElementById('artist')
dateElem = document.getElementById('date')
nowplayingElem = document.getElementById('now-playing')
albumcoverElem = document.getElementById('album-cover')

trackLinkElem = document.createElement('a')
trackLinkElem.id = "track"
trackLinkElem.href = trackLink
trackLinkElem.target = "_blank"
trackLinkElem.textContent = track

userLinkElem = document.createElement('a')
userLinkElem.href = "https://www.last.fm/user/" + username
userLinkElem.target = "_blank"
userLinkElem.textContent = (relative_time != null) ? relative_time : "currently playing:"

trackElem.appendChild(trackLinkElem)
artistElem.textContent = artist
dateElem.appendChild(userLinkElem)
albumcoverElem.src = imageLink

console.log(
    "Artist: " + artist + "\n" +
    "Track: " + track + "\n" +
    "Date: " + relative_time + "\n" +
    "Now playing: " + now_playing)