const TOPICS = {};
let hasOwnProperty = TOPICS.hasOwnProperty;

/**
 * Register an subscription handler for the topic.
 *
 * @param  {string} topic name.
 * @param  {function} listener description.
 * @return {object} the subscription object.
 */
let subscribe = (topic, listener) => {
    let listenerPosition;
    //Check if topic exists, else initialize it.
    if (!hasOwnProperty.call(TOPICS, topic)) {
        TOPICS[topic] = [];
    }
    //Push topic listener.
    listenerPosition = TOPICS[topic].push(listener) - 1;
    return {
        //Handle to remove subscription.
        remove: () => {
            let handlers = TOPICS[topic],
                index = handlers.indexOf(listener);
            handlers.splice(index, 1);
        }
    };
};

/**
 * Removes subscription handler. If topic name is provided then it
 * removes all subscription handlers for the topic.
 *
 * @param  {Object} subscription {Either topics name or subscription handler}
 */
let unsubscribe = (subscription) => {
    if (!subscription) {
        return;
    }
    if (typeof subscription === 'object') {
        subscription.remove();
    } else if (typeof subscription === 'string') {
        TOPICS[subscription] = [];
    }
}

/**
 * Publish a topic message.
 *
 * @param  {string} topic name.
 * @param  {Object} message object.
 */
let publish = (topic, message) => {
    if (!hasOwnProperty.call(TOPICS, topic)) {
        return;
    }
    TOPICS[topic].forEach(function (item) {
        item(message != undefined ? message : {});
    });
};

let pubsub = {
    subscribe: subscribe,
    publish: publish,
    unsubscribe: unsubscribe
};

let topic = 'Pub-Sub Topic';
pubsub.subscribe(topic, (message) => {
    var element = document.createElement('h1');
    element.innerHTML = `${topic} published message: ${message}`;
    document.getElementsByTagName('body')[0].appendChild(element);
});

let listener = function () {
    pubsub.publish(topic, 'Hello World');
    pubsub.publish(topic, 'It works');
};