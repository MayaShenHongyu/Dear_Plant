import React, { Component } from "react";
import "./Portal.css";
import axios from "axios";
import profile from "./profile.jpg";
import tram from "./tram.jpeg";
import selfie from "./selfie.jpeg"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
} from "recharts";

const portal = "100.64.3.110"

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.numData = 8
    this.intervalInSecond = 5
    // this.plotWidth = 700;
    this.plotWidth = window.innerWidth * 0.4
    this.plotHeight = window.innerHeight * 0.65 * 0.5
    this.limits = {
      temperature: { max: 28, min: 15 },
      humidity: { max: 5, min: 2 }
    }
    this.state = {
      humidity_data: [],
      temperature_data: [],
      chats: [
        { type: "text", time: new Date(2021, 11, 10, 15, 10), message: "What did one hat say to the other?" },
        { type: "text", message: "You stay here. I'll go ahead." },
        { type: "text", time: new Date(2021, 11, 10, 16, 0), message: "hey, i haven't seen you in 2 hours and 15 mins, where have you been? i'm bored, how about we talk about life and existence?" },
        { type: "text", message: "help! i need some water" },
        { type: "text", message: "the sunset was pretty today. you were not there so i took a photo for you :)" },
        { type: "photo", message: tram },
        { type: "photo", message: selfie, time: new Date(2021, 11, 10, 22, 58) }
      ],
    }
                //     {/* <Time time={new Date(2021, 11, 10, 15, 10)} />
                // <TextMessage text="What did one hat say to the other?" />
                // <TextMessage text="You stay here. I'll go ahead." />
                // <Time time={new Date(2021, 11, 10, 16, 0)} />
                // <TextMessage text="hey, i haven't seen you in 2 hours and 15 mins, where have you been? i'm bored, how about we talk about life and existence?" />
                // <TextMessage text="help! i need some water" />
                // <TextMessage text="the sunset was pretty today. you were not there so i took a photo for you :)" />
                // <PhotoMessage picture={tram} /> */}
  }

  componentDidMount() {
    this.fetchHumidityData();
    this.fetchTemperatureData();
  }

  fetchHumidityData() {
    const { max, min } = this.limits.humidity
    setInterval(() => {
      axios.get(`http://${portal}:4000/moisture`).then(res => {
        const isMoisturous = res.data.moisture
        console.log(isMoisturous)
        // const currentData = isMoisturous ? 4 + Math.random() * 0.5 : 1 + Math.random() * 0.5 
        const currentData = 4 + Math.random() * 0.2
        const today = new Date();
        const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        
        this.setState((prevState) => {
          const { chats: raw_chats, humidity_data: raw_data } = prevState
          const humidity_data = raw_data.slice()
          const chats = raw_chats.slice()
          humidity_data.push({ time: currentTime, val: currentData });
          if (humidity_data.length > this.numData) {
            humidity_data.splice(0, 1);
          }
          const prevData = humidity_data[humidity_data.length - 2]
          if (currentData < min && (!prevData || prevData.val > min)) {
            chats.push({
              time: today,
              type: "text",
              message: "i'm thirsty. i need water :("
            })
          }
          return {
            ...prevState,
            humidity_data,
            chats
          }
        })

      })

      // const currentData = 22.5 + Math.random() * 1;
      // const today = new Date();
      // const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

      
      // this.setState((prevState) => {
      //   const { chats: raw_chats, humidity_data: raw_data } = prevState
      //   const humidity_data = raw_data.slice()
      //   const chats = raw_chats.slice()
      //   humidity_data.push({ time: currentTime, val: currentData });
      //   if (humidity_data.length > this.numData) {
      //     humidity_data.splice(0, 1);
      //   }
      //   const prevData = humidity_data[humidity_data.length - 2]
      //   if (currentData < min && (!prevData || prevData > min)) {
      //     chats.push({
      //       time: today,
      //       type: "text",
      //       message: "i'm thirsty. i need water :("
      //     })
      //   }
      //   return {
      //     ...prevState,
      //     humidity_data,
      //     chats
      //   }
      // })
    }, 1000 * this.intervalInSecond)
  }

  fetchTemperatureData() {
    const { max, min } = this.limits.temperature
    setInterval(() => {
      axios.get(`http://${portal}:4000/temperature`).then((res) => {
        const currentData = res.data.temperature;
        const today = new Date();
        const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        this.setState((prevState) => {
          const { chats: raw_chats, temperature_data: raw_data } = prevState
          const temperature_data = raw_data.slice();
          const chats = raw_chats.slice();
          temperature_data.push({ time: currentTime, val: currentData });
          if (temperature_data.length > this.numData) {
            temperature_data.splice(0, 1)
          }

          const prevData = temperature_data[temperature_data.length - 2]
          if (currentData < min && (!prevData || prevData.val > min)) {
            chats.push({ 
              time: today, 
              type: "text", 
              message: "i'm really cold, please move me to somewhere warmer"
            })

          }

          console.log(currentData, prevData, prevData < max)
  
          if (currentData > max && (!prevData || prevData.val < max)) {
            console.log("Yes")
            chats.push({ 
              time: today, 
              type: "text", 
              message: "it's too hot, please move me to somewhere cooler",
            })
          }
          return {
            ...prevState,
            temperature_data,
            chats
          }
        })

      })
    }, 1000 * this.intervalInSecond)
  }

  render() {
    const { humidity_data, temperature_data, chats } = this.state;
    const plotWidth = this.plotWidth;
    const plotHeight = this.plotHeight;
    console.log(this.state)
    return (
      <div className="layout">
        <div className="header">
          <div className="header-inner">
            <img
                id="header-avatar"
                alt="default"
                src={profile}
              />
            <div className="header-title">
              <h1 id="ivy">Ivy</h1>
              {/* <div>Hi I'm Ivy! (They/Them) My full name is Devil's Ivy, but my roomate said that the name's too creepy.</div> */}
              <div>I love drinking loads of water, talking to my roomate, and watching sunsets.</div>
            </div>
          </div>
          
        </div>
        <div className="content">
          <div id="plot-container">
            <div>
              <h4> Moisture Level </h4>
              <LineChart
                width={plotWidth}
                height={plotHeight}
                data={humidity_data}
              >
                <XAxis dataKey="time" tickCount={5} />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  formatter={(value, _name, _props) => [
                    value.toFixed(2),
                    "Humidity",
                  ]}
                />
                {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
                <Line type="natural" dataKey="val" stroke="#8884d8" />
              </LineChart>

              <h4> Temperature </h4>
              <LineChart
                width={plotWidth}
                height={plotHeight}
                data={temperature_data}
              >
                <XAxis dataKey="time" tickCount={5} />
                {/* <XAxis tickCount={5} /> */}
                <YAxis domain={[12, 34]} />
                <Tooltip
                  formatter={(value, _name, _props) => [value.toFixed(2), "Temp"]}
                />
                <ReferenceLine y={28} stroke="red" strokeDasharray="2 2" />
                <ReferenceLine y={15} stroke="red" strokeDasharray="2 2" />
                {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
                <Line type="natural" dataKey="val" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>

          <div id="chat-container">
            <h4>
              Chat with Ivy
            </h4>

            <div className="chat-outer" >
                <div className="chat-inner">
                {toMessageComponents(chats)}
                </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}


function toMessageComponents(listOfMessages) {
  const result = []
  for (let i = 0; i < listOfMessages.length; i++) {
    const { message, time, type } = listOfMessages[i]
    if (time && (i === 0 || !listOfMessages[i - 1].time || time.getHours() !== listOfMessages[i - 1].time.getHours())) {
      result.push(<Time time={time} />)
    }
    if (type === "text") {
      result.push(<TextMessage id={i} text={message} />)
    } else {
      result.push(<PhotoMessage id={i} picture={message} />)
    }
  }
  return result
}

class Time extends Component {

    render() {
      const formatTime = (date) => {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
        return `${hours}:${minutes}`
      }
        return (
            <div className="time">{formatTime(this.props.time)}</div>
        )
    }
}

class TextMessage extends Component {

  render() {
    return (
      <div id={this.props.id} className="text-message message">
        {this.props.text}
      </div>
    );
  }
}

class PhotoMessage extends Component {
  render() {
    return (
      <div id={this.props.id} className="message">
        <img
          style={{ borderRadius: 5 }}
          alt="default"
          width="100%"
          src={this.props.picture}
        />
      </div>
    );
  }
}
