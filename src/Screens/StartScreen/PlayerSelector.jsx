import Dropdown from 'react-bootstrap/Dropdown';

export const PlayerSelector = ({setNumOfPlayers}) => {

    const numOfPlayers = (number) => {
        setNumOfPlayers(number);
      };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Number of Players
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => numOfPlayers(2)}>2 Players</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => numOfPlayers(3)}>3 Players</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => numOfPlayers(4)}>4 Players</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    
  );
}


