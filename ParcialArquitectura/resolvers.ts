// resolvers.ts
import { Collection, ObjectId } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { formModelToFlight } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      { origin, destination }: { origin?: string; destination?: string },
      context: { FlightsCollection: Collection<FlightModel> },
    ): Promise<Flight[]> => {
      const filter: Partial<FlightModel> = {};
      if (origin) filter.origin = origin;
      if (destination) filter.destination = destination;
      const flightsModel = await context.FlightsCollection.find(filter).toArray();
      return flightsModel.map((flightModel) => formModelToFlight(flightModel));
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: { FlightsCollection: Collection<FlightModel> },
    ): Promise<Flight | null> => {
      const flightModel = await context.FlightsCollection.findOne({ _id: new ObjectId(id) });
      if (!flightModel) {
        return null;
      }
      return formModelToFlight(flightModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      { origin, destination, dateTime }: { origin: string; destination: string; dateTime: string },
      context: { FlightsCollection: Collection<FlightModel> },
    ): Promise<Flight> => {
      const { insertedId } = await context.FlightsCollection.insertOne({
        origin,
        destination,
        dateTime,
      });
      const flightModel = {
        _id: insertedId,
        origin,
        destination,
        dateTime,
      };
      return formModelToFlight(flightModel);
    },
  },
};