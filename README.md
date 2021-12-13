# Yours, Plant

## Sensor: 

The healthiness of the plant heavily depend on temperature and soil humidity, thus we employed sensors for those 2 attributes. For our prototype, the PI is positioned right next to the plant, so we did not need additional wiring to achieve the placement of the sensor.

Temperature - Adafruit MPU-6050 6 DoF Accel & Gyro Sensor
The temperature sensor is positioned on the side of the plant to get the environmental temperature around the plant.

Soil humidity - Adafruit STEMMA Soil Sensor, I2C Capacitive Moisture Sensor
The moisture sensor stick straight into the soil of the plant.

TODO: <picture goes here>

## Technical Design process: 
We first decided to use React as our front-end. This is because we wanted to constantly update the sensor data on our front-end as a dynamic plot, and we believed that React will be the most suitable front-end library to employ.

For constructing our back-end server and full-stack communication, we initially wanted to employ the mosquito (MQTT) library we used in Lab 6 to communicate between the front-end and the back-end, because we thought for our design and implementation goal, it was the most intuitive approach. Using React as our front-end means that we will have to use MQTT.js library. However, we later discovered that the MQTT.js library has an open GitHub issue that has no working solution to be found on the internet, and this issue directly impact our purpose and usage. Therefore, instead keep trying to use MQTT while finding ways round, we pivoted to use Flask to construct a server, and we use HTTP GET request to communicate data in a JSON format. We fire a long-running thread on our back-end to continuously update the sensor data on the server, and on our front-end, we fetch the data from the server once per time interval (e.g. every 5 seconds).

## Back-end:
* Flask: in order to communicate the sensor data with front-end plot, we used Flask for constructing a backend server to communicate data via HTTP GET request. We also interpreted our sensor data into text message and send it to the server, for a more personified interaction.
```python
from flask import Flask, jsonify, Response

app.run(host="<Our server IP address>", port=4000)

@app.route('/sensor')
def sensor():
    response = jsonify({
        "temperature": get_temperature(),
        "humidity": get_humidity(),
        "message": get_message(),
    })
    response.headers.add('Access-Control-Allow-Origin', '*') 
    return response
```
* Python threading library: in order for front-end to receive the latest updated sensor data, we need to fork a background thread that constantly update data on the HTTP GET request. Therefore, we used the threadign library for forking a long-running thread that constantly update sensor data on the Flask server.
```python
threading.Thread(target=flaskThread).start()
```
* Text2Speech: the text2speech library we used in lab 3 for plant-user interaction. It is responsible for all voice response and feedback that user will get from the plant.
```python
def speak(instruction):
    command = """
        say() { 
            local IFS=+;/usr/bin/mplayer -ao alsa -really-quiet -noconsolecontrols "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$*&tl=en"; 
        } ; 
    """ + f"say '{instruction}'"
    subprocess.call(command, shell=True)
```
* Speech2Text: the speech2text library we used in lab 3 for plant-user interaction, from which we employed the KaldiRecognizer. It is responsible for understanding the user voice message, thus the user intention during the interaction.
```python
def recognize(pattern):
    wf = wave.open(USER_INPUT_FILE, "rb")
    rec = KaldiRecognizer(model, wf.getframerate(), pattern)

    while True:
        data = wf.readframes(4000)
        if rec.AcceptWaveform(data):
            res = json.loads(rec.Result())
            return res['text']
    print("Failed to recognize")
    return ""
```

## Front-end:
* React: for basic UI layout, including sensor data history plot and voice interaction message record.
* Axios: for firing HTTP GET request and fetching and decoding JSON format data.
```javascript
axios.get(`http://<Our server IP address>/sensor`).then((res) => {
    // process the JSON data here
})
```
* Recharts: for data plotting.
