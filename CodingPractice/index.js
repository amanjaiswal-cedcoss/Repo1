
// Flatten an array of any depth 

let str=[3,[3,7],[7,[77,9,[0,9]]],9,0,[0]]

function rec(arr,len,depth=1,index=0,temp=[]){
  if(index==len || depth<1)
  return temp;
  (Array.isArray(arr[index]) && depth!=1)?rec(arr[index],arr[index].length,depth-1,0,temp):temp.push(arr[index])
  return rec(arr,len,depth,index+1,temp)
}
console.log(rec(str,str.length,4));