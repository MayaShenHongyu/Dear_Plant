import React, { Component } from 'react';
// import './Plot.css'
import { MqttClient } from "mqtt"
import { LineChart, Line } from 'recharts';

export default class MQTTTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: [],
        }
        // this.fetchTemperatureData = this.fetchTemperatureData.bind(this);
    }

    componentDidMount() {
        this.testConnection();
        // this.fetchTemperatureData();
    }

    testConnection() {

        const options = {
            port: 1883,
            clientId: "mqtt-explorer-1245435",
            rejectUnauthorized: false,
            protocol: 'mqtt',
            host: '192.168.99.54'
        };

        var client = MqttClient({
            broker: "mqtt://192.168.99.54:1883"
        })

        // var options = {
        //     keepalive: 10,
        //     clientId: '',
        //     protocolId: 'MQTT',
        //     protocolVersion: 3,
        //     clean: true,
        //     reconnectPeriod: 20000,
        //     connectTimeout: 30 * 1000,
        //     protocol: 'mqtt',
        //     rejectUnauthorized: false

        // }

        client.on('connect', function () {
            client.subscribe('IDD/#', function (err) {
                if (!err) {
                    client.publish('presence', 'Hello mqtt')
                }
            })
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            // client.end()
        })
    }

    // fetchTemperatureData() {
    //     for (let i = 0; i < 30; i++) {
    //         setTimeout(() => {
    //             const num = Math.floor(Math.random() * 500);
    //             var points = this.state.points.slice();
    //             points.push({
    //                 pv: num
    //             })
    //             this.setState({ points: points })
    //         }, i * 5000);
    //     }
    // }

    render() {
        const points = this.state.points;
        return (
            <div>
                Hello pde
            </div>
            // <div id='center-container'>
            //     <LineChart width={1200} height={700} data={points}>
            //         <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            //     </LineChart>
            // </div>
        )
    }
}