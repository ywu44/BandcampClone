interface Album {
    _id: String,
    title: String,
    price: Number,
    cover: String,
    releaseData: String,
    description: String,
    genre: String,
    format: String,
    artist: String,
    artistRef: String,
    tracks: [
        {
            title: String,
            price: Number,
            source: String,
            length: Number,
            _id: String,
        }
    ],
    ownedBy: [
        {
            _id: String,
            username: String,
            profilePic: String,
        }
    ]
}
export { Album };