#!/bin/bash

echo "What type of data would you lke to simulate?"
echo "1) GPS Coordinate"
echo "2) Train entered station"
echo "3) Train left station"
echo "4) Seat changed"
echo "5) Door changed"

read -p "Enter your choice: " CHOICE

FILENAME="../linux/events/$(date +%s%N)"
echo "Creating file: ${FILENAME}"  

if [ "$CHOICE" == "1" ]; then

  echo "Updating GPS of Controller"
  echo "{\"eventType\": \"location\", \"data\": { \"location\": { \"latitude\": 12.345, \"longitude\": 67.890 } } }" >> ${FILENAME}

elif [ "$CHOICE" == "2" ]; then

  read -p "Which station did it enter? [1,2,3] => " IDENTIFIER

  echo "Train is entering station${IDENTIFIER}"
  echo "{\"eventType\": \"station\", \"data\": { \"stationIdentifier\": \"station${IDENTIFIER}\", \"action\": \"enter\" } }" >> ${FILENAME}

elif [ "$CHOICE" == "3" ]; then

  read -p "Which station did it leave? [1,2,3] => " IDENTIFIER

  echo "Train is leaving station${IDENTIFIER}"
  echo "{\"eventType\": \"station\", \"data\": { \"stationIdentifier\": \"station${IDENTIFIER}\", \"action\": \"exit\" } }" >> ${FILENAME}


elif [ "$CHOICE" == "4" ]; then

  read -p "Which seat changed? [1,2,3] => " IDENTIFIER
  read -p "Is the seat occupied[1] or vacant[0]? => " OCCUPIED

  echo "Seat ${IDENTIFIER} occupied: ${OCCUPIED}"
  echo "{\"eventType\": \"sensor\", \"data\": { \"type\": \"seat\", \"identifier\": \"seat${IDENTIFIER}\", \"status\": ${OCCUPIED} } }" >> ${FILENAME}


elif [ "$CHOICE" == "5" ]; then

  read -p "Which door changed? [1,2,3] => " IDENTIFIER
  read -p "Is the door open[1] or closed[0]? => " OPEN

  echo "Door ${IDENTIFIER} open: ${OPEN}"
  echo "{\"eventType\": \"sensor\", \"data\": { \"type\": \"door\", \"identifier\": \"door${IDENTIFIER}\", \"status\": ${OPEN} } }" >> ${FILENAME}

fi