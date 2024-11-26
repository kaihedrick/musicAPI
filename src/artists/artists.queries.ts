export const artistQueries ={
readArtists:`
    SELECT
        DISTINCT artist as artist
    FROM music.albums
    `
}