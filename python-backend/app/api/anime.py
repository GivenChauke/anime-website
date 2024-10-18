from fastapi import APIRouter, HTTPException
from anipy_api.provider import get_provider
from anipy_api.provider.base import LanguageTypeEnum, ProviderInfoResult, ProviderStream
from typing import List, Dict

router = APIRouter()

def fetch_anime_info(provider, anime_identifier: str) -> ProviderInfoResult:
    """Fetch detailed information about a specific anime."""
    try:
        anime_info = provider.get_info(anime_identifier)
        if not anime_info:
            raise HTTPException(status_code=404, detail="Anime info not found.")
        return anime_info
    except Exception as e:
        print(f"Error fetching details for {anime_identifier}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch anime info.")

def fetch_episodes(provider, anime_identifier: str, lang: LanguageTypeEnum) -> List[Dict[str, str]]:
    """Fetch episodes for a specific anime."""
    try:
        episodes = provider.get_episodes(anime_identifier, lang)
        return [
            {
                "episode": episode,  # Assuming episode is an int, otherwise adjust as needed
                "streams": fetch_video_streams(provider, anime_identifier, episode, lang)
            }
            for episode in episodes
        ]
    except Exception as e:
        print(f"Error fetching episodes for {anime_identifier}: {e}")
        return []  # Return an empty list on error to avoid breaking the response.

def fetch_video_streams(provider, anime_identifier: str, episode: int, lang: LanguageTypeEnum) -> List[Dict[str, str]]:
    """Fetch video streams for a specific episode."""
    try:
        video_streams = provider.get_video(anime_identifier, episode, lang)
        return [
            {
                "url": stream.url,
                "resolution": stream.resolution,
                "language": stream.language,
            }
            for stream in video_streams
        ]
    except Exception as e:
        print(f"Error fetching video streams for {anime_identifier}, episode {episode}: {e}")
        return []  # Return an empty list if fetching streams fails.

@router.get("/anime/search/{query}")
async def search_anime(query: str):
    """Search for anime by query and return detailed results, limited to two entries."""
    provider = get_provider("gogoanime")

    search_results = provider.get_search(query)
    if not search_results:
        raise HTTPException(status_code=404, detail="No anime found.")

    detailed_results = []
    
    for anime in search_results[:2]:  # Limit to the first two anime
        try:
            # Fetch additional info
            anime_info = fetch_anime_info(provider, anime.identifier)
            print(anime_info)
            
            # Use the first available language or default to SUB
            lang = 'sub'

            # Fetch episodes
            episodes = fetch_episodes(provider, anime.identifier, lang)

            # Build detailed result
            detailed_results.append({
                "name": anime_info.name,
                "identifier": anime.identifier,
                "description": anime_info.synopsis or "No description available.",
                "languages": 'sub',
                "episodes": episodes,
            })

        except Exception as e:
            print(f"Error during processing anime {anime.identifier}: {e}")
            # Log or handle the error as appropriate

    return detailed_results
