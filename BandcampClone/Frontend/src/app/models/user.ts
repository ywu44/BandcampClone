interface User {
    _id: string,
    username: string,
    email: string,
    profilePic: string,
    location: string,
    userCollection: [],
    wishlist: [],
    followers: [],
    followingUser: [],
    followingArtist: []
}
export { User };