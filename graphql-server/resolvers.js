import fetch from 'node-fetch';
// import { PubSub } from 'graphql-subscriptions';

// const pubsub = new PubSub();

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    widgets: (_1, _2, { restURL }) => fetch(`${restURL}/widgets`).then(res => res.json()),
    cars: (_1, _2, { restURL }) => fetch(`${restURL}/cars`).then(res => res.json()),
  },
  Mutation: {
    appendWidget: (_, { widget }, { restURL }) => 
      fetch(`${restURL}/widgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
      }).then(res => res.json()),
    
    appendCar: (_, { car }, { restURL }) => 
      fetch(`${restURL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }).then(res => res.json()),
  },
  
};
