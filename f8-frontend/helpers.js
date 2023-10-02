import { IdealCustomer } from "./constants";


const getPrompt = () => {
    const extractedData = [];
    for (let i = 0; i < IdealCustomer.length; i++) {
        const {title, queries} = IdealCustomer[i];
        for (let j = 0; j < queries.length; j++) {
            const { query, fields } = queries[j];
            for(let k = 0; k < fields.length; k++){
                const {database_label, prompt} = fields[k];
                extractedData.push({ database_label, prompt });
            }
        }
        
    }
    return extractedData;
}
export function replaceObjectKeysWithString(object, str) {
    const regex = new RegExp("\\[(" + Object.keys(object).join("|") + ")\\]", "gi");
    return str.replace(regex, matched => object[matched.slice(1, -1)]);
}

export const database_labels = getPrompt().map(({ database_label }) => database_label);