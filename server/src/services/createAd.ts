import { Request, Response } from "express";
import convertHourStringToMinutes from "../utils/convertHourStringToMinutes";
import prisma from "./prisma";

const createAd = async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = req.body;

  const newUser: any = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    },
  });

  return res.status(201).send(newUser);
};

export default createAd;
