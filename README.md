# Yours, Plant

## Project Plan

**Project Overview:**

Our main idea is to develop a smart planter that acts as a companion animal for people who don’t have time or opportunity for raising real pets. The planter can communicate with the owner through fun and engaging interactions and create a sense of emotional support to the user. Therefore, we named the device: “Yours, Plant” to resemble the signature of a love letter to the owner. 

**Parts Needed:**

* Sensing soil moisture: Adafruit STEMMA Soil Sensor - I2C Capacitive Moisture Sensor or KeeYees High Sensitivity Soil Moisture Sensor
* Sensing temperature: Adafruit MPU-6050 6 DoF Accel & Gyro Sensor
* Sensing light: Adafruit APDS9960 Proximity, Light, RBG, Gesture Sensor
* Voice interaction: Mini USB Microphone, speaker
* Capturing image: Webcam

**Timeline:**

11/29 - Purchase and test out all the necessary parts

12/1 - Code for sensor such as soil moisture, temperature, and light detection; basic voice interaction

12/2 - Functional checkoff

12/6 - Finish physical prototype of the device; train image capturing; finish voice interaction

12/7 - Final project presentation

12/12 - Finish write-up and documentation

12/13 - Write-up and documentation due

**Risk and Contingencies:**

* Voice recognition
Our past experience with the voice recognition system showed that it is hard for the system to recognize certain words, for example, names of plants.

The volume of the speaker is a little bit low and we don’t understand how to adjust the volume.

When we tried to interact with the system in past labs, we naturally used more formal languages and shorter sentences. It might be due to the fact that we don't expect the machine to be very smart. Therefore, we need to make the device we're talking to more "humanlike”.

* Length of cable
Due to the fact that our pi is connected with a short cable, we may not be able to move the device around the room a lot.

**Fall-back Plan:**

We believe that our biggest risk is the failure to implement a robust voice interaction system, especially the speech-to-text. Therefore, if we are not able to have our user talk with the device, we will change the interaction methods to using a hardware sensor (e.g. joystick + screen) or software system (e.g. clicking button on website/phone app). 

## Design Process

**Ideation:**

_Idea generation:_

What if we combine the idea of voice assistants and companion animals? From there, we generated our idea of developing a smart planter - Yours, Plant. 

We considered two groups of people to solve their pain points. First, many people would love to have pets, but might not have the time or energy to do so.. There are also other possibilities such as allergy, living in shared spaces, and budget restraints. Many people have plants at home as well. However, not many of the plant owners can remember the exact schedule of watering, fertilizing, or sunbathing the plant. Therefore, we wanted to create an opportunity for both plant and pet lovers to feel and experience the human interaction with the plants through a smart planter that they can talk to and receive letters from. We aim to design a smart planter that can send all sorts of reminders, talk to the owner, and create a sense of companionship and emotional support.   

_Storyboard:_

Voice interaction & set up
![storyboard1](https://user-images.githubusercontent.com/90153252/145897154-f5f72303-8234-493f-861a-950a7e4ebcf4.jpeg)

Web portal
![storyboard2](https://user-images.githubusercontent.com/90153252/145897160-a3c5b38f-faa5-4604-9c44-4298e55bcd53.jpeg)

_Core functionalities:_

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

![prototype process](https://user-images.githubusercontent.com/90153252/145915129-5e1a9b1a-3d3e-4971-b56b-048923cbbe26.jpg)

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
Some of the comments we received from the project plan: 
<img width="619" alt="feedback 1" src="https://user-images.githubusercontent.com/90153252/145914347-40c5de1b-b200-4153-9bc6-1a262e68de49.png">
<img width="623" alt="feedback 2" src="https://user-images.githubusercontent.com/90153252/145914236-ed3fdb3b-3bf0-4014-bbc3-6c4f814fcf6b.png">
<img width="624" alt="feedback 3" src="https://user-images.githubusercontent.com/90153252/145914239-23b5d9e3-bebf-423f-b545-f4f72b520eb7.png">
<img width="621" alt="feedback 4" src="https://user-images.githubusercontent.com/90153252/145914243-bb55a911-6d02-4851-ae5d-88ea60b318e6.png">

We tested our devices with several users. Most of them liked the idea and prototype, especially because they all said that they often forget to water their plants on time. Some of the advice and suggestions we received from user testings are as follows:

1. Make it feel more “plant-like”. Think of what a plant would say.
2. Consider the possibility of connecting two planters and have them talk to each other. 
3. The voice recognition systems are not sensitive enough to trigger every possible conversation, especially when the background noise is loud. 
4. Consider having an LED screen that shows their emotions, such as smiley faces. 

## Future Directions

From all of the advice and suggestions we received, we found out some possible future directions we can aim to achieve. 
1. We hope we can add bluetooth functions to the plant so that users can move it around easier and don’t have to worry about the length of the cable.
2. We hope to train the device to recognize objects, human-beings, or scenes such as sunrises and sunsets. When the user asks to take photos of certain live beings or objects, it automatically captures pictures when it sees the targets. This might be achieved through machine learning or using the teachable machine. 
3. Add an LED screen that shows a “face” of the plant and real-time emotions, such as smiley faces. 

## Group Work Distribution

Maya Hongyu Shen and Larry Qianzhi Xu were in charge of most of the technical development and documentation, including programming the web portal and the raspberry pi backend, voice interaction, and other core functionalities. 

Zhenghe Wang and Ruby Pan worked on ideation, prototyping, feature development, overseeing the project timeline, user testing, and the final report.  

## Reflection

What have you learned or wish you knew at the start of your project 
1. Throughout the user-testing process, we found that the speaker volume was a little bit low and the microphone was not sensitive enough to listen to voice commands. However, we were only able to find out this problem at the user-testing stage. It would significantly improve the final device if we added or used external devices that are more sensitive/controllable. 
2. Fall-back plans should include purchasing extra sensors! Initially, we only purchased one moisture sensor that did not come with the corresponding chord. After a few tries, we accidentally caused an electrical short-circuit of the sensor. We had to purchase it again at the very end. We purchased five moisture sensors at the end to make sure similar incidents don’t happen again.
3. We investigated and learned different back-end methods. Initially, we used MQTT because none of us knew how to use Flask. However, we experienced some MQTT technical difficulties. We started using Flask instead and found out that it is actually a really useful back-end server. 
4. We learned that project management and group work distribution were important. Initially, we all worked individually on different parts of the project with the hope that it would be more efficient. Yet we found that working individually actually made it harder to put everything together. We then changed our work assignment and completed everything in pairs of two. We would meet up every other day and have brief meetings. In this way, we were able to complete the project in a very efficient and collaborative manner. We all had fun working together!
5. Developing a device requires a great amount of user testing and iterations. We had a lot of confidence and imagination of our device at the beginning. We were able to narrow it down and refine the idea and functionalities through rounds of testing and updates. This process also took longer than expected. 
6. So many possibilities! We did not realize there are so many creative possibilities we can do for the project until at the final project exhibition. It was an eye-opening experience for us to see all of the amazing projects done by our classmates. We also spent a lot of time talking with the other groups to see how they developed their devices. 


