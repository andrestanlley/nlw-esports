import { Request, Response } from "express";
import convertMinutesToHourString from "../utils/convertMinutesToHourString";
import prisma from "./prisma";

const getAds = async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).send(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hoursStart: convertMinutesToHourString(ad.hoursStart),
        hoursEnd: convertMinutesToHourString(ad.hoursEnd),
      };
    })
  );
};

export default getAds;
