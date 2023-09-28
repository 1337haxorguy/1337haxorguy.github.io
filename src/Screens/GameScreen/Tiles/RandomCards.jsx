export const chanceCards = [
    {
      description: "Collect $100 from the bank",
      action: (Player) => {
        Player.cash = Player.cash + 100
      },
    },
    {
      description: "Pay $50 to a random player",
      action: (Player, playerPositions) => {
        Player.cash -= 50;

        let randomIndex = Math.floor(Math.random() * playerPositions.length);
    
        while (playerPositions[randomIndex].Player === Player) {
          randomIndex = Math.floor(Math.random() * playerPositions.length);
        }
    
        const selectedPlayer = playerPositions[randomIndex].Player;
        selectedPlayer.cash += 50;
          },
    },

  {
    description: "Pay $25 for a speeding ticket",
    action: (Player) => {
      Player.cash -= 25;
    },
  },
  {
    description: "Receive $50 as a birthday gift",
    action: (Player) => {
      Player.cash += 50;
    },
  },
  {
    description: "Pay $75 for house repairs",
    action: (Player) => {
      Player.cash -= 75;
    },
  },
  {
    description: "Collect $10 for winning a beauty contest",
    action: (Player) => {
      Player.cash += 10;
    },
  },
  {
    description: "Pay $150 in income tax",
    action: (Player) => {
      Player.cash -= 150;
    },
  },
 
  {
    description: "Collect $20 from each player",
    action: (Player, playerPositions) => {
      playerPositions.forEach((positionData) => {
        const otherPlayer = positionData.Player;
        if (otherPlayer !== Player) {
          otherPlayer.cash -= 20;
          Player.cash += 20;
        }
      });
    },
  },

    // Add more chance cards as needed
  ];
  