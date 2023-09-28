import ListGroup from "react-bootstrap/ListGroup";

export const TradeProperties = ({
  Player,
  onPropertySelect,
  propertiesForTrade,
}) => {
  return (
    <ListGroup>
      {Player.properties
        .filter((Property) => !propertiesForTrade.includes(Property)) // Filter out properties that are in propertiesForTrade1
        .map((Property, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onPropertySelect(Property)}
          >
            {Property.name}
          </ListGroup.Item>
        ))}
      {Player.railroads
        .filter((Property) => !propertiesForTrade.includes(Property)) // Filter out railroads that are in propertiesForTrade1
        .map((Property, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onPropertySelect(Property)}
          >
            {Property.name}
          </ListGroup.Item>
        ))}
      {Player.utilities
        .filter((Property) => !propertiesForTrade.includes(Property)) // Filter out utilities that are in propertiesForTrade1
        .map((Property, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onPropertySelect(Property)}
          >
            {Property.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
