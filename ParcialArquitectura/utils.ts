// utils.ts
import { Flight, FlightModel } from "./types.ts";

export const formModelToFlight = (flightModel: FlightModel): Flight => {
  return {
    id: flightModel._id!.toString(),
    origin: flightModel.origin,
    destination: flightModel.destination,
    dateTime: flightModel.dateTime,
  };
};