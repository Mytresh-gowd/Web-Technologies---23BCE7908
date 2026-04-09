// Import events module
const EventEmitter = require('events');

// Create an EventEmitter object
const eventEmitter = new EventEmitter();

// -----------------------------
// Register Event Listeners
// -----------------------------

// Listener 1
eventEmitter.on('greet', (name) => {
    console.log(`Hello ${name}! Welcome to Node.js events.`);
});

// Listener 2 (multiple listeners for same event)
eventEmitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

// Another event
eventEmitter.on('dataReceived', (data) => {
    console.log(`Data received: ${data}`);
});

// -----------------------------
// Trigger Events
// -----------------------------

// Emit greet event with data
eventEmitter.emit('greet', 'Mowa');

// Emit another event
eventEmitter.emit('dataReceived', 'Sample data from event');

// -----------------------------
// Demonstrating Asynchronous Behavior
// -----------------------------

setTimeout(() => {
    eventEmitter.emit('greet', 'Async Mowa');
}, 2000);