// utils/trackMapper.js
export function mapTrack(raw, sourceType) {
  if (sourceType === "media") {
    return {
      id: raw.id,
      uri: raw.uri,
      title: raw.filename || raw.title || "Unknown Title",
      artist: raw.artist || "Unknown Artist",
      artwork: raw.artwork || raw.thumb || null,
    };
  }
  if (sourceType === "api") {
    return {
      id: raw.id || raw.source || raw.uri,
      uri: raw.uri || raw.source,
      title: raw.title || "Unknown Title",
      artist: raw.artist || "Unknown Artist",
      artwork: raw.thumbsource || raw.artwork || null,
    };
  }
  if (sourceType === "json") {
    return {
      id: raw.id || raw.src,
      uri: raw.uri || raw.src,
      title: raw.title || raw.filename || "Unknown Title",
      artist: raw.artist || "Unknown Artist",
      artwork: raw.thumb || raw.artwork || null,
    };
  }
  return {
    id: raw.id || Math.random().toString(36).substr(2, 9),
    uri: raw.uri,
    title: raw.title || "Unknown Title",
    artist: raw.artist || "Unknown Artist",
    artwork: raw.artwork || null,
  };
}
