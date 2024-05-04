import { compareDesc, parseISO } from "date-fns";

const findNewestTrailer = (videos) => {
  const officialTrailers = videos?.filter(
    (video) => video.type === "Trailer" && video.official === true
  );

  officialTrailers?.sort((a, b) =>
    compareDesc(parseISO(a.published_at), parseISO(b.published_at))
  );

  return officialTrailers ? officialTrailers[0] : null;
};

export default findNewestTrailer;
