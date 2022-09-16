import { Request, Response } from "express";
import prisma from "./prisma";

const getDiscord = async (req: Request, res: Response) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.status(200).json({
    discord: ad.discord,
  });
};

export default getDiscord;
