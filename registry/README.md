# registry
Registry implements functions of AI address,  includes:<br/>

register(aiName, billingAddr): register an AI by AI's name and its billing contract address.<br/>
get(aiName): get AI's billing contract address by name.<br/>
set(aiName, billingAddr): set AI's billing contract address by name.<br/>
delete(aiName): delete AI by name.

## Installation
~~~shell
cd registry && npm install
~~~
## Run
~~~
node run.js
~~~
## Usage
After started, run.js will compile and deploy Register.sol to http://localhost:8545 automatically if it wasn't deployed before,
then call register.js' function registerAI() to register an AI if it was not registered before,else
call delete deleteAIByName() to delete this AI to test.
