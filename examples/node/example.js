const {launch, getGameURL} = require('./gameolive.js');
console.log('1 + 2 = ' + launch(1, 2));
getGameURL({operatorId:"5f41517aea7e1b306e4e83ec", configId:"5f86abebeb039e4113549181"},(url,error)=>{
    if(!error){
        console.log(url);
    }else{
        console.error(error);
    }
});