export const albumQueries = {
    readAlbums: `
        SELECT
            id AS albumId,
            title,
            artist,
            description,
            year,
            image
        FROM music.albums
    `,
    readAlbumsByArtist: `
        SELECT
            id AS albumId,
            title,
            artist,
            description,
            year,
            image
        FROM music.albums
        WHERE artist = ?
    `,
    readAlbumsByArtistSearch: `
        SELECT
            id AS albumId,
            title,
            artist,
            description,
            year,
            image
        FROM music.albums
        WHERE artist LIKE ?
    `,
    readAlbumsByDescriptionSearch: `
        SELECT
            id AS albumId,
            title,
            artist,
            description,
            year,
            image
        FROM music.albums
        WHERE description LIKE ?
    `,
    readAlbumsByAlbumId: `
        SELECT
            id AS albumId,
            title,
            artist,
            description,
            year,
            image
        FROM music.albums
        WHERE id = ?
    `,
    createAlbum: `
        INSERT INTO ALBUMS(title, artist, description, year, image)
        VALUES (?, ?, ?, ?, ?)
    `,
    updateAlbum: `
        UPDATE music.albums
        SET title = ?, artist = ?, year = ?, image = ?, description = ?
        WHERE id = ?
    `,
    deleteAlbum: `
        DELETE FROM music.albums
        WHERE id = ?
    `
};
