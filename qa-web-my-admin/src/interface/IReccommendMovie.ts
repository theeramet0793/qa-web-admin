export interface IReccommendMovie{
  postId:number;
  movielist:IMovie[]
}

export interface IMovie{
  tmdbId:number;
  name:string;
  freq:number;
}