const express = require("express");

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const EventEmitter = require("events");
const emitter = new EventEmitter();

require("dotenv/config");

const connectDb = require("./db/database");
const post = require("./route/post-route");
const user = require("./route/user-route");
const { errorHandler } = require("./middleware/error");
const fs = require("fs");
const readable=fs.createReadStream("akbar.txt","utf-8");
readable.on("data",(chunk)=>{
    console.log("Received Chunk------>>>>>>",chunk);
})
readable.on("end",()=>{
    console.log("Finished reading file");
});

readable.on("error",(err)=>{
    console.log("Error while reading file",err);
})



const writable=fs.createWriteStream("akbar_write.txt","utf-8");
writable.write("Hello");
writable.write("\nBye Bro");
writable.end();

writable.on("finish",()=>{
    console.log("Writing Finished");
});

writable.on("error",(err)=>{
    console.log("Error while writing File",err);
})

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connect
connectDb();

// routes
app.use("/", post);
app.use("/user", user);
app.use(errorHandler);

// SOCKET.IO
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Initial message
    socket.emit("notification", { message: "Hello Akbar" });

    // Emit every 10 seconds to this client
    const interval = setInterval(() => {
        socket.emit("notification", {
            message: `Hello Akbar! Time: ${new Date().toLocaleTimeString()}`
        });
    }, 10000); // 10,000 ms = 10 s

    // Clean up when client disconnects
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        clearInterval(interval);
    });
});


// Event Emitter Example
emitter.on("order pizza", (data) => {
    console.log("Pizza Ordered:", data);

    // notify all clients
    io.emit("notification", {
        message: `Pizza Ordered: ${data.name}, Price: ${data.price}`
    });
});

emitter.emit("order pizza", { name: "Cheese", price: 20 });

// Start server (ONLY ONE)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
