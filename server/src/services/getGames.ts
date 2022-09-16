import { Request, Response } from "express";
import prisma from "./prisma";

const getGames = async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.status(200).send(games);
};

export default getGames;
