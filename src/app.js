/*
______                     _____ _                   _                            
|  _  \                   /  ___| |                 | |                           
| | | |__ ___      ___ __ \ `--.| |__   ___  ___  __| |_   _   ___ ___  _ __ ___  
| | | / _` \ \ /\ / / '_ \ `--. \ '_ \ / _ \/ _ \/ _` | | | | / __/ _ \| '_ ` _ \ 
| |/ / (_| |\ V  V /| | | /\__/ / | | |  __/  __/ (_| | |_| || (_| (_) | | | | | |
|___/ \__,_| \_/\_/ |_| |_\____/|_| |_|\___|\___|\__,_|\__, (_)___\___/|_| |_| |_|
                                                        __/ |                     
                                                       |___/                      
*/
function app() {

    //Load express, which will handle the api and front-end hosting.
    require('./routes/expressLoader')()

    //Load datastore
    require('./controllers/datastore')
}

module.exports = app;