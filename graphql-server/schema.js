export const typeDefs = `
  type Query {
    message: String
    widgets: [Widget]
    cars: [Car]
  }

  type Mutation {
    appendWidget(widget: WidgetInput): Widget
    appendCar(car: CarInput): Car
    deleteCar(carId: Int): Int
  }

  type Widget {
    id: Int
    name: String
    description: String
    color: String
    size: String
    price: Float
    quantity: Int
  }

  input WidgetInput {
    name: String
    description: String
    color: String
    size: String
    price: Float
    quantity: Int
  }

  type Car {
    id: Int
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }

  input CarInput {
    id: Int
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }
`;