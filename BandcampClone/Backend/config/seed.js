const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") }); // .env is in different folder
const { MONGO_URL } = process.env;
const SALT = +process.env.SALT;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

// length: 26
const genres = [
  "electronic",
  "rock",
  "metal",
  "alternative",
  "hiphop",
  "experimental",
  "punk",
  "folk",
  "pop",
  "ambient",
  "soundtrack",
  "world",
  "jazz",
  "acoustic",
  "funk",
  "r&b/soul",
  "devotional",
  "classical",
  "reggae",
  "podcasts",
  "country",
  "spoken word",
  "comedy",
  "blues",
  "audiobooks",
  "latin",
];
const formats = ["digital", "vinyl", "compact disc", "cassette"];
const trackSrcs = [
  "../../../assets/audio/Lord Apex,Lester Nowhere,o k h o - Vertical Bird.mp3",
  "../../../assets/audio/Bladee,Ecco2k - Girls just want to have fun.mp3",
];

async function run() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to DB.");

    await Promise.all([
      User.collection.drop(),
      Artist.collection.drop(),
      Album.collection.drop(),
    ]);

    const password1 = await bcrypt.hash("Asd111", SALT);
    const password2 = await bcrypt.hash("Asd1111", SALT);

    const user1 = {
      username: "user1",
      email: "user1@test.com",
      password: password1,
      profilePic: "https://f4.bcbits.com/img/0028888971_41.jpg",
      location: "Yunnan, China",
      website:"soundcloud.com",
      userCollection: [],
      wishlist: [],
      followers: [],
      followingUser: [],
      followingArtist: [],
    };
    const user2 = {
      username: "user2",
      email: "user2@test.com",
      password: password2,
      profilePic: "https://f4.bcbits.com/img/0030417161_41.jpg",
      location: "Raleigh, North Carolina",
      website:"soundcloud.com",
      userCollection: [],
      wishlist: [],
      followers: [],
      followingUser: [],
      followingArtist: [],
    };
    await User.create(user1);
    await User.create(user2);

    const artist1 = [
      {
        name: "Skee Mask",
        profilePic: "https://f4.bcbits.com/img/0006014335_21.jpg",
        website: "https://twitter.com/sk33mask",
        location: "Munich, Germany",
        albums: [],
      },
    ];
    await Artist.create(artist1);
    const album1 = [
      {
        title: "B",
        price: "0",
        cover: "https://f4.bcbits.com/img/a0620550364_16.jpg",
        releaseDate: new Date("2022-12-25T00:00:00Z"),
        description:
          "Second batch of previously unreleased Skee Mask tracks that were made between 2017 and 2020, all unmastered.",
        genre: genres[0],
        format: formats[0],
        artist: "Skee Mask",
        artistRef: '',
        tracks: [
          {
            title: "P. Prog",
            price: 0,
            source: trackSrcs[1],
            length: 335500,
          },
          {
            title: "Steamer (Early Mix)",
            price: 0,
            source: trackSrcs[0],
            length: 331200,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album1);
    const album1InDatabase = await Album.findOne({ title: "B" });
    await Artist.findOneAndUpdate(
      { name: "Skee Mask" },
      { albums: [album1InDatabase] }
    );
    const artist1InDatabse = await Artist.findOne({ name: "Skee Mask" });
    await Album.findOneAndUpdate(
      { title: "B" },
      { artistRef: artist1InDatabse._id }
    );

    const artist2 = [
      {
        name: "King Buffalo",
        profilePic: "https://f4.bcbits.com/img/0026834336_10.jpg",
        website: "https://kingbuffalo.com/",
        location: "Rochester, New York",
        albums: [],
      },
    ];
    await Artist.create(artist2);
    const album2 = [
      {
        title: "Regenerator",
        price: "0",
        cover: "https://f4.bcbits.com/img/a2847732102_10.jpg",
        releaseDate: new Date("2022-09-02T00:00:00Z"),
        description:
          "Written & Recorded by King Buffalo in Rochester, NY at the Main Street Armory in 2021.",
        genre: genres[1],
        format: formats[0],
        artist: "King Buffalo",
        artistRef: '',
        tracks: [
          {
            title: "Regenerator",
            price: 0,
            source: trackSrcs[0],
            length: 630400,
          },
          {
            title: "Mercury",
            price: 0,
            source: trackSrcs[1],
            length: 438900,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album2);
    const album2InDatabase = await Album.findOne({ title: "Regenerator" });
    await Artist.findOneAndUpdate(
      { name: "King Buffalo" },
      { albums: [album2InDatabase] }
    );
    const artist2InDatabse = await Artist.findOne({ name: "King Buffalo" });
    await Album.findOneAndUpdate(
      { title: "Regenerator" },
      { artistRef: artist2InDatabse._id }
    );

    const artist3 = [
      {
        name: "Hath",
        profilePic: "https://f4.bcbits.com/img/0027408958_10.jpg",
        website: "",
        location: "New Jersey",
        albums: [],
      },
    ];
    await Artist.create(artist3);
    const album3 = [
      {
        title: "All That Was Promised",
        price: "40",
        cover: "https://f4.bcbits.com/img/a1964212535_10.jpg",
        releaseDate: new Date("2022-03-04T00:00:00Z"),
        description:
          'Engineered and mixed by AJ Viana at AJ Viana Productions Additional editing: Tiago "Canadas" Carvalho.',
        genre: genres[2],
        format: formats[1],
        artist: "Hath",
        artistRef: '',
        tracks: [
          {
            title: "The Million Violations",
            price: 1,
            source: trackSrcs[1],
            length: 332500,
          },
          {
            title: "Kenosis",
            price: 3,
            source: trackSrcs[0],
            length: 432200,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album3);
    const album3InDatabase = await Album.findOne({
      title: "All That Was Promised",
    });
    await Artist.findOneAndUpdate(
      { name: "Hath" },
      { albums: [album3InDatabase] }
    );
    const artist3InDatabse = await Artist.findOne({ name: "Hath" });
    await Album.findOneAndUpdate(
      { title: "All That Was Promised" },
      { artistRef: artist3InDatabse._id }
    );

    const artist4 = [
      {
        name: "Shakey Graves",
        profilePic: "https://f4.bcbits.com/img/0027666702_10.jpg",
        website: "www.shakeygraves.com/",
        location: "Austin, Texas",
        albums: [],
      },
    ];
    await Artist.create(artist4);
    const album4 = [
      {
        title: "Roll the Bones",
        price: "0",
        cover: "https://f4.bcbits.com/img/a1366856143_10.jpg",
        releaseDate: new Date("2011-01-01T00:00:00Z"),
        description: "Shakey Graves lives in Texas.",
        genre: genres[3],
        format: formats[0],
        artist: "Shakey Graves",
        artistRef: '',
        tracks: [
          {
            title: "Unlucky Skin",
            price: 0,
            source: trackSrcs[0],
            length: 180000,
          },
          {
            title: "Built to Roam",
            price: 0,
            source: trackSrcs[1],
            length: 433600,
          },
          {
            title: "Roll the Bones",
            price: 0,
            source: trackSrcs[0],
            length: 247600,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album4);
    const album4InDatabase = await Album.findOne({ title: "Roll the Bones" });
    await Artist.findOneAndUpdate(
      { name: "Shakey Graves" },
      { albums: [album4InDatabase] }
    );
    const artist4InDatabse = await Artist.findOne({ name: "Shakey Graves" });
    await Album.findOneAndUpdate(
      { title: "Roll the Bones" },
      { artistRef: artist4InDatabse._id }
    );

    const artist5 = [
      {
        name: "Madvillain",
        profilePic: "https://f4.bcbits.com/img/0004075325_10.jpg",
        website: "",
        location: "Los Angeles, California",
        albums: [],
      },
    ];
    await Artist.create(artist5);
    const album5 = [
      {
        title: "Madvillainy",
        price: "10",
        cover: "https://f4.bcbits.com/img/a1024330960_10.jpg",
        releaseDate: new Date("2022-03-04T00:00:00Z"),
        description:
          'Engineered and mixed by AJ Viana at AJ Viana Productions Additional editing: Tiago "Canadas" Carvalho.',
        genre: genres[4],
        format: formats[3],
        artist: "Madvillain",
        artistRef: '',
        tracks: [
          {
            title: "The Illest Villains",
            price: 1,
            source: trackSrcs[1],
            length: 126000,
          },
          {
            title: "Accordion",
            price: 1,
            source: trackSrcs[0],
            length: 127600,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album5);
    const album5InDatabase = await Album.findOne({ title: "Madvillainy" });
    await Artist.findOneAndUpdate(
      { name: "Madvillain" },
      { albums: [album5InDatabase] }
    );
    const artist5InDatabse = await Artist.findOne({ name: "Madvillain" });
    await Album.findOneAndUpdate(
      { title: "Madvillainy" },
      { artistRef: artist5InDatabse._id }
    );

    const artist6 = [
      {
        name: "BIZZARO WARRIOR",
        profilePic: "https://f4.bcbits.com/img/0030095466_10.jpg",
        website: "",
        location: "Dayton, Ohio",
        albums: [],
      },
    ];
    await Artist.create(artist6);
    const album6 = [
      {
        title: "HOW MUCH ART CAN YOU TAKE?",
        price: "10",
        cover: "https://f4.bcbits.com/img/a4174073009_10.jpg",
        releaseDate: new Date("2022-10-26T00:00:00Z"),
        description:
          "gwen drums \njustin guitar \nmatthew vocals, other sounds, edits \noriginally released on how much art can you take?",
        genre: genres[5],
        format: formats[2],
        artist: "LIVING ROOM",
        artistRef: '',
        tracks: [
          {
            title: "31 songs",
            price: 2,
            source: trackSrcs[0],
            length: 487600,
          },
          {
            title: "27 songs",
            price: 2,
            source: trackSrcs[1],
            length: 487000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album6);
    const album6InDatabase = await Album.findOne({
      title: "HOW MUCH ART CAN YOU TAKE?",
    });
    await Artist.findOneAndUpdate(
      { name: "BIZZARO WARRIOR" },
      { albums: [album6InDatabase] }
    );
    const artist6InDatabse = await Artist.findOne({ name: "BIZZARO WARRIOR" });
    await Album.findOneAndUpdate(
      { title: "HOW MUCH ART CAN YOU TAKE?" },
      { artistRef: artist6InDatabse._id }
    );

    const artist7 = [
      {
        name: "Home Is Where",
        profilePic: "https://f4.bcbits.com/img/0029516153_10.jpg",
        website: "https://linktr.ee/homeiswhere",
        location: "Palm Coast, Florida",
        albums: [],
      },
    ];
    await Artist.create(artist7);
    const album7 = [
      {
        title: "i became birds",
        price: "24",
        cover: "https://f4.bcbits.com/img/a1867923618_10.jpg",
        releaseDate: new Date("2021-03-05T00:00:00Z"),
        description:
          "With I Became Birds, Florida’s Home Is Where push their unique blend of whirlwind hardcore aggression and warm, open-hearted folksy melancholy to even further heights. Frontperson Brandon MacDonald’s Dylan-esque eccentricities are on full display here, from the occasional blast of harmonica (like on early standout “Long Distance Conjoined Twins” or the disaffected, despondency-soaked closer “The Old Country”) to their knack for abstractly evocative neurosis-as-poetry. But far from being a copycat act, Home Is Where’s wearily raw-throated aesthetic and dynamically vivid compositions feel idiosyncratic and vital. The bittersweet folk melodies seep deeply into the band’s DNA, adding an element of accessibility and immediate nostalgia to otherwise churning and angular song structures and sonic assaults. Vocals range from an intimate, gentle, and disarming croon to a full-bodied expectoration of the soul, oftentimes in the same song (like “Sewn Together from the Membrane of the Great Sea Cucumber,” which splits the difference between mournful, gothic post-punk and staccato-heeled screamo with aplomb). A devastating rhythm section and nimble, versatile, yet powerful guitar work assist with the record’s genre-bending, which ranges from maniacal chemical mixtures to gymnastic flips, twists, and turns. And yet, even amid the din, Home Is Where find ample time for hooks-- the oddball effervescence of lead single “Scientific Classification of Stingrays” and the shimmering, propulsive, delightfully off-kilter late-album stunner “Assisted Harakiri” are more than proof of that. Ultimately, I Became Birds shows Home Is Where hitting an early high-water mark. A brisk record-- six songs in roughly 17 minutes-- it never takes a dip in enthusiasm and inventiveness. Home Is Where’s inexhaustible creativity and restless energy is bound to serve them well, and I Became Birds is all the proof anyone needs.",
        genre: genres[6],
        format: formats[1],
        artist: "Home Is Where",
        artistRef: '',
        tracks: [
          {
            title: "l. ron hubbard was way cool",
            price: 1,
            source: trackSrcs[1],
            length: 97600,
          },
          {
            title: "sewn together from the membrane of the great sea cucumber",
            price: 1,
            source: trackSrcs[0],
            length: 287000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album7);
    const album7InDatabase = await Album.findOne({ title: "i became birds" });
    await Artist.findOneAndUpdate(
      { name: "Home Is Where" },
      { albums: [album7InDatabase] }
    );
    const artist7InDatabse = await Artist.findOne({ name: "Home Is Where" });
    await Album.findOneAndUpdate(
      { title: "i became birds" },
      { artistRef: artist7InDatabse._id }
    );

    const artist8 = [
      {
        name: "Phoebe Bridgers",
        profilePic: "https://f4.bcbits.com/img/0010823805_10.jpg",
        website: "",
        location: "Los Angeles, California",
        albums: [],
      },
    ];
    await Artist.create(artist8);
    const album8 = [
      {
        title: "Stranger in the Alps",
        price: "10",
        cover: "https://f4.bcbits.com/img/a3164574832_10.jpg",
        releaseDate: new Date("2017-09-22T00:00:00Z"),
        description:
          "Phoebe Bridgers wrote her first song at age 11, spent her adolescence at open mic nights, and busked through her teenage years at farmers markets in her native Los Angeles. By age 20, she'd caught the ear of Ryan Adams, who listened to her perform her song \"Killer\" in his L.A. studio, inviting her to come back and record it there the next day. The session blossomed into the three-song 'Killer' EP, released to much acclaim on Adams's Pax-Am label in 2015. In the two short years since, Bridgers has toured or played with Conor Oberst, Julien Baker, City and Colour, Violent Femmes, Mitski, Television and Blake Babies among others.",
        genre: genres[7],
        format: formats[0],
        artist: "Phoebe Bridgers",
        artistRef: '',
        tracks: [
          {
            title: "Scott Street",
            price: 1,
            source: trackSrcs[0],
            length: 306600,
          },
          {
            title: "Smoke Signals",
            price: 1,
            source: trackSrcs[1],
            length: 330900,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album8);
    const album8InDatabase = await Album.findOne({
      title: "Stranger in the Alps",
    });
    await Artist.findOneAndUpdate(
      { name: "Phoebe Bridgers" },
      { albums: [album8InDatabase] }
    );
    const artist8InDatabse = await Artist.findOne({ name: "Phoebe Bridgers" });
    await Album.findOneAndUpdate(
      { title: "Stranger in the Alps" },
      { artistRef: artist8InDatabse._id }
    );

    const artist9 = [
      {
        name: "sza",
        profilePic: "https://f4.bcbits.com/img/0030874800_10.jpg",
        website: "",
        location: "",
        albums: [],
      },
    ];
    await Artist.create(artist9);
    const album9 = [
      {
        title: "SOS",
        price: "9.99",
        cover: "https://f4.bcbits.com/img/a3561452499_10.jpg",
        releaseDate: new Date("2022-12-30T00:00:00Z"),
        description: "",
        genre: genres[8],
        format: formats[0],
        artist: "sza",
        artistRef: '',
        tracks: [
          {
            title: "SOS",
            price: 1,
            source: trackSrcs[1],
            length: 126600,
          },
          {
            title: "Kill Bill",
            price: 1,
            source: trackSrcs[0],
            length: 150400,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album9);
    const album9InDatabase = await Album.findOne({
      title: "SOS",
    });
    await Artist.findOneAndUpdate(
      { name: "sza" },
      { albums: [album9InDatabase] }
    );
    const artist9InDatabse = await Artist.findOne({ name: "sza" });
    await Album.findOneAndUpdate(
      { title: "SOS" },
      { artistRef: artist9InDatabse._id }
    );

    const artist10 = [
      {
        name: "Ab Uno",
        profilePic: "https://f4.bcbits.com/img/0026456096_10.jpg",
        website: "",
        location: "Berlin, Germany",
        albums: [],
      },
    ];
    await Artist.create(artist10);
    const album10 = [
      {
        title: "Les Gens De Mogador [DW012]",
        price: "21.34",
        cover: "https://f4.bcbits.com/img/a1643996008_10.jpg",
        releaseDate: new Date("2017-09-22T00:00:00Z"),
        description:
          "Between sonic critique and meditative self-sabotage, Ab Uno's drone-temporal drift is to be read as an anthropological study: looking for answers in the past we can find the future, returning to being a 'plural one' as the primal feeling of the cosmos indicates, opening a door to a deeper state of consciousness.",
        genre: genres[9],
        format: formats[1],
        artist: "Ab Uno",
        artistRef: '',
        tracks: [
          {
            title: "Buried Under The Sand",
            price: 1.07,
            source: trackSrcs[0],
            length: 364000,
          },
          {
            title: "Le Vendeur De Lames",
            price: 1.07,
            source: trackSrcs[1],
            length: 376600,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album10);
    const album10InDatabase = await Album.findOne({
      title: "Les Gens De Mogador [DW012]",
    });
    await Artist.findOneAndUpdate(
      { name: "Ab Uno" },
      { albums: [album10InDatabase] }
    );
    const artist10InDatabse = await Artist.findOne({ name: "Ab Uno" });
    await Album.findOneAndUpdate(
      { title: "Les Gens De Mogador [DW012]" },
      { artistRef: artist10InDatabse._id }
    );

    const artist11 = [
      {
        name: "Steve Nolan",
        profilePic: "https://f4.bcbits.com/img/0020954453_10.jpg",
        website: "",
        location: "Los Angeles, California",
        albums: [],
      },
    ];
    await Artist.create(artist11);
    const album11 = [
      {
        title: "Sodium Party (OST)",
        price: "12.99",
        cover: "https://f4.bcbits.com/img/a0073874975_10.jpg",
        releaseDate: new Date("2015-09-29T00:00:00Z"),
        description:
          "--- A young woman named Claire experiences life for the first time after her controlling mother dies, but her world comes tumbling down around her when her childhood imaginary friend starts to haunt her everyday world. ---",
        genre: genres[10],
        format: formats[3],
        artist: "Steve Nolan",
        artistRef: '',
        tracks: [
          {
            title: "The Beginning",
            price: 1,
            source: trackSrcs[1],
            length: 184600,
          },
          {
            title: "Green Arena",
            price: 1,
            source: trackSrcs[0],
            length: 388000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album11);
    const album11InDatabase = await Album.findOne({
      title: "Sodium Party (OST)",
    });
    await Artist.findOneAndUpdate(
      { name: "Steve Nolan" },
      { albums: [album11InDatabase] }
    );
    const artist11InDatabse = await Artist.findOne({ name: "Steve Nolan" });
    await Album.findOneAndUpdate(
      { title: "Sodium Party (OST)" },
      { artistRef: artist11InDatabse._id }
    );

    const artist12 = [
      {
        name: "Habibi Funk Records",
        profilePic: "https://f4.bcbits.com/img/0027692872_10.jpg",
        website: "http://linktr.ee/habibifunk",
        location: "Berlin, Germany",
        albums: [],
      },
    ];
    await Artist.create(artist12);
    const album12 = [
      {
        title: "Habibi Funk 018: The SLAM! Years (1983 - 1988)",
        price: "23.47",
        cover: "https://f4.bcbits.com/img/a0130913908_10.jpg",
        releaseDate: new Date("2022-02-05T00:00:00Z"),
        description:
          "If you were to ask us for a defining Habibi Funk track, there are a few that come to mind: from Fadoul’s “Sid Redad,“ Dalton’s “Soul Brother“ to Ahmed Malek’s “Omar Gatlato.“ However, none are as widely connected with us at this point as Hamid Al Shaeri’s “Ayonha.“ We heard the track for the first time when we were working on selecting tracks for your first compilation and we instantly loved it. We obviously had heard of Hamid El Shaeri’s music before, but only material from his Al Jeel phase when he was already the full-blown superstar he is now. Listening to his releases from the early 1980’s opened a whole new door for us. At the time, Hamid had just left Libya to pursue his career in Egypt via a detour in London, where he recorded his first album.",
        genre: genres[11],
        format: formats[1],
        artist: "Hamid El Shaeri",
        artistRef: '',
        tracks: [
          {
            title: "Tew'idni Dom",
            price: 1,
            source: trackSrcs[0],
            length: 267000,
          },
          {
            title: "Yefkini Nesma'sotak",
            price: 1,
            source: trackSrcs[1],
            length: 243600,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album12);
    const album12InDatabase = await Album.findOne({
      title: "Habibi Funk 018: The SLAM! Years (1983 - 1988)",
    });
    await Artist.findOneAndUpdate(
      { name: "Habibi Funk Records" },
      { albums: [album12InDatabase] }
    );
    const artist12InDatabse = await Artist.findOne({ name: "Habibi Funk Records" });
    await Album.findOneAndUpdate(
      { title: "Habibi Funk 018: The SLAM! Years (1981 - 1988)" },
      { artistRef: artist12InDatabse._id }
    );

    const artist13 = [
      {
        name: "Yussef Kamaal",
        profilePic: "https://f4.bcbits.com/img/0008156826_10.jpg",
        website: "",
        location: "London, UK",
        albums: [],
      },
    ];
    await Artist.create(artist13);
    const album13 = [
      {
        title: "Black Focus",
        price: "10.05",
        cover: "https://f4.bcbits.com/img/a2077159990_10.jpg",
        releaseDate: new Date("2017-09-22T00:00:00Z"),
        description:
          "The borders between London’s musical tribes have always been porous. For Yussef Kamaal, the sound of the capital – with its hum of jungle, grime and broken beat – has shaped a self-taught, UK-tipped approach to playing jazz. In the states, the genre’s long-running to-and-fro with hip hop – from Robert Glasper to Kamasi Washington – has reimagined it within US culture. On Black Focus, Yussef Kamaal frame jazz inside the bass-saturated, pirate radio broadcasts of London.",
        genre: genres[12],
        format: formats[2],
        artist: "Yussef Kamaal",
        artistRef: '',
        tracks: [
          {
            title: "Black Focus",
            price: 1.21,
            source: trackSrcs[1],
            length: 273400,
          },
          {
            title: "Strings Of Light",
            price: 1.21,
            source: trackSrcs[0],
            length: 506400,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album13);
    const album13InDatabase = await Album.findOne({
      title: "Black Focus",
    });
    await Artist.findOneAndUpdate(
      { name: "Yussef Kamaal" },
      { albums: [album13InDatabase] }
    );
    const artist13InDatabse = await Artist.findOne({ name: "Yussef Kamaal" });
    await Album.findOneAndUpdate(
      { title: "Black Focus" },
      { artistRef: artist13InDatabse._id }
    );

    const artist14 = [
      {
        name: "S280F",
        profilePic: "https://f4.bcbits.com/img/0026739847_10.jpg",
        website: "",
        location: "Los Angeles, California",
        albums: [],
      },
    ];
    await Artist.create(artist14);
    const album14 = [
      {
        title: "28",
        price: "8.28",
        cover: "https://f4.bcbits.com/img/a1421847739_10.jpg",
        releaseDate: new Date("2021-04-28T00:00:00Z"),
        description:
          "ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉ ه҈҉҉҉҉҉҉҉҉ ",
        genre: genres[0],
        format: formats[0],
        artist: "S280F",
        artistRef: '',
        tracks: [
          {
            title: "knifework reveals angelic reality (011668)",
            price: 1.99,
            source: trackSrcs[1],
            length: 344000,
          },
          {
            title: "6M (28) (JOHN OBJECT) (FITNESSS)",
            price: 1.99,
            source: trackSrcs[0],
            length: 320300,
          },
        ],
        ownedBy: [],
      },
      {
        title: "ALL DOGS GO TO HELL",
        price: "8.20",
        cover: "https://f4.bcbits.com/img/a2445541207_10.jpg",
        releaseDate: new Date("2019-04-18T00:00:00Z"),
        description: "",
        genre: genres[0],
        format: formats[0],
        artist: "S280F",
        artistRef: '',
        tracks: [
          {
            title: "keep precious things inside you or you will lose them",
            price: 1.29,
            source: trackSrcs[0],
            length: 263000,
          },
          {
            title: "fear hidden as anticipation PAIGE 3 - LOCKPICK 3",
            price: 1.29,
            source: trackSrcs[1],
            length: 330000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album14);
    const album14InDatabase = await Album.findOne({
      title: "28",
    });
    const album14InDatabase2 = await Album.findOne({
      title: "ALL DOGS GO TO HELL",
    });
    await Artist.findOneAndUpdate(
      { name: "S280F" },
      { albums: [album14InDatabase, album14InDatabase2] }
    );
    const artist14InDatabse = await Artist.findOne({ name: "S280F" });
    await Album.findOneAndUpdate(
      { title: "28" },
      { artistRef: artist14InDatabse._id }
    );
    await Album.findOneAndUpdate(
      { title: "ALL DOGS GO TO HELL" },
      { artistRef: artist14InDatabse._id }
    );

    const artist15 = [
      {
        name: "Dusty Ballz",
        profilePic: "https://f4.bcbits.com/img/0030598112_10.jpg",
        website: "",
        location: "London, UK",
        albums: [],
      },
    ];
    await Artist.create(artist15);
    const album15 = [
      {
        title: "Cycle 循环",
        price: "12.07",
        cover: "https://f4.bcbits.com/img/a4159139218_10.jpg",
        releaseDate: new Date("2022-10-02T00:00:00Z"),
        description:
          "Hugjiltu plays the guitar with five strings. Not used to the standard chord-forms of Western guitar, he invented his own system of tuning, combining the three-string Mongolian lute and the two-string horsehead fiddle, both of which he started playing as a child. These five strings epitomise his relationship with the music from within the Mongolian ethnic tradition and with the music beyond, a state of artistic composure few in his generation have achieved.",
        genre: genres[5],
        format: formats[3],
        artist: "Hugjiltu 胡格吉乐图",
        artistRef: '',
        tracks: [
          {
            title: "象山 Mount Elephant",
            price: 1.09,
            source: trackSrcs[1],
            length: 243500,
          },
          {
            title: "漫步 Wandering",
            price: 1.99,
            source: trackSrcs[0],
            length: 247000,
          },
        ],
        ownedBy: [],
      },
      {
        title: "Tractor Academy 拖​拉​机​学​院",
        price: "4.83",
        cover: "https://f4.bcbits.com/img/a1490131572_10.jpg",
        releaseDate: new Date("2021-06-01T00:00:00Z"),
        description:
          "Simultaneously casual and sincere, Deng Boyu’s latest output on cassette, Tractor Academy, is both a tongue-in-cheek teaser and a wildly romantic postscript to his upcoming solo LP, Chimney Complex. The eight songs here unveil the instinctual id beneath the electronic alter ego of Deng Boyu, known primarily as the ever-present drummer in China’s young and vibrant scene of free jazz and improvisation.",
        genre: genres[5],
        format: formats[0],
        artist: "Deng Boyu 邓博宇",
        artistRef: '',
        tracks: [
          {
            title: "传送·二 Transmission Pt. 2",
            price: 1.29,
            source: trackSrcs[0],
            length: 636000,
          },
          {
            title: "二八锤 Two-Eight Hammer",
            price: 1.49,
            source: trackSrcs[1],
            length: 193000,
          },
        ],
        ownedBy: [],
      },
      {
        title: "Chinese Medicine 草​乙​术",
        price: "4.83",
        cover: "https://f4.bcbits.com/img/a0619871825_10.jpg",
        releaseDate: new Date("2020-05-01T00:00:00Z"),
        description:
          "A classically trained Chinese bamboo flautist, Lao Dan picked up the saxophone again around 2013 as he went wildly astray in the world of avant-garde jazz and free improvisation. While demonstrating an ever-growing ability to deliver explosive force and intensity in his free playing, Lao Dan keeps a brutal honesty in his approach to the instrument. He plays ‘jazz’ as what it is, not what it’s supposed to be. Navigating constantly between the East and the West, Lao Dan embraces a unique aesthetic which fuses all his past influences into a voice of glorious mayhem and sheer zaniness.",
        genre: genres[5],
        format: formats[0],
        artist: "Lao Dan 老丹",
        artistRef: '',
        tracks: [
          {
            title: "鹤虱 Crane Lice",
            price: 1.09,
            source: trackSrcs[1],
            length: 963000,
          },
          {
            title: "鹅不食草 Goose-no-eat Herb",
            price: 1.09,
            source: trackSrcs[0],
            length: 426600,
          },
          {
            title: "淫羊藿 Horny Goat Weed",
            price: 1.09,
            source: trackSrcs[1],
            length: 1026600,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album15);
    const album15InDatabase = await Album.findOne({
      title: "Cycle 循环",
    });
    const album15InDatabase2 = await Album.findOne({
      title: "Tractor Academy 拖​拉​机​学​院",
    });
    const album15InDatabase3 = await Album.findOne({
      title: "Chinese Medicine 草​乙​术",
    });
    await Artist.findOneAndUpdate(
      { name: "Dusty Ballz" },
      { albums: [album15InDatabase, album15InDatabase2, album15InDatabase3] }
    );
    const artist15InDatabse = await Artist.findOne({ name: "Dusty Ballz" });
    await Album.findOneAndUpdate(
      { title: "Cycle 循环" },
      { artistRef: artist15InDatabse._id }
    );
    await Album.findOneAndUpdate(
      { title: "Tractor Academy 拖​拉​机​学​院" },
      { artistRef: artist15InDatabse._id }
    );
    await Album.findOneAndUpdate(
      { title: "Chinese Medicine 草​乙​术" },
      { artistRef: artist15InDatabse._id }
    );

    const artist16 = [
      {
        name: "WIDOWSPEAK",
        profilePic: "https://f4.bcbits.com/img/0027248232_10.jpg",
        website: "widowspeakforever.com",
        location: "New York, New York",
        albums: [],
      },
    ];
    await Artist.create(artist16);
    const album16 = [
      {
        title: "Plum",
        price: "13",
        cover: "https://f4.bcbits.com/img/a0334701971_10.jpg",
        releaseDate: new Date("2020-08-28T00:00:00Z"),
        description: "“The stone that’s buried: what the fruit is for.”",
        genre: genres[3],
        format: formats[2],
        artist: "WIDOWSPEAK",
        artistRef: '',
        tracks: [
          {
            title: "Plum",
            price: 1,
            source: trackSrcs[0],
            length: 240000,
          },
          {
            title: "The Good Ones",
            price: 1,
            source: trackSrcs[1],
            length: 280000,
          },
          {
            title: "Y2K",
            price: 1,
            source: trackSrcs[0],
            length: 280000,
          },
        ],
        ownedBy: [],
      },
      {
        title: "True Blue - Demo & Cover",
        price: "2",
        cover: "https://f4.bcbits.com/img/a0143754875_10.jpg",
        releaseDate: new Date("2022-12-02T00:00:00Z"),
        description:
          "Written by Molly Hamilton & Robert Earl Thomas \nMastered by Jamie Harley \nCover photo by Michael Stasiak",
        genre: genres[1],
        format: formats[0],
        artist: "WIDOWSPEAK",
        artistRef: '',
        tracks: [
          {
            title: "True Blue (Demo)",
            price: 1,
            source: trackSrcs[1],
            length: 240000,
          },
          {
            title: "True Blue (Robert Earl Thomas Cover)",
            price: 1,
            source: trackSrcs[0],
            length: 290000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album16);
    const album16InDatabase = await Album.findOne({
      title: "Plum",
    });
    const album16InDatabase2 = await Album.findOne({
      title: "True Blue - Demo & Cover",
    });
    await Artist.findOneAndUpdate(
      { name: "WIDOWSPEAK" },
      { albums: [album16InDatabase, album16InDatabase2] }
    );
    const artist16InDatabse = await Artist.findOne({ name: "WIDOWSPEAK" });
    await Album.findOneAndUpdate(
      { title: "Plum" },
      { artistRef: artist16InDatabse._id }
    );
    await Album.findOneAndUpdate(
      { title: "True Blue - Demo & Cover" },
      { artistRef: artist16InDatabse._id }
    );

    const artist17 = [
      {
        name: "dj lostboi",
        profilePic: "https://f4.bcbits.com/img/0018988054_10.jpg",
        website: "https://soundcloud.com/djlostboi",
        location: "",
        albums: [],
      },
    ];
    await Artist.create(artist17);
    const album17 = [
      {
        title: "FOREVER FALLEN",
        price: "1.6",
        cover: "https://f4.bcbits.com/img/a2446065168_10.jpg",
        releaseDate: new Date("2016-02-11T00:00:00Z"),
        description: "",
        genre: genres[3],
        format: formats[0],
        artist: "dj lostboi",
        artistRef: '',
        tracks: [
          {
            title: "LINDA",
            price: 0.49,
            source: trackSrcs[0],
            length: 190000,
          },
          {
            title: "ANGEL",
            price: 0.49,
            source: trackSrcs[1],
            length: 230000,
          },
          {
            title: "+33006",
            price: 0.49,
            source: trackSrcs[0],
            length: 170000,
          },
        ],
        ownedBy: [],
      },
      {
        title: "UNTITLED",
        price: "3.2",
        cover: "https://f4.bcbits.com/img/a3171987100_10.jpg",
        releaseDate: new Date("2021-06-04T00:00:00Z"),
        description:
          "all my respect for ⭐︎ GRIMES CHARLI XCX TORUS OLIVE ERIC SERRANELLY FURTADO & MORE",
        genre: genres[9],
        format: formats[0],
        artist: "dj lostboi",
        artistRef: '',
        tracks: [
          {
            title: "ESPRIT SE",
            price: 0.2,
            source: trackSrcs[1],
            length: 290000,
          },
          {
            title: "PET SHOP B",
            price: 0.2,
            source: trackSrcs[0],
            length: 170000,
          },
        ],
        ownedBy: [],
      },
    ];
    await Album.create(album17);
    const album17InDatabase = await Album.findOne({
      title: "FOREVER FALLEN",
    });
    const album17InDatabase2 = await Album.findOne({
      title: "UNTITLED",
    });
    await Artist.findOneAndUpdate(
      { name: "dj lostboi" },
      { albums: [album17InDatabase, album17InDatabase2] }
    );
    const artist17InDatabse = await Artist.findOne({ name: "dj lostboi" });
    await Album.findOneAndUpdate(
      { title: "FOREVER FALLEN" },
      { artistRef: artist17InDatabse._id }
    );
    await Album.findOneAndUpdate(
      { title: "UNTITLED" },
      { artistRef: artist17InDatabse._id }
    );

    // This album is also owned by user2 for testing
    const albumForUser1Collection1 = await Album.findOne({ title: "28" });
    const albumForUser1Collection2 = await Album.findOne({
      title: "Cycle 循环",
    });
    const albumForUser1Collection3 = await Album.findOne({ title: "Plum" });

    const albumForUser1Wishlist1 = await Album.findOne({
      title: "FOREVER FALLEN",
    });
    const albumForUser1Wishlist2 = await Album.findOne({
      title: "Stranger in the Alps",
    });
    const albumForUser1Wishlist3 = await Album.findOne({
      title: "HOW MUCH ART CAN YOU TAKE?",
    });
    const albumForUser1Wishlist4 = await Album.findOne({
      title: "i became birds",
    });
    const albumForUser1Wishlist5 = await Album.findOne({ title: "SOS" });

    const userFollowersForUser1 = await User.findOne({
      username: "user2",
    });

    const userFollowingForUser1 = await User.findOne({
      username: "user2",
    });

    const artistFollowingForUser1 = await Artist.findOne({ name: "S280F" });
    const artistFollowingForUser2 = await Artist.findOne({
      name: "Yussef Kamaal",
    });
    const artistFollowingForUser3 = await Artist.findOne({ name: "Ab Uno" });
    const artistFollowingForUser4 = await Artist.findOne({
      name: "dj lostboi",
    });

    await User.findOneAndUpdate(
      { username: "user1" },
      {
        $set: {
          userCollection: [
            albumForUser1Collection1,
            albumForUser1Collection2,
            albumForUser1Collection3,
          ],
          wishlist: [
            albumForUser1Wishlist1,
            albumForUser1Wishlist2,
            albumForUser1Wishlist3,
            albumForUser1Wishlist4,
            albumForUser1Wishlist5,
          ],
          followers: [userFollowersForUser1],
          followingUser: [userFollowingForUser1],
          followingArtist: [
            artistFollowingForUser1,
            artistFollowingForUser2,
            artistFollowingForUser3,
            artistFollowingForUser4,
          ],
        },
      }
    );

    const userFollowersForUser2 = await User.findOne({
      username: "user1",
    });

    const userFollowingForUser2 = await User.findOne({
      username: "user1",
    });
    await User.findOneAndUpdate(
      { username: "user2" },
      {
        $set: {
          followers: [userFollowersForUser2],
          followingUser: [userFollowingForUser2],
          userCollection: [albumForUser1Collection1],
        },
      }
    );

    const user1ForUpdateAlbumOwnedBy = await User.findOne({
      username: "user1",
    });
    const user2ForUpdateAlbumOwnedBy = await User.findOne({
      username: "user2",
    });
    await Album.findOneAndUpdate(
      { title: "28" },
      {
        ownedBy: [
          {
            _id: user1ForUpdateAlbumOwnedBy._id,
            username: user1ForUpdateAlbumOwnedBy.username,
            profilePic: user1ForUpdateAlbumOwnedBy.profilePic,
          },
          {
            _id: user2ForUpdateAlbumOwnedBy._id,
            username: user2ForUpdateAlbumOwnedBy.username,
            profilePic: user2ForUpdateAlbumOwnedBy.profilePic,
          },
        ],
      }
    );
    await Album.findOneAndUpdate(
      { title: "Cycle 循环" },
      {
        ownedBy: [
          {
            _id: user1ForUpdateAlbumOwnedBy._id,
            username: user1ForUpdateAlbumOwnedBy.username,
            profilePic: user1ForUpdateAlbumOwnedBy.profilePic,
          },
        ],
      }
    );
    await Album.findOneAndUpdate(
      { title: "Plum" },
      {
        ownedBy: [
          {
            _id: user1ForUpdateAlbumOwnedBy._id,
            username: user1ForUpdateAlbumOwnedBy.username,
            profilePic: user1ForUpdateAlbumOwnedBy.profilePic,
          },
        ],
      }
    );
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
