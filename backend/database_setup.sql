DROP DATABASE IF EXISTS music_app;
CREATE DATABASE music_app;
USE music_app;
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);
CREATE TABLE artists (
  artist_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  genre VARCHAR(50)
);
CREATE TABLE albums (
  album_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_year INT,
  genre VARCHAR(50),
  cover_url VARCHAR(255),
  artist_id INT,
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);
CREATE TABLE songs (
  song_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  album_id INT,
  FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);
CREATE TABLE songs_artists (
  song_id INT,
  artist_id INT,
  PRIMARY KEY (song_id, artist_id),
  FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE,
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);
CREATE TABLE lyrics (
  lyric_id INT AUTO_INCREMENT PRIMARY KEY,
  text_content TEXT NOT NULL,
  song_id INT NOT NULL,
  part_type ENUM(
    'verse',
    'chorus',
    'bridge',
    'pre-chorus',
    'post-chorus',
    'intro',
    'outro'
  ) NOT NULL DEFAULT 'verse',
  position INT NOT NULL,
  FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE
);
CREATE TABLE song_views (
  song_view_id INT AUTO_INCREMENT PRIMARY KEY,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  song_id INT,
  user_id INT,
  FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
INSERT INTO artists (name, genre)
VALUES ('Miley Cyrus', 'Pop'),
  ('Post Malone', 'Hip Hop/Pop'),
  ('Taylor Swift', 'Pop/Country');
INSERT INTO albums (title, release_year, genre, artist_id)
VALUES ('Endless Summer Vacation', 2023, 'Pop', 1),
  ('Austin', 2023, 'Pop', 2),
  ('Midnights', 2022, 'Pop', 3);
INSERT INTO songs (title, album_id)
VALUES ('Flowers', 1),
  ('Chemical', 2),
  ('Anti-Hero', 3),
  ('Jaded', 1);
INSERT INTO songs_artists (song_id, artist_id)
VALUES (1, 1),
  -- Flowers -> Miley
  (2, 2),
  -- Chemical -> Post Malone
  (3, 3),
  -- Anti-Hero -> Taylor
  (4, 1);
-- Jaded -> Miley
INSERT INTO users (username, email, password_hash, role)
VALUES (
    'test_user',
    'test@example.com',
    'hash_here',
    'user'
  ),
  (
    'admin_david',
    'admin@musicapp.com',
    'hash_here',
    'admin'
  );
-- Flowers - Miley Cyrus
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    1,
    'intro',
    1,
    'Soft sunrise, the world wakes up, I take a breath.'
  ),
  (
    1,
    'verse',
    2,
    'I bloom in the sunlight, dancing free, letting go of yesterday, chasing what I need.'
  ),
  (
    1,
    'pre-chorus',
    3,
    'Shadows fade, I feel the warmth, every step I take is mine.'
  ),
  (
    1,
    'chorus',
    4,
    'Every shadow fades behind me, the past is just a memory, I step into the light.'
  ),
  (
    1,
    'verse',
    5,
    'The wind carries my laughter, echoes down the empty streets, I find myself again.'
  ),
  (
    1,
    'chorus',
    6,
    'Every shadow fades behind me, the past is just a memory, I step into the light.'
  ),
  (
    1,
    'bridge',
    7,
    'I lift my hands, I touch the sky, the pain is gone, and I can fly.'
  ),
  (
    1,
    'chorus',
    8,
    'Every shadow fades behind me, the past is just a memory, I step into the light.'
  ),
  (
    1,
    'outro',
    9,
    'Sunset fades, I walk alone, but stronger than before.'
  );
-- Chemical - Post Malone
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    2,
    'intro',
    1,
    'Neon lights flicker, the night is calling.'
  ),
  (
    2,
    'verse',
    2,
    'Every touch sparks a flame, night flows like a chemical dream, hearts collide in rhythm.'
  ),
  (
    2,
    'pre-chorus',
    3,
    'Lost in the city, every heartbeat matches mine.'
  ),
  (
    2,
    'chorus',
    4,
    'The world ignites around us, every heartbeat synchronized, we live like fire.'
  ),
  (
    2,
    'verse',
    5,
    'Moments slip away like sand, but this night feels eternal, we hold onto it tight.'
  ),
  (
    2,
    'chorus',
    6,
    'The world ignites around us, every heartbeat synchronized, we live like fire.'
  ),
  (
    2,
    'bridge',
    7,
    'When the morning comes, the sparks remain, memories of our chemical rain.'
  ),
  (
    2,
    'chorus',
    8,
    'The world ignites around us, every heartbeat synchronized, we live like fire.'
  ),
  (
    2,
    'outro',
    9,
    'Fading neon, but our hearts still burn, night ends, but the rhythm stays.'
  );
-- Anti-Hero - Taylor Swift
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    3,
    'intro',
    1,
    'Quiet reflections in the dark, searching for a spark.'
  ),
  (
    3,
    'verse',
    2,
    'Facing my reflection, the villain inside me, learning to forgive, seeking the light.'
  ),
  (
    3,
    'pre-chorus',
    3,
    'Each mistake a shadow, but I step into the day.'
  ),
  (
    3,
    'chorus',
    4,
    'I am the anti-hero, battling my fears, rising through the shadows, shedding all my tears.'
  ),
  (
    3,
    'verse',
    5,
    'I stumble through my choices, haunted by the echoes, searching for my voice.'
  ),
  (
    3,
    'chorus',
    6,
    'I am the anti-hero, battling my fears, rising through the shadows, shedding all my tears.'
  ),
  (
    3,
    'bridge',
    7,
    'And when the night feels endless, I remember who I am, I fight, I stand.'
  ),
  (
    3,
    'chorus',
    8,
    'I am the anti-hero, battling my fears, rising through the shadows, shedding all my tears.'
  ),
  (
    3,
    'outro',
    9,
    'Morning light, I find my way, stronger than I was yesterday.'
  );
-- Jaded - Miley Cyrus
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    4,
    'intro',
    1,
    'Dusk falls, streets are empty, my thoughts collide.'
  ),
  (
    4,
    'verse',
    2,
    'Summer streets and restless nights, I wander feeling alive, yet jaded by the past.'
  ),
  (
    4,
    'pre-chorus',
    3,
    'Shadows whisper, memories linger, I hold my breath.'
  ),
  (
    4,
    'chorus',
    4,
    'Jaded hearts keep searching, reaching for the skies, trying to feel, trying to find.'
  ),
  (
    4,
    'verse',
    5,
    'The music pulses in my chest, memories swirl, laughter and pain entwined.'
  ),
  (
    4,
    'chorus',
    6,
    'Jaded hearts keep searching, reaching for the skies, trying to feel, trying to find.'
  ),
  (
    4,
    'bridge',
    7,
    'I close my eyes and take a breath, the world keeps spinning, I face what’s next.'
  ),
  (
    4,
    'chorus',
    8,
    'Jaded hearts keep searching, reaching for the skies, trying to feel, trying to find.'
  ),
  (
    4,
    'outro',
    9,
    'Night ends, but the feeling remains, a spark of hope in the haze.'
  );
-- test queries
SELECT *
FROM lyrics;
SELECT part_type,
  text_content
FROM lyrics
WHERE song_id = 1
ORDER BY position;
SELECT s.title AS Låt,
  COUNT(sv.song_view_id) AS Antal_Views
FROM songs s
  LEFT JOIN song_views sv ON s.song_id = sv.song_id
GROUP BY s.song_id,
  s.title
ORDER BY Antal_Views DESC;
SELECT *
FROM users;
SELECT s.title,
  a.name
FROM songs s
  JOIN songs_artists sa ON s.song_id = sa.song_id
  JOIN artists a ON sa.artist_id = a.artist_id;
SELECT *
FROM songs;
-- resten av låtarna
INSERT INTO artists (name, genre)
VALUES ('Bob Marley', 'Reggae'),
  ('Adele', 'Soul'),
  ('The Weeknd', 'R&B'),
  ('Ed Sheeran', 'Pop'),
  ('Billie Eilish', 'Alternative'),
  ('Lana Del Rey', 'Indie Pop');
INSERT INTO albums (title, release_year, genre, artist_id)
VALUES ('Island Vibes', 1977, 'Reggae', 4),
  -- Bob Marley
  ('Heartbreak Notes', 2021, 'Soul', 5),
  -- Adele
  ('Midnight Dreams', 2020, 'R&B', 6),
  -- The Weeknd
  ('Calculations', 2023, 'Pop', 7),
  -- Ed Sheeran
  ('Dark Rooms', 2019, 'Alt', 8),
  -- Billie Eilish
  ('Blue Velvet', 2012, 'Indie', 9);
-- Lana Del Rey
INSERT INTO songs (title, album_id)
VALUES ('Three Little Birds', 4),
  -- song_id 5
  ('Cold Shoulder', 5),
  -- song_id 6
  ('Neon Lights', 6),
  -- song_id 7
  ('Tides', 7),
  -- song_id 8
  ('Ocean Eyes', 8),
  -- song_id 9
  ('West Coast Sky', 9);
-- song_id 10
INSERT INTO songs_artists (song_id, artist_id)
VALUES (5, 4),
  -- Three Little Birds -> Bob Marley
  (6, 5),
  -- Cold Shoulder -> Adele
  (7, 6),
  -- Neon Lights -> The Weeknd
  (8, 7),
  -- Tides -> Ed Sheeran
  (9, 8),
  -- Dark Rooms -> Billie Eilish
  (10, 9);
-- West Coast Sky -> Lana Del Rey
--
-- Låt 5: Three Little Birds (Bob Marley Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    5,
    'intro',
    1,
    '(Mellow reggae rhythm with a steady bassline and scratchy guitar)'
  ),
  (
    5,
    'chorus',
    2,
    'Don''t worry about a thing, ''Cause every little thing gonna be alright.'
  ),
  (
    5,
    'chorus',
    3,
    'Singin'': Don''t worry about a thing, ''Cause every little thing gonna be alright!'
  ),
  (
    5,
    'verse',
    4,
    'Rise up this mornin'', Smiled with the risin'' sun, Three little birds pitch by my doorstep.'
  ),
  (
    5,
    'verse',
    5,
    'Singin'' sweet songs of melodies pure and true, Sayin'', (This is my message to you-ou-ou:)'
  ),
  (
    5,
    'chorus',
    6,
    'Singin'': Don''t worry about a thing, ''Cause every little thing gonna be alright.'
  ),
  (
    5,
    'verse',
    7,
    'Rise up this mornin'', Smiled with the risin'' sun, Three little birds pitch by my doorstep.'
  ),
  (
    5,
    'chorus',
    8,
    'Don''t worry about a thing, ''Cause every little thing gonna be alright.'
  ),
  (
    5,
    'outro',
    9,
    'Singin'': Don''t worry... (Every little thing) ...gonna be alright. (Fade out)'
  );
-- Låt 6: Cold Shoulder (Adele Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    6,
    'intro',
    1,
    '(Emotional piano solo, slow tempo)'
  ),
  (
    6,
    'verse',
    2,
    'I heard you found a place where the winter never ends, and you keep your secrets locked away.'
  ),
  (
    6,
    'verse',
    3,
    'I tried to reach the shore but the water’s getting cold, and I’m losing all the words I had to say.'
  ),
  (
    6,
    'pre-chorus',
    4,
    'And it’s funny how the time just slips away, while I’m standing in the rain of yesterday.'
  ),
  (
    6,
    'chorus',
    5,
    'So give me the cold shoulder if that’s what you need, but don’t tell me that you’re happy when you bleed.'
  ),
  (
    6,
    'chorus',
    6,
    'I’m tired of the silence, I’m tired of the ghost of us, why is it so hard for you to trust?'
  ),
  (
    6,
    'bridge',
    7,
    'I gave you my heart and I gave you my soul, but you left me here with nothing but a hole.'
  ),
  (
    6,
    'outro',
    8,
    'Maybe in another life, we wouldn''t have to say goodbye... (Piano fades)'
  );
-- Låt 7: Neon Lights (The Weeknd Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    7,
    'intro',
    1,
    '(Heavy 80s synthesizer starts, fast drum machine kicks in)'
  ),
  (
    7,
    'verse',
    2,
    'The city wakes up when the sun goes down, I’m driving fast across this lonely town.'
  ),
  (
    7,
    'verse',
    3,
    'I see your face in every passing car, I wonder if you know just where you are.'
  ),
  (
    7,
    'pre-chorus',
    4,
    'I’m calling out your name, but the wind just blows it back, I’m losing track.'
  ),
  (
    7,
    'chorus',
    5,
    'Under the neon lights, we’re burning out of time, I’m trying to make you mine tonight.'
  ),
  (
    7,
    'chorus',
    6,
    'Oh, the neon lights, they blind me every time, I’m crossing every line for you.'
  ),
  (
    7,
    'bridge',
    7,
    'Don’t leave me in the dark, I’ve come too far to lose the spark.'
  ),
  (
    7,
    'outro',
    8,
    'Neon lights... they keep me alive... until the morning comes. (Synth arpeggio)'
  );
-- Låt 8: Tides (Ed Sheeran Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    8,
    'intro',
    1,
    '(Acoustic guitar strumming, percussive hits on the wood)'
  ),
  (
    8,
    'verse',
    2,
    'I wrote your name on a piece of paper but the wind blew it out to the sea.'
  ),
  (
    8,
    'verse',
    3,
    'Now I’m sitting on the dock just watching the ships, wondering if you’re thinking of me.'
  ),
  (
    8,
    'pre-chorus',
    4,
    'And we were just kids with a pocket full of dreams, and a guitar string that broke at the seams.'
  ),
  (
    8,
    'chorus',
    5,
    'Oh, the tides are turning now, I’ll find my way to you somehow.'
  ),
  (
    8,
    'chorus',
    6,
    'It doesn’t matter where we go, as long as the rhythm is slow and the love starts to grow.'
  ),
  (
    8,
    'bridge',
    7,
    'I’ll build a boat out of old memories, and sail across these sapphire seas.'
  ),
  (
    8,
    'outro',
    8,
    'Just you and me, under the willow tree. (Soft strum)'
  );
-- Låt 9: Dark Rooms (Billie Eilish Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    9,
    'intro',
    1,
    '(Whispered vocals, heavy distorted bass background)'
  ),
  (
    9,
    'verse',
    2,
    'Step on the glass, watch it break into dust, I’m the only one here that I can trust.'
  ),
  (
    9,
    'verse',
    3,
    'Keep the lights low, I don’t want to be seen, I’m living inside of a digital dream.'
  ),
  (
    9,
    'chorus',
    4,
    'In these dark rooms, we’re all just shadows dancing on the wall.'
  ),
  (
    9,
    'chorus',
    5,
    'In these dark rooms, I’m waiting for the silence to fall.'
  ),
  (
    9,
    'bridge',
    6,
    'Don’t wake me up, I like it better when I’m asleep. The secrets I keep are buried too deep.'
  ),
  (
    9,
    'outro',
    7,
    'Go to sleep... go to sleep... (Eerie vocal layers)'
  );
-- Låt 10: West Coast Sky (Lana Del Rey Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    10,
    'intro',
    1,
    '(Cinematic strings and a slow, hazy drum beat)'
  ),
  (
    10,
    'verse',
    2,
    'Put on your vintage dress, baby, let’s go for a ride, down where the ocean meets the mountainside.'
  ),
  (
    10,
    'verse',
    3,
    'I’ve got my cherry soda and my red lipstick on, we’ll keep on dancing until the break of dawn.'
  ),
  (
    10,
    'pre-chorus',
    4,
    'Heaven is a place on the edge of the coast, it’s the things that I love that I miss the most.'
  ),
  (
    10,
    'chorus',
    5,
    'Blue, blue, West Coast sky, watching the golden birds fly by.'
  ),
  (
    10,
    'chorus',
    6,
    'I’m in love with the way you say my name, under the summer rain, it’s never the same.'
  ),
  (
    10,
    'bridge',
    7,
    'Money and power, and diamonds and fame, they don’t mean a thing if I don’t have your name.'
  ),
  (
    10,
    'outro',
    8,
    'Dreaming of you... in the pale moonlight... (Violins fade out)'
  );
-- 10 till här
-- Lägg till nya artister
INSERT INTO artists (name, genre)
VALUES ('Dua Lipa', 'Pop/Dance'),
  ('Drake', 'Hip Hop/Rap'),
  ('Ariana Grande', 'Pop/R&B'),
  ('Coldplay', 'Alternative Rock'),
  ('Kendrick Lamar', 'Hip Hop'),
  ('Sia', 'Pop'),
  ('Shawn Mendes', 'Pop'),
  ('Rihanna', 'Pop/R&B'),
  ('Imagine Dragons', 'Pop Rock'),
  ('Halsey', 'Alternative/Pop');
-- Lägg till nya album
INSERT INTO albums (title, release_year, genre, artist_id)
VALUES ('Future Nostalgia', 2020, 'Pop/Dance', 10),
  ('Certified Lover Boy', 2021, 'Hip Hop', 11),
  ('Positions', 2020, 'Pop/R&B', 12),
  (
    'Music of the Spheres',
    2021,
    'Alternative Rock',
    13
  ),
  ('DAMN.', 2017, 'Hip Hop', 14),
  ('Everyday is Christmas', 2017, 'Pop', 15),
  ('Wonder', 2020, 'Pop', 16),
  ('Anti', 2016, 'Pop/R&B', 17),
  ('Evolve', 2017, 'Pop Rock', 18),
  ('Manic', 2020, 'Alternative/Pop', 19);
-- Lägg till nya låtar
INSERT INTO songs (title, album_id)
VALUES ('Levitating', 10),
  -- Dua Lipa
  ('Way 2 Sexy', 11),
  -- Drake
  ('34+35', 12),
  -- Ariana Grande
  ('Higher Power', 13),
  -- Coldplay
  ('HUMBLE.', 14),
  -- Kendrick Lamar
  ('Snowman', 15),
  -- Sia
  ('Monster', 16),
  -- Shawn Mendes
  ('Work', 17),
  -- Rihanna
  ('Believer', 18),
  -- Imagine Dragons
  ('Graveyard', 19);
-- Halsey
-- Koppla låtar med artister
INSERT INTO songs_artists (song_id, artist_id)
VALUES (11, 10),
  (12, 11),
  (13, 12),
  (14, 13),
  (15, 14),
  (16, 15),
  (17, 16),
  (18, 17),
  (19, 18),
  (20, 19);
-- Låt 11: Levitating (Dua Lipa Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    11,
    'intro',
    1,
    '(Disco synth intro, upbeat bass)'
  ),
  (
    11,
    'verse',
    2,
    'If you wanna run away with me, I know a galaxy and I can take you for a ride.'
  ),
  (
    11,
    'pre-chorus',
    3,
    'I got you, moonlight, you’re my starlight, I need you all night.'
  ),
  (
    11,
    'chorus',
    4,
    'I’m levitating, higher than the ceiling, love is what I’m feeling.'
  ),
  (
    11,
    'verse',
    5,
    'Dance all night, forget the gravity, lost in this moment with you by me.'
  ),
  (
    11,
    'chorus',
    6,
    'I’m levitating, higher than the ceiling, love is what I’m feeling.'
  ),
  (
    11,
    'bridge',
    7,
    'Take my hand, don’t let go, together we will glow.'
  ),
  (
    11,
    'outro',
    8,
    'La-la-la, levitating... (fade out)'
  );
-- Låt 12: Way 2 Sexy (Drake Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    12,
    'intro',
    1,
    '(Trap beat kicks in, hi-hat rolls)'
  ),
  (
    12,
    'verse',
    2,
    'Too sexy for my shirt, too sexy for my girl, got me feeling like a king in this world.'
  ),
  (
    12,
    'pre-chorus',
    3,
    'All these cameras flash, everybody knows my name.'
  ),
  (
    12,
    'chorus',
    4,
    'I’m way too sexy, confident and ready, stepping in the spotlight steady.'
  ),
  (
    12,
    'verse',
    5,
    'Pull up in the whip, VIP on the list, making every moment count, can’t resist.'
  ),
  (
    12,
    'chorus',
    6,
    'I’m way too sexy, confident and ready, stepping in the spotlight steady.'
  ),
  (
    12,
    'bridge',
    7,
    'When the night is young, we own the town, never backing down.'
  ),
  (
    12,
    'outro',
    8,
    'Too sexy... yeah, way too sexy...'
  );
-- Låt 13: 34+35 (Ariana Grande Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    13,
    'intro',
    1,
    '(Soft piano with light percussion)'
  ),
  (
    13,
    'verse',
    2,
    'Counting all the hours till I see you again, baby, it’s you I need.'
  ),
  (
    13,
    'pre-chorus',
    3,
    'Whisper in my ear, tell me everything, I’m all yours tonight.'
  ),
  (
    13,
    'chorus',
    4,
    '34 plus 35, you know how we get it, love multiplied.'
  ),
  (
    13,
    'verse',
    5,
    'Late night calls, candlelight falls, every touch electrifies.'
  ),
  (
    13,
    'chorus',
    6,
    '34 plus 35, you know how we get it, love multiplied.'
  ),
  (
    13,
    'bridge',
    7,
    'I can’t wait to show you, all the ways we glow.'
  ),
  (
    13,
    'outro',
    8,
    'Counting down... 34 plus 35... (soft fade)'
  );
-- Låt 14: Higher Power (Coldplay Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    14,
    'intro',
    1,
    '(Synth arpeggios and uplifting drums)'
  ),
  (
    14,
    'verse',
    2,
    'The sky opens up and the light pours in, feeling energy from within.'
  ),
  (
    14,
    'pre-chorus',
    3,
    'I hear the voices calling, lifting me higher.'
  ),
  (
    14,
    'chorus',
    4,
    'You’re my higher power, taking me to the stars, we can reach so far.'
  ),
  (
    14,
    'verse',
    5,
    'Every step I take, I feel your strength surround me.'
  ),
  (
    14,
    'chorus',
    6,
    'You’re my higher power, taking me to the stars, we can reach so far.'
  ),
  (
    14,
    'bridge',
    7,
    'And in this light, I know we’re alive, together we will thrive.'
  ),
  (
    14,
    'outro',
    8,
    'Higher, higher, reaching higher... (strings fade)'
  );
-- Låt 15: HUMBLE. (Kendrick Lamar Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    15,
    'intro',
    1,
    '(Sparse piano, heavy beat kicks in)'
  ),
  (
    15,
    'verse',
    2,
    'Sit down, be humble, watch the city crumble, lessons learned from the struggle.'
  ),
  (
    15,
    'pre-chorus',
    3,
    'Money, fame, they don’t change the game, stay true to your name.'
  ),
  (
    15,
    'chorus',
    4,
    'Be humble, stand tall, never let pride make you fall.'
  ),
  (
    15,
    'verse',
    5,
    'Reflections in the mirror, seeing clearer, the path is near, no fear.'
  ),
  (
    15,
    'chorus',
    6,
    'Be humble, stand tall, never let pride make you fall.'
  ),
  (
    15,
    'bridge',
    7,
    'And when the world gets heavy, I hold steady, stay ready.'
  ),
  (15, 'outro', 8, 'Humble... stay humble...');
-- Låt 16: Snowman (Sia Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    16,
    'intro',
    1,
    '(Piano with gentle bells, soft synths)'
  ),
  (
    16,
    'verse',
    2,
    'Meet me under the winter sky, snow falling softly from high.'
  ),
  (
    16,
    'pre-chorus',
    3,
    'Hold my hand, we’ll build a snowman, memories frozen in time.'
  ),
  (
    16,
    'chorus',
    4,
    'I want you to know, I’ll never let you go, through the frost and snow.'
  ),
  (
    16,
    'verse',
    5,
    'Icicles sparkle in your eyes, winter magic never lies.'
  ),
  (
    16,
    'chorus',
    6,
    'I want you to know, I’ll never let you go, through the frost and snow.'
  ),
  (
    16,
    'bridge',
    7,
    'Even when the cold winds blow, I’ll be with you through it all.'
  ),
  (
    16,
    'outro',
    8,
    'Snow falls, hearts warm, love endures the storm. (Fade)'
  );
-- Låt 17: Monster (Shawn Mendes Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    17,
    'intro',
    1,
    '(Acoustic guitar strum, light percussion)'
  ),
  (
    17,
    'verse',
    2,
    'All eyes on me, I feel the pressure rise, chasing dreams under city lights.'
  ),
  (
    17,
    'pre-chorus',
    3,
    'And I don’t wanna be the one who falls alone.'
  ),
  (
    17,
    'chorus',
    4,
    'I’m a monster in the night, trying to make it right, chasing shadows in the light.'
  ),
  (
    17,
    'verse',
    5,
    'Every step I take, I hear the whispers say, hold on, find your way.'
  ),
  (
    17,
    'chorus',
    6,
    'I’m a monster in the night, trying to make it right, chasing shadows in the light.'
  ),
  (
    17,
    'bridge',
    7,
    'But together we can fight, and turn darkness into light.'
  ),
  (
    17,
    'outro',
    8,
    'Monster fades... we find our place...'
  );
-- Låt 18: Work (Rihanna Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    18,
    'intro',
    1,
    '(Caribbean beat, rhythmic synths)'
  ),
  (
    18,
    'verse',
    2,
    'You see me moving, baby, keep it grooving, work, work, work, work, work.'
  ),
  (
    18,
    'pre-chorus',
    3,
    'Hands on me, don’t let it slip away, night is young, let’s play.'
  ),
  (
    18,
    'chorus',
    4,
    'Work it out, feel the rhythm in your soul, let the music take control.'
  ),
  (
    18,
    'verse',
    5,
    'Lights low, bodies close, heartbeat syncs, everyone knows.'
  ),
  (
    18,
    'chorus',
    6,
    'Work it out, feel the rhythm in your soul, let the music take control.'
  ),
  (
    18,
    'bridge',
    7,
    'All night long, we dance and sing, joy in everything.'
  ),
  (
    18,
    'outro',
    8,
    'Work, work, work, work, work... (fade)'
  );
-- Låt 19: Believer (Imagine Dragons Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    19,
    'intro',
    1,
    '(Driving drums and distorted guitar)'
  ),
  (
    19,
    'verse',
    2,
    'First things first, I’m breaking through the pain, I’ve been down but I rise again.'
  ),
  (
    19,
    'pre-chorus',
    3,
    'Feel the fire, feel the flame, nothing will ever be the same.'
  ),
  (
    19,
    'chorus',
    4,
    'You made me a believer, stronger than I’ve ever been.'
  ),
  (
    19,
    'verse',
    5,
    'Every scar tells a story, every fall builds glory, I keep moving forward.'
  ),
  (
    19,
    'chorus',
    6,
    'You made me a believer, stronger than I’ve ever been.'
  ),
  (
    19,
    'bridge',
    7,
    'And when the night is dark, I’ll light the spark, igniting hearts.'
  ),
  (
    19,
    'outro',
    8,
    'Believer... stronger... believer... (fade)'
  );
-- Låt 20: Graveyard (Halsey Style)
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    20,
    'intro',
    1,
    '(Synth pads and atmospheric beats)'
  ),
  (
    20,
    'verse',
    2,
    'I walk alone through the streets of the city, chasing shadows in the night.'
  ),
  (
    20,
    'pre-chorus',
    3,
    'I don’t wanna be forgotten, I don’t wanna fade.'
  ),
  (
    20,
    'chorus',
    4,
    'Graveyard hearts, beating in the dark, trying to find a spark.'
  ),
  (
    20,
    'verse',
    5,
    'Every whisper in the wind, every memory within, pulls me in.'
  ),
  (
    20,
    'chorus',
    6,
    'Graveyard hearts, beating in the dark, trying to find a spark.'
  ),
  (
    20,
    'bridge',
    7,
    'But I’ll rise from the shadows, find my way to the light.'
  ),
  (
    20,
    'outro',
    8,
    'Graveyard fades, I’m alive, I survive... (fade)'
  );
-- 10 till blir 30 låtar
INSERT INTO artists (name, genre)
VALUES ('Bad Bunny', 'Reggaeton'),
  ('Karol G', 'Reggaeton'),
  ('Daddy Yankee', 'Reggaeton'),
  ('Harry Styles', 'Pop'),
  ('The Kid LAROI', 'Pop/Hip Hop'),
  ('Olivia Rodrigo', 'Pop/Rock'),
  ('Glass Animals', 'Indie Pop'),
  ('Rauw Alejandro', 'Reggaeton'),
  ('Doja Cat', 'Pop/R&B'),
  ('Justin Bieber', 'Pop');
INSERT INTO albums (title, release_year, genre, artist_id)
VALUES ('Un Verano Sin Ti', 2022, 'Reggaeton', 20),
  ('Mañana Será Bonito', 2023, 'Reggaeton', 21),
  ('Legendaddy', 2022, 'Reggaeton', 22),
  ('Harry''s House', 2022, 'Pop', 23),
  ('F*ck Love', 2020, 'Pop', 24),
  ('SOUR', 2021, 'Pop', 25),
  ('Dreamland', 2020, 'Indie', 26),
  ('Vice Versa', 2021, 'Reggaeton', 27),
  ('Planet Her', 2021, 'Pop', 28),
  ('Justice', 2021, 'Pop', 29);
INSERT INTO songs (title, album_id)
VALUES ('Tití Me Preguntó', 20),
  -- 21
  ('Provenza', 21),
  -- 22
  ('Gasolina', 22),
  -- 23
  ('As It Was', 23),
  -- 24
  ('STAY', 24),
  -- 25
  ('Good 4 U', 25),
  -- 26
  ('Heat Waves', 26),
  -- 27
  ('Todo De Ti', 27),
  -- 28
  ('Woman', 28),
  -- 29
  ('Peaches', 29);
-- 30
INSERT INTO songs_artists (song_id, artist_id)
VALUES (21, 20),
  (22, 21),
  (23, 22),
  (24, 23),
  (25, 24),
  (26, 25),
  (27, 26),
  (28, 27),
  (29, 28),
  (30, 29);
-- Låt 21: Tití Me Preguntó - Bad Bunny
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    21,
    'intro',
    1,
    'Tití me preguntó si tengo mucha'' novia'', mucha'' novia''.'
  ),
  (
    21,
    'verse',
    2,
    'Hoy tengo a una, mañana otra, ey, pero no hay boda.'
  ),
  (
    21,
    'pre-chorus',
    3,
    'Me las llevo a todas pa'' el VIP, sin pasaporte vive en el trip.'
  ),
  (
    21,
    'chorus',
    4,
    'Tití me preguntó si tengo mucha'' novia'', hoy tengo a una, mañana a otra.'
  ),
  (
    21,
    'verse',
    5,
    'Dice que me ama, pero no le creo nada, solo quiere rumba hasta la madrugada.'
  ),
  (
    21,
    'chorus',
    6,
    'Tití me preguntó si tengo mucha'' novia'', hoy tengo a una, mañana a otra.'
  ),
  (
    21,
    'bridge',
    7,
    'Déjame vivir mi vida, yo no le hago daño a nadie, solo quiero calle.'
  ),
  (
    21,
    'chorus',
    8,
    'Tití me preguntó si tengo mucha'' novia'', hoy tengo a una, mañana a otra.'
  ),
  (
    21,
    'outro',
    9,
    'Ey, ey, Bad Bunny baby, Bebe-be-be-be.'
  );
-- Låt 22: Provenza - Karol G
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    22,
    'intro',
    1,
    'Baby, ¿qué más? Hace rato que no sé de ti.'
  ),
  (
    22,
    'verse',
    2,
    'Estaba con alguien, pero ya estoy free, puesta para revivir viejos tiempos.'
  ),
  (
    22,
    'pre-chorus',
    3,
    'Si quieres nos vamos para Provenza, donde no haya prensa y nadie nos vea.'
  ),
  (
    22,
    'chorus',
    4,
    'Hace tiempo que no te veo, pero sigo pensando en lo que hacíamos.'
  ),
  (
    22,
    'verse',
    5,
    'Tú y yo solos, sin que nadie moleste, olvidando el resto del mundo.'
  ),
  (
    22,
    'chorus',
    6,
    'Hace tiempo que no te veo, pero sigo pensando en lo que hacíamos.'
  ),
  (
    22,
    'bridge',
    7,
    'No importa el pasado, lo que importa es el ahora, bésame otra vez.'
  ),
  (
    22,
    'chorus',
    8,
    'Hace tempo que no te veo, sigo pensando en lo que hacíamos.'
  ),
  (
    22,
    'outro',
    9,
    'Mañana será bonito, Karol G, La Bichota.'
  );
-- Låt 23: Gasolina - Daddy Yankee
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    23,
    'intro',
    1,
    '¡Zúmbale mambo pa'' que mis gatas prendan los motores!'
  ),
  (
    23,
    'verse',
    2,
    'Ella prende las turbinas, no se quita, matando la liga, siempre activa.'
  ),
  (
    23,
    'pre-chorus',
    3,
    'Súbele el volumen, que la calle está encendida, vamos a fuego.'
  ),
  (
    23,
    'chorus',
    4,
    'A ella le gusta la gasolina (¡Dame más gasolina!).'
  ),
  (
    23,
    'verse',
    5,
    'Dura, rompiendo la pista, nadie le gana, es la reina de la noche.'
  ),
  (
    23,
    'chorus',
    6,
    'A ella le gusta la gasolina (¡Dame más gasolina!).'
  ),
  (
    23,
    'bridge',
    7,
    'Dale, no te detengas, que esto sigue hasta que salga el sol.'
  ),
  (
    23,
    'chorus',
    8,
    'A ella le gusta la gasolina (¡Dame más gasolina!).'
  ),
  (
    23,
    'outro',
    9,
    '¡Duro! ¡Gasolina! Daddy Yankee, el Cangri.'
  );
-- Låt 24: As It Was - Harry Styles
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    24,
    'intro',
    1,
    'Come on, Harry, we wanna say goodnight to you!'
  ),
  (
    24,
    'verse',
    2,
    'Holdin'' me back, gravity''s holdin'' me back, I want you to hold out the palm of your hand.'
  ),
  (
    24,
    'pre-chorus',
    3,
    'Answer the phone, "Harry, you''re no good alone, why are you sitting at home?"'
  ),
  (
    24,
    'chorus',
    4,
    'In this world, it''s just us, you know it''s not the same as it was.'
  ),
  (
    24,
    'verse',
    5,
    'Your daddy lives by himself, he just wants to know that you''re well.'
  ),
  (
    24,
    'chorus',
    6,
    'In this world, it''s just us, you know it''s not the same as it was.'
  ),
  (
    24,
    'bridge',
    7,
    'Go home, get ahead, light-speed internet, I don''t wanna talk about the way that it was.'
  ),
  (
    24,
    'chorus',
    8,
    'In this world, it''s just us, you know it''s not the same as it was.'
  ),
  (
    24,
    'outro',
    9,
    'As it was... as it was... you know it''s not the same.'
  );
-- Låt 25: STAY - The Kid LAROI & Justin Bieber
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    25,
    'intro',
    1,
    'I do the same thing I told you that I never would.'
  ),
  (
    25,
    'verse',
    2,
    'I told you I''d change, even when I knew I never could.'
  ),
  (
    25,
    'pre-chorus',
    3,
    'I know that I can''t find nobody else as good as you.'
  ),
  (
    25,
    'chorus',
    4,
    'I need you to stay, need you to stay, hey!'
  ),
  (
    25,
    'verse',
    5,
    'When I''m away from you, I miss your touch, you''re the reason I believe in love.'
  ),
  (
    25,
    'chorus',
    6,
    'I need you to stay, need you to stay, hey!'
  ),
  (
    25,
    'bridge',
    7,
    'I do the same thing I told you that I never would, I told you I''d change.'
  ),
  (
    25,
    'chorus',
    8,
    'I need you to stay, need you to stay, hey!'
  ),
  (
    25,
    'outro',
    9,
    'I need you to stay... woah-oh, stay with me.'
  );
-- Låt 26: Good 4 U - Olivia Rodrigo
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    26,
    'intro',
    1,
    '(Distorted bass guitar, fast energetic drums)'
  ),
  (
    26,
    'verse',
    2,
    'Well, good for you, I guess you moved on really easily.'
  ),
  (
    26,
    'pre-chorus',
    3,
    'And good for you, it''s like you never even met me.'
  ),
  (
    26,
    'chorus',
    4,
    'Good for you, you look happy and healthy, not me, if you ever cared to ask.'
  ),
  (
    26,
    'verse',
    5,
    'I guess that therapist I found for you, she really helped.'
  ),
  (
    26,
    'chorus',
    6,
    'Good for you, you look happy and healthy, not me, if you ever cared to ask.'
  ),
  (
    26,
    'bridge',
    7,
    'Maybe I''m too emotional, but your apathy is like a wound in salt.'
  ),
  (
    26,
    'chorus',
    8,
    'Good for you, you look happy and healthy, not me, if you ever cared to ask.'
  ),
  (
    26,
    'outro',
    9,
    'Like a damn sociopath! Ah-ah-ah-ah!'
  );
-- Låt 27: Heat Waves - Glass Animals
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    27,
    'intro',
    1,
    'Road shimmer wigglin'' the vision in the heat transmission.'
  ),
  (
    27,
    'verse',
    2,
    'Sometimes, all I think about is you, late nights in the middle of June.'
  ),
  (
    27,
    'pre-chorus',
    3,
    'I just wonder what you''re dreamin'' of, when you sleep and smile so much.'
  ),
  (
    27,
    'chorus',
    4,
    'Heat waves been fakin'' me out, can''t make you happier now.'
  ),
  (
    27,
    'verse',
    5,
    'I usually put on some TV, so I don''t have to think about you and me.'
  ),
  (
    27,
    'chorus',
    6,
    'Heat waves been fakin'' me out, can''t make you happier now.'
  ),
  (
    27,
    'bridge',
    7,
    'You look so broken when you cry, one more and then I say goodbye.'
  ),
  (
    27,
    'chorus',
    8,
    'Heat waves been fakin'' me out, can''t make you happier now.'
  ),
  (
    27,
    'outro',
    9,
    'Sometimes all I think about is you... middle of June.'
  );
-- Låt 28: Todo De Ti - Rauw Alejandro
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    28,
    'intro',
    1,
    '¡Ra-Rauw! Rauw Alejandro, mami.'
  ),
  (
    28,
    'verse',
    2,
    'El azul de tus ojos me tiene en otro mundo, me pierdo en tu mirada.'
  ),
  (
    28,
    'pre-chorus',
    3,
    'Tú me tienes loco, loco por tu amor, mami.'
  ),
  (
    28,
    'chorus',
    4,
    'Me gusta todo de ti, tu cara, tus ojos y tu cuerpo así.'
  ),
  (
    28,
    'verse',
    5,
    'Cuando bailas me llevas al cielo, no quiero que esto acabe nunca.'
  ),
  (
    28,
    'chorus',
    6,
    'Me gusta todo de ti, tu cara, tus ojos y tu cuerpo así.'
  ),
  (
    28,
    'bridge',
    7,
    'Aceleras mi ritmo, mi corazón late fuerte por ti.'
  ),
  (
    28,
    'chorus',
    8,
    'Me gusta todo de ti, tu cara, tus ojos y tu cuerpo así.'
  ),
  (28, 'outro', 9, '¡Zumba! Todo de ti, Rauw.');
-- Låt 29: Woman - Doja Cat
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    29,
    'intro',
    1,
    'Hey, woman, hey, woman, let me be your woman.'
  ),
  (
    29,
    'verse',
    2,
    'I can be your lady, I''m a woman. I''m a mother, I''m a goddess.'
  ),
  (
    29,
    'pre-chorus',
    3,
    'You know I got it, everything you need, I''m the one.'
  ),
  (
    29,
    'chorus',
    4,
    'Woman, let me be your woman, woman, woman, woman.'
  ),
  (
    29,
    'verse',
    5,
    'I can be the one to hold you down, build a kingdom with a crown.'
  ),
  (
    29,
    'chorus',
    6,
    'Woman, let me be your woman, woman, woman, woman.'
  ),
  (
    29,
    'bridge',
    7,
    'I''m the earth, I''m the water, I''m the fire, I''m the daughter.'
  ),
  (
    29,
    'chorus',
    8,
    'Woman, let me be your woman, woman, woman, woman.'
  ),
  (29, 'outro', 9, 'That''s my woman... Doja.');
-- Låt 30: Peaches - Justin Bieber
INSERT INTO lyrics (song_id, part_type, position, text_content)
VALUES (
    30,
    'intro',
    1,
    'I got my peaches out in Georgia, oh, yeah.'
  ),
  (
    30,
    'verse',
    2,
    'I get my weed from California, that''s that shit.'
  ),
  (
    30,
    'pre-chorus',
    3,
    'I took my chick up to the North, yeah, I get my light right from the source.'
  ),
  (
    30,
    'chorus',
    4,
    'And I say, oh, the way I breathe you in, it''s the texture of your skin.'
  ),
  (
    30,
    'verse',
    5,
    'There''s nothing like your touch, you''re the one I need so much.'
  ),
  (
    30,
    'chorus',
    6,
    'And I say, oh, the way I breathe you in, it''s the texture of your skin.'
  ),
  (
    30,
    'bridge',
    7,
    'I''ll lift you up, I''ll be your guy, I''ll be there by your side.'
  ),
  (
    30,
    'chorus',
    8,
    'And I say, oh, the way I breathe you in, it''s the texture of your skin.'
  ),
  (
    30,
    'outro',
    9,
    'I got my peaches out in Georgia... (fade out)'
  );
