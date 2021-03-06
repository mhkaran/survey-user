const mapping = require('../database/mapping.js');
const repo = require('../database/repository.js');
const appConst = require('../common/applicationConstant.js')
const staticFunc = require('../common/staticFunc.js');

module.exports ={

    list : async (obj)=>{
        
        try{
            return await repo.fetch(await mapping.blankUser(),obj.filter,obj.value,[appConst.entity.designation]);
        }
        catch(e){
            throw e;
        }

    },
    add : async  (obj)=>{

        let userIds = [];

        try{

        if (Object.prototype.toString(obj)=='[object Array]'){ 

            for (let i=0; i <obj.length;i++){
                userIds.push((await repo.save(await mapping.user(obj[i])))._id); 
                }    
            }
       else
            return await repo.save(await mapping.user(obj));
        }
        catch(e){

            if (userIds){
            userIds.map(async userId => {

                let blankUserObj =  await mapping.blankUser();

                await repo.delete(blankUserObj,{_id:userId});

              });
            }
            throw e;
        }

    },
    update : async (obj)=>{
        
        try{

            if (obj.filter==undefined || staticFunc.isJsonEmpty(obj.filter)) throw 'filter should not be empty';

            else if (obj.value==undefined || staticFunc.isJsonEmpty(obj.value)) throw 'value should not be empty';

            return await repo.update(await mapping.blankUser(),obj.filter,obj.value);
        }
        catch(e){
            throw e;
        }

    },
    remove : async (condition)=>{
        try{

            if (condition==undefined ||staticFunc.isJsonEmpty(condition)) throw 'condition should not be empty';

            return await repo.delete(await mapping.blankUser(),condition);
        }
        catch(e){
            throw e;
        }

    }
}