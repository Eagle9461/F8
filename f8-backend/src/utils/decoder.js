 const decodeStorySequence = (story) => {
    let list = story.split( "\n");
    list = list.filter((one) => {
        if(one!="") return one.trim();
    });
    let res = [];
    let str = "{";
    list.map((one, index) => {
        if(index != 0)str+=",";
        let newOne = one.split(":");
        let stage = newOne[0].trim(); 
        if(newOne[1] != undefined)
            str += `"${stage}":"${newOne[1].trim()}"`;
    });
    str += "}";
    res = JSON.parse(str);
    return res;
}

module.exports = decodeStorySequence;