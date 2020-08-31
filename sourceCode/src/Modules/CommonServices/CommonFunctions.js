import React from 'react'


    export const arrayReversalFunction =(target,dataArray)=> {
       return (Object.assign(target, dataArray).reverse());
    };


      export  const indexFinderFunction=(targetArray,baseArray)=> {
                     for (let i = baseArray.length; i--;) {
                         if (baseArray[i].id == targetArray.id) {
                             return i;
                         }
                     }
               }


      export  const pairSumIdentifier = (array, sum) => {
        let hashMap = {},
          results = []
            for (let i = array.length; i--;){
                if (hashMap[array[i]]){
                    results.push([hashMap[array[i]], array[i]])
                }else{
                    hashMap[sum - array[i]] = array[i];
                }
              }
              return results;
        }


