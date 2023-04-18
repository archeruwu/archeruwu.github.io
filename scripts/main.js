window.onload = function() {
    lyriclist();
}

const lyriclist = function() {
    const songs = [
        {
            lyric: "I'm afraid of the social laziness that let Kitty Genovese die",
            artist: "AJJ - Big Bird"
        },
        {
            lyric: "It's harder to be yourself than it is to be anybody else",
            artist: "AJJ - Big Bird"
        },
        {
            lyric: "I'll wait to be forgiven, maybe I never will, my star has left me to take the bitter pill",
            artist: "Gorillaz - Too Binge"
        },
        {
            lyric: "You are a opossum living in the trashcan of my heart",
            artist: "Dollar Signs - I hope I Don't F**k This Up"
        },
        {
            lyric: "I am drowning, There is no sign of land, You are coming down with me, Hand in unlovable hand",
            artist: "The Mountain Goats - No Children"
        },
        {
            lyric: "My heart, is a cancer; radiation wouldn't help a thing",
            artist: "The Taxpayers - Hungry Dog In The Street"
        }
    ];
    let songlist = Math.floor(Math.random() * songs.length);
    document.getElementById("lyrictxt").innerHTML = songs[songlist].lyric;
    document.getElementById("artist").innerHTML = songs[songlist].artist;
}