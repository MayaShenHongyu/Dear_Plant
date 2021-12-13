# Yours, Plant

# Technical
## Back-end:
Flask: for constructing a backend server to communicate data via HTTP GET request.
Python threading library: for forking a long-running thread that constantly update sensor data on the Flask server.
Text2Speech: the text2speech library we used in lab 3 for plant-user interaction.
Speech2Text: the speech2text library we used in lab 3 for plant-user interaction, from which we employed the KaldiRecognizer.

## Front-end:
React: for basic UI layout.
Axios: for firing HTTP GET request and fetching and decoding JSON format data.
Recharts: for data plotting.

## Full-stack integration design process: 
we initially wanted to employ the mosquito (MQTT) library we used in Lab 6 to communicate between the front-end and the back-end, because we thought for our design and implementation goal, it was the most intuitive approach. Using React as our front-end means that we will have to use MQTT.js library. However, we later discovered that the MQTT.js library has an open GitHub issue that has no working solution to be found on the internet, and this issue directly impact our purpose and usage. Therefore, instead keep trying to use MQTT while finding ways round, we used Flask to construct a server, and we use HTTP GET request to communicate data in a JSON format. We fire a long-running thread on our back-end to continuously update the sensor data on the server, and on our front-end, we fetch the data from the server once per time interval (e.g. every 5 seconds).
