// types.ts
import { OptionalId } from "mongodb";

export type FlightModel = OptionalId<{
  origin: string;
  destination: string;
  dateTime: string;
}>;

export type Flight = {
  id: string;
  origin: string;
  destination: string;
  dateTime: string;
};

