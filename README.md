# Yours, Plant

## Design process: 
We initially wanted to employ the mosquito (MQTT) library we used in Lab 6 to communicate between the front-end and the back-end, because we thought for our design and implementation goal, it was the most intuitive approach. Using React as our front-end means that we will have to use MQTT.js library. However, we later discovered that the MQTT.js library has an open GitHub issue that has no working solution to be found on the internet, and this issue directly impact our purpose and usage. Therefore, instead keep trying to use MQTT while finding ways round, we pivoted to use Flask to construct a server, and we use HTTP GET request to communicate data in a JSON format. We fire a long-running thread on our back-end to continuously update the sensor data on the server, and on our front-end, we fetch the data from the server once per time interval (e.g. every 5 seconds).

## Back-end:
* Flask: in order to communicate the sensor data with front-end plot, we used Flask for constructing a backend server to communicate data via HTTP GET request.
```python
from flask import Flask, jsonify, Response

app.run(host="10.56.132.250", port=4000)

@app.route('/sensor')
def sensor():
    # temp = get_temperature()
    response = jsonify({"temperature": get_temperature()})
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
* React: for basic UI layout.
* Axios: for firing HTTP GET request and fetching and decoding JSON format data.
```
axios.get(`http://10.56.132.250:4000/sensor`).then((res) => {
    // process the JSON data here
    })
```
* Recharts: for data plotting.
