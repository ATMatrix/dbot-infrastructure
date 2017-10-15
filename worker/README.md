# worker
Worker of dbot system which monitor request events from a given scheduler, forward them to the AI provider and return the result back to the scheduler.
## Installation
~~~shell
cd worker && npm install
~~~
## Run
First you need config the worker with information of a scheduler, an account and AI provider in the form defined under the `config/` fold properly. Then:
~~~
node index.js
~~~
## Usage
After started, this worker monitor a `NewQuestion(string question)` event from the scheduler. It assume the structure of the `question` parameter of `NewQuestion` event to be:
~~~javascript
{
  method, // String, the image classify method to query. Must be one of ['dishDetect', 'carDetect', 'logoSearch', 'animalDetect', 'plantDetect', 'objectDetect']
  params, // Object, the actually parameters to be send to the AI provider's API
}
~~~
When the AI provider return results, the worker will send a transaction to invokethe `reply(string result)` method of the scheduler.
So the scheduler must implement at least the `NewQuestion(string question)` event and the `reply(string result)` method.
