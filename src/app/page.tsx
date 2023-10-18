"use client"
import { useEffect, useState, useRef } from 'react';

const Home = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<string[]>([]);
    const [room, setRoom] = useState<string>("default");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (room) {
            ws.current = new WebSocket(`ws://chatapp-backend-lhk3.onrender.com//ws/${room}`);
            ws.current.onmessage = (event) => {
                setChat((prevChat) => [...prevChat, event.data]);
            };

            return () => {
                if (ws.current) ws.current.close();
            };
        }
    }, [room]);

    const sendMessage = () => {
        if (ws.current && message) {
            ws.current.send(message);
            setMessage("");
        }
    };

    return (
        <div>
            <input
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <ul>
                {chat.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Home;
