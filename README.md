# Yours, Plant

## Project Plan

**Project Overview:**

**Parts Needed:**

**Timeline:**

**Risk and Contingencies:**

**Fall-back Plan:**


## Design Process

**Ideation:**

Idea generation:

What if we combine the idea of voice assistants and companion animals? From there, we generated our idea of developing a smart planter - Yours, Plant. 

We considered two groups of people to solve their pain points. First, many people would love to have pets, but might not have the time or energy to do so.. There are also other possibilities such as allergy, living in shared spaces, and budget restraints. Many people have plants at home as well. However, not many of the plant owners can remember the exact schedule of watering, fertilizing, or sunbathing the plant. Therefore, we wanted to create an opportunity for both plant and pet lovers to feel and experience the human interaction with the plants through a smart planter that they can talk to and receive letters from. We aim to design a smart planter that can send all sorts of reminders, talk to the owner, and create a sense of companionship and emotional support.   

Storyboard:

Voice interaction & set up
![storyboard1](https://user-images.githubusercontent.com/90153252/145897154-f5f72303-8234-493f-861a-950a7e4ebcf4.jpeg)

Web portal
![storyboard2](https://user-images.githubusercontent.com/90153252/145897160-a3c5b38f-faa5-4604-9c44-4298e55bcd53.jpeg)

Core functionalities:

* Voice interaction

At the initial set up stage, the planter will wake up and will ask the user to identify itself. The user can tell the plant its breed/type/name simply by talking to it. This would set up the plant attributes (watering schedule/ideal moisture and temperature/bloom status/sunlight needed) as it will retrieve the related data from our plant database. Once the plant attributes are set up, the planter will ask the user to find an optimal place to grow by checking the moisture and temperature.

Voice interactions can be triggered easily by calling its name. For example, the user can say “Hey Ivy” to trigger a conversation. The smart planter can talk to the owner in multiple contexts: asking for watering/sunlight/fertilizing, telling jokes, playing music, etc. For example, users can ask: “Hey Ivy! Play me some music.”

The smart planter can also take photos for the owner. Users can simply call the name of the planter and trigger the interaction like normal voice assistants. For example: users can ask “Hey Ivy, can you take a photo of me?” It will then trigger the camera on the planter to take a photo and upload it on the web portal. 

* Web portal

We created a connected web portal for the smart planter to showcase real-time data and messages sent by the plant. Users can access the web portal anytime to check on the status of the plant.

Temperature and humidity detection: The first part of the web portal is the real-time data from the temperature and moisture sensors, and there is a graph plotting data points for each of the sensors. If the temperature/humidity is out of the optimum range, the plant will send a message in the chat. For example, it will say “It’s too hot, please move me to somewhere cooler” when the temperature is too high.

Chat with the plant: The plant will send messages/pictures in three scenarios. 1. When the owner is not at home, it will say something like “I haven’t seen you in a long time, I miss you” or send jokes. 2. When the owner asks the plant to take pictures, and when it takes pictures that the owner likes. For example, if the owner tells the plant that he/she loves sunset, it will take a picture of sunset everyday, say “The sunset was pretty today. I took a photo for you :)” and send the photo to the chat. 3. When the temperature/humidity is too high or too low, the plant will send reminders.


**Design and Prototyping Process:**


We used an actual Devil’s Ivy plant from one of our members for the prototyping. To fit the Raspberry Pi in the planter, we removed the plant from the current pot and repotted one new branch of the plant to a new pot. We divided the pot into two parts by separating them with waterproof plastics and tapes. In the following documentation, we will refer to the two parts as the Pi space and the plant space. The Pi space is designated to be dry so that the wires and Pi (put inside the Pi space) can function. We purchased a bag of fresh potting mix and fertilizers for the plant in the plant space to keep it growing. In terms of decoration, we wanted to show the personality of the plant by giving it a cute look. Therefore, we used a beanie hat as the clothing of the plant. We also put a paper butterfly on the planter to add on to the livelihood. 

![repot](https://user-images.githubusercontent.com/90153252/145897805-90eed56d-c907-4dc2-b1af-73340392ee65.jpg)

![waterproof](https://user-images.githubusercontent.com/90153252/145897815-94d3598e-16cb-4943-ac05-e0da8d5ebc15.jpg)

![two spaces](https://user-images.githubusercontent.com/90153252/145891491-8def678b-4be9-4485-bd16-ee1a906a66e3.jpg)

![final prototype](https://user-images.githubusercontent.com/90153252/145897792-71a3cd48-6c38-4267-a04f-c5c0f48c0df9.jpg)

**Demo:**


https://user-images.githubusercontent.com/90153252/145882128-406786e2-4dda-401e-acfc-517f864e6b66.mp4


https://user-images.githubusercontent.com/90153252/145882143-38cba4ac-e00d-4cee-b024-c588f4ae8b23.mp4


https://user-images.githubusercontent.com/90153252/145882156-03c84ccc-4a37-402b-bd2f-522178ef0fb1.mp4

## Technical Documentation

**Sensors:**

The healthiness of the plant heavily depend on temperature and soil humidity, thus we employed sensors for those 2 attributes. For our prototype, the PI is positioned right next to the plant, so we did not need additional wiring to achieve the placement of the sensor.

Temperature - Adafruit MPU-6050 6 DoF Accel & Gyro Sensor

The temperature sensor is positioned on the side of the plant to get the environmental temperature around the plant.

```python
mpu = adafruit_mpu6050.MPU6050(i2c)
temperature = mpu.temperature
```

Soil humidity - KeeYees High Sensitivity Soil Moisture Sensor

The moisture sensor stick straight into the soil of the plant.

![sensor](https://user-images.githubusercontent.com/90153252/145891461-27af1744-28df-41cb-b11c-3cd9c48b6cb4.jpg)


**Technical Design Process:**

We decided to use React as our front-end. This is because we wanted to constantly update the sensor data on our front-end as a dynamic plot, and we believed that React will be the most suitable front-end library to employ as the state programming provides a easy way to implement dynamic UI.

For constructing our back-end server and full-stack communication, we initially wanted to employ the mosquito (MQTT) library we used in Lab 6 to communicate between the front-end and the back-end, because we thought for our design and implementation goal, it was the most intuitive approach. Using React as our front-end means that we will have to use MQTT.js library. However, we later discovered that the MQTT.js library has an open GitHub issue that has no working solution to be found on the internet, and this issue directly impact our purpose and usage. Therefore, instead keep trying to use MQTT while finding ways round, we pivoted to use Flask to construct a server, and we use HTTP GET request to communicate data in a JSON format. We fire a long-running thread on our back-end to continuously update the sensor data on the server, and on our front-end, we fetch the data from the server once per time interval (e.g. every 5 seconds).

**Back-end:**

* Sensor data: we read our temperature and soil moisture sensor data directly using the python Raspberry Pi library.
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

**Front-end:**

* React: for basic UI layout, including sensor data history plot and voice interaction message record.
* Axios: for firing HTTP GET request and fetching and decoding JSON format data.
```javascript
axios.get(`http://<Our server IP address>/sensor`).then((res) => {
    // process the JSON data here
})
```
* Recharts: for data plotting.

## User Testing and Feedback

## Group Work Distribution
