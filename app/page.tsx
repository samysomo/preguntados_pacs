"use client";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  text: string;
  sender: 'user' | 'server';
}

export default function Home() {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:3000");

    // Guardar el socket en el estado
    setSocket(socketInstance);

    // Escuchar mensajes entrantes
    socketInstance.on("message", (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'server' },
      ]);
    });

    // Limpieza al desmontar el componente
    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '' && socket) {
      // Enviar el mensaje al servidor
      socket.emit("message", input);

      // Añadir el mensaje enviado a la lista de mensajes
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col justify-between w-96 h-[500px] border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[70%] break-words ${
              message.sender === 'user'
                ? 'self-end bg-blue-500 text-white'
                : 'self-start bg-gray-200 text-black'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 text-black"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
