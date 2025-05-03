import { supabase } from "./supabase";
import {
  Song,
  getAllSongs,
  getSongById,
  getSongsByArtistId,
  getSongsByAlbumId,
} from "./api/songs";
import {
  Artist,
  getAllArtists,
  getArtistById,
  getArtistsBySongId,
} from "./api/artists";
import {
  Album,
  getAllAlbums,
  getAlbumById,
  getAlbumsByArtistId,
} from "./api/albums";
import {
  getLikedSongs,
  likeSong,
  unlikeSong,
  isLikedByUser,
} from "./api/likes";
import {
  Playlist,
  getUserPlaylists,
  getPlaylistById,
  createPlaylist,
  getPlaylistSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "./api/playlists";

/**
 * Giao diện đầu ra của hàm test API
 */
interface TestResult {
  success: boolean;
  functionName: string;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Hàm kiểm tra tất cả các API
 * @param userId ID của người dùng hiện tại
 */
export async function testAllApis(userId: string): Promise<TestResult[]> {
  console.log(`Running API tests for user ${userId}`);
  const results: TestResult[] = [];

  // Test kết nối Supabase
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) throw error;

    results.push({
      success: true,
      functionName: "supabaseConnection",
      message: "Supabase connection successful",
      data: data,
    });
  } catch (error) {
    results.push({
      success: false,
      functionName: "supabaseConnection",
      message: "Supabase connection failed",
      error,
    });

    // Nếu không kết nối được, không cần chạy các test khác
    return results;
  }

  // Test các API bài hát
  await testSongApis(results);

  // Test các API nghệ sĩ
  await testArtistApis(results);

  // Test các API album
  await testAlbumApis(results);

  // Test các API liên quan đến user
  if (userId) {
    await testUserSpecificApis(userId, results);
  } else {
    results.push({
      success: false,
      functionName: "userApis",
      message: "Skipped user-specific API tests: No user ID provided",
    });
  }

  return results;
}

/**
 * Kiểm tra các API liên quan đến bài hát
 */
async function testSongApis(results: TestResult[]): Promise<void> {
  try {
    // Test getAllSongs
    const songs = await getAllSongs();
    results.push({
      success: true,
      functionName: "getAllSongs",
      message: `Successfully fetched ${songs.length} songs`,
      data: { count: songs.length },
    });

    // Test getSongById nếu có bài hát
    if (songs.length > 0) {
      const firstSongId = songs[0].id;
      try {
        const song = await getSongById(firstSongId);
        results.push({
          success: true,
          functionName: "getSongById",
          message: `Successfully fetched song with ID ${firstSongId}`,
          data: { song },
        });
      } catch (error) {
        results.push({
          success: false,
          functionName: "getSongById",
          message: `Failed to fetch song with ID ${firstSongId}`,
          error,
        });
      }
    }
  } catch (error) {
    results.push({
      success: false,
      functionName: "getAllSongs",
      message: "Failed to fetch songs",
      error,
    });
  }
}

/**
 * Kiểm tra các API liên quan đến nghệ sĩ
 */
async function testArtistApis(results: TestResult[]): Promise<void> {
  try {
    // Test getAllArtists
    const artists = await getAllArtists();
    results.push({
      success: true,
      functionName: "getAllArtists",
      message: `Successfully fetched ${artists.length} artists`,
      data: { count: artists.length },
    });

    // Test getArtistById nếu có nghệ sĩ
    if (artists.length > 0) {
      const firstArtistId = artists[0].id;
      try {
        const artist = await getArtistById(firstArtistId);
        results.push({
          success: true,
          functionName: "getArtistById",
          message: `Successfully fetched artist with ID ${firstArtistId}`,
          data: { artist },
        });

        // Test getSongsByArtistId
        try {
          const artistSongs = await getSongsByArtistId(firstArtistId);
          results.push({
            success: true,
            functionName: "getSongsByArtistId",
            message: `Successfully fetched ${artistSongs.length} songs for artist ${firstArtistId}`,
            data: { count: artistSongs.length },
          });
        } catch (error) {
          results.push({
            success: false,
            functionName: "getSongsByArtistId",
            message: `Failed to fetch songs for artist ${firstArtistId}`,
            error,
          });
        }
      } catch (error) {
        results.push({
          success: false,
          functionName: "getArtistById",
          message: `Failed to fetch artist with ID ${firstArtistId}`,
          error,
        });
      }
    }
  } catch (error) {
    results.push({
      success: false,
      functionName: "getAllArtists",
      message: "Failed to fetch artists",
      error,
    });
  }
}

/**
 * Kiểm tra các API liên quan đến album
 */
async function testAlbumApis(results: TestResult[]): Promise<void> {
  try {
    // Test getAllAlbums
    const albums = await getAllAlbums();
    results.push({
      success: true,
      functionName: "getAllAlbums",
      message: `Successfully fetched ${albums.length} albums`,
      data: { count: albums.length },
    });

    // Test getAlbumById nếu có album
    if (albums.length > 0) {
      const firstAlbumId = albums[0].id;
      try {
        const album = await getAlbumById(firstAlbumId);
        results.push({
          success: true,
          functionName: "getAlbumById",
          message: `Successfully fetched album with ID ${firstAlbumId}`,
          data: { album },
        });

        // Test getSongsByAlbumId
        try {
          const albumSongs = await getSongsByAlbumId(firstAlbumId);
          results.push({
            success: true,
            functionName: "getSongsByAlbumId",
            message: `Successfully fetched ${albumSongs.length} songs for album ${firstAlbumId}`,
            data: { count: albumSongs.length },
          });
        } catch (error) {
          results.push({
            success: false,
            functionName: "getSongsByAlbumId",
            message: `Failed to fetch songs for album ${firstAlbumId}`,
            error,
          });
        }
      } catch (error) {
        results.push({
          success: false,
          functionName: "getAlbumById",
          message: `Failed to fetch album with ID ${firstAlbumId}`,
          error,
        });
      }
    }
  } catch (error) {
    results.push({
      success: false,
      functionName: "getAllAlbums",
      message: "Failed to fetch albums",
      error,
    });
  }
}

/**
 * Kiểm tra các API liên quan đến người dùng cụ thể
 */
async function testUserSpecificApis(
  userId: string,
  results: TestResult[]
): Promise<void> {
  // Test getLikedSongs
  try {
    const likedSongs = await getLikedSongs(userId);
    results.push({
      success: true,
      functionName: "getLikedSongs",
      message: `Successfully fetched ${likedSongs.length} liked songs for user ${userId}`,
      data: { count: likedSongs.length },
    });
  } catch (error) {
    results.push({
      success: false,
      functionName: "getLikedSongs",
      message: `Failed to fetch liked songs for user ${userId}`,
      error,
    });
  }

  // Test getUserPlaylists
  try {
    const playlists = await getUserPlaylists(userId);
    results.push({
      success: true,
      functionName: "getUserPlaylists",
      message: `Successfully fetched ${playlists.length} playlists for user ${userId}`,
      data: { count: playlists.length },
    });

    // Test playlist functions if user has playlists
    if (playlists.length > 0) {
      const firstPlaylistId = playlists[0].id;

      // Test getPlaylistById
      try {
        const playlist = await getPlaylistById(firstPlaylistId);
        results.push({
          success: true,
          functionName: "getPlaylistById",
          message: `Successfully fetched playlist with ID ${firstPlaylistId}`,
          data: { playlist },
        });
      } catch (error) {
        results.push({
          success: false,
          functionName: "getPlaylistById",
          message: `Failed to fetch playlist with ID ${firstPlaylistId}`,
          error,
        });
      }

      // Test getPlaylistSongs
      try {
        const playlistSongs = await getPlaylistSongs(firstPlaylistId);
        results.push({
          success: true,
          functionName: "getPlaylistSongs",
          message: `Successfully fetched ${playlistSongs.length} songs from playlist ${firstPlaylistId}`,
          data: { count: playlistSongs.length },
        });
      } catch (error) {
        results.push({
          success: false,
          functionName: "getPlaylistSongs",
          message: `Failed to fetch songs from playlist ${firstPlaylistId}`,
          error,
        });
      }
    } else {
      // Test createPlaylist if user has no playlists
      try {
        const testPlaylistTitle = `Test Playlist ${new Date().toISOString()}`;
        const newPlaylist = await createPlaylist(
          userId,
          testPlaylistTitle,
          "Created for API testing"
        );
        results.push({
          success: true,
          functionName: "createPlaylist",
          message: `Successfully created test playlist '${testPlaylistTitle}'`,
          data: { playlist: newPlaylist },
        });

        // Now test adding a song to the playlist
        try {
          const songs = await getAllSongs();
          if (songs.length > 0) {
            const firstSongId = songs[0].id;
            await addSongToPlaylist(newPlaylist.id, firstSongId);
            results.push({
              success: true,
              functionName: "addSongToPlaylist",
              message: `Successfully added song ${firstSongId} to playlist ${newPlaylist.id}`,
            });

            // And then test removing it
            try {
              await removeSongFromPlaylist(newPlaylist.id, firstSongId);
              results.push({
                success: true,
                functionName: "removeSongFromPlaylist",
                message: `Successfully removed song ${firstSongId} from playlist ${newPlaylist.id}`,
              });
            } catch (error) {
              results.push({
                success: false,
                functionName: "removeSongFromPlaylist",
                message: `Failed to remove song from playlist`,
                error,
              });
            }
          }
        } catch (error) {
          results.push({
            success: false,
            functionName: "addSongToPlaylist",
            message: "Failed to add song to playlist",
            error,
          });
        }
      } catch (error) {
        results.push({
          success: false,
          functionName: "createPlaylist",
          message: "Failed to create test playlist",
          error,
        });
      }
    }
  } catch (error) {
    results.push({
      success: false,
      functionName: "getUserPlaylists",
      message: `Failed to fetch playlists for user ${userId}`,
      error,
    });
  }
}

/**
 * Hàm chạy kiểm tra API và hiển thị kết quả trên console
 */
export async function runApiTests(userId?: string): Promise<void> {
  console.log("=== STARTING API TESTS ===");

  if (!userId) {
    const { data } = await supabase.auth.getSession();
    userId = data.session?.user?.id;

    if (!userId) {
      console.error("No user ID provided and no authenticated user found");
      return;
    }
  }

  const startTime = performance.now();
  const results = await testAllApis(userId);
  const endTime = performance.now();

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  console.log("\n=== API TEST RESULTS ===");
  console.log(`Total tests: ${results.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(
    `Time taken: ${((endTime - startTime) / 1000).toFixed(2)} seconds`
  );

  // Log detailed results
  console.log("\n=== DETAILED RESULTS ===");
  results.forEach((result, index) => {
    console.log(
      `\n${index + 1}. ${result.functionName}: ${result.success ? "✅" : "❌"}`
    );
    console.log(`   ${result.message}`);
    if (!result.success && result.error) {
      console.error(
        `   Error: ${result.error.message || JSON.stringify(result.error)}`
      );
    }
  });

  console.log("\n=== API TESTS COMPLETE ===");
}
