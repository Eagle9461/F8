const Customer = require("../models/customerProfileModel");
const Template = require("../models/templatesModel");
const EdiCustomer = require("../models/ediCustomerModel");
const {ObjectId} = require("mongodb");

const getCustomers = async (req, res) => {

    const { userid } = req.params;
    const query = { userId: userid };
    const customers = await Customer.find(query);
    res.status(200).send(customers);
}
const getCustomerById = async (req, res) => {

    const { customerid } = req.params;
    const customer = await Customer.findById(customerid);
    res.status(200).send(customer);
}
const getEdiCustomer = async (req, res) => {

    const { userid } = req.params;
    const query = { userId: userid };
    const customers = await EdiCustomer.find(query).sort({ timestampField: -1 }).toArray(function(err, docs){
        if(err){
            console.log(err); 
            return;
        }
        return docs;
    });
    const customer = customers.pop();
    res.status(200).send(customer);
}
const saveCustomer = async (req, res) => {
    const { user, formData, additionalPersonaInfo } = req.body;
    const { _id } = user;

    const id = ObjectId.createFromHexString(_id);
    const {goals, customer_age, customer_gender, target_location, customer_monthly_income, uDecMaker} = formData;
    let name = "Koala"; let status = "Running";
    try{
        await new Customer({
          userId:id,
          name,
          goal:goals,
          age:customer_age,
          gender:customer_gender,
          income:customer_monthly_income,
          uDecMaker:uDecMaker,
          location:target_location,
          additionalPersonaInfo,
          status,
          iCustomer:formData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
        .save()
        .then(saveData => {
            res.status(200).send(saveData);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            new Error("Invalid customer data");
        })
    } catch (e){
        res.status(400);
        new Error("Invalid customer data");
    }
}
const updateCustomer = async (req, res) => {
    const { cid, user, formData, additionalPersonaInfo } = req.body;

    const {goals, customer_age, customer_gender, target_location, customer_monthly_income} = formData;

    const update = {$set:{
        goals, 
        customer_age, 
        customer_gender, 
        target_location, 
        customer_monthly_income, 
        iCustomer:formData,
        additionalPersonaInfo,
        updatedAt:Date.now(),
    }};
    const options = { 
        new:true,
        upsert: false 
    };

    try{

        const result = await Customer.findByIdAndUpdate(cid, update, options);
        res.status(200).send({
            message:"Successfully updated!",
            res:result
        });
    } catch (err) {
        res.status(500).send({error:"DB_Error: "+err});
        return;
    }
}

const saveEdiCustomer = async (req, res) => {
    const { userid, data } = req.body;
    const id = ObjectId.createFromHexString(userid);
    try{
        await new EdiCustomer({
          userId:id,
          iCustomer:data,
          createdAt: Date.now(),
        })
        .save()
        .then(saveData => {
            res.status(200).send(saveData);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            new Error("Invalid customer data");
        })
    } catch (e){
        res.status(400);
        new Error("Invalid customer data");
    }

  }

const deleteCustomer = async (req, res) => {
    const { customerid } = req.params;
    try{
        const id = ObjectId.createFromHexString(customerid);
        const query = { _id: id };
        const result = await Customer.deleteOne(query);
        if(result.deletedCount == 1)
            res.status(200).send({msg:"Deleted Successfully.", id:id});
        else 
            res.status(500).send({msg:"Error is occured!", result});
    } catch (err){
        res.status(500).send(err);
    }
}
const getTemplates = async (req, res) => {
    const { userid, funnel } = req.query;
    let query = {userId:userid};
    if(funnel!=undefined)
        query = { ...query, ...{funnel:funnel} };

    console.log(query);

    try{
        const templates = await Template.find(query);
        res.status(200).send(templates);
    } catch (err) {
        res.status(500).send({
            error:err
        })
    }
}
const getTemplateById = async (req, res) => {
    const { id } = req.params;
    let query = {_id:id};

    try{
        const template = await Template.findOne(query);
        res.status(200).send(template);
    } catch (err) {
        res.status(500).send({
            error:err
        })
    }
}
const saveTemplate = async (req, res) => {
    const { 
        _id,
        userId,
        name,
        media,
        courseType,
        platform,
        funnel,
        cognitivefunction,
        mbti,
        prompt_A_label,
        prompt_A,
        prompt_B_label,
        prompt_B,
        isTrackingLink,
        isTrackingPicture,
        isDefault,
    } = req.body;
    // const id = ObjectId.createFromHexString(userid);
    if(_id==undefined){
        try{
            await new Template({
              userId,
              name,
              media,
              courseType,
              platform,
              funnel,
              cognitivefunction,
              mbti,
              prompt_A_label,
              prompt_A,
              prompt_B_label,
              prompt_B,
              isTrackingLink,
              isTrackingPicture,
              isDefault,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            })
            .save()
            .then(saveData => {
                res.status(200).send(saveData);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                new Error("Invalid template data");
            })
        } catch (e){
            res.status(400);
            new Error("Invalid template data");
        }
    } else {
        const update = {$set:{
            name,
            media,
            courseType,
            platform,
            funnel,
            cognitivefunction,
            mbti,
            prompt_A_label,
            prompt_A,
            prompt_B_label,
            prompt_B,
            isTrackingLink,
            isTrackingPicture,
            isDefault,
            updatedAt:Date.now(),
        }};
        const options = { 
            new:true,
            upsert: false 
        };
    
        try{
            const result = await Template.findByIdAndUpdate(_id, update, options);
            res.status(200).send({
                message:"Successfully updated!",
                res:result
            });
        } catch (err) {
            res.status(500).send({error:"DB_Error: "+err});
            return;
        }
    }

}
const deleteTemplate = async (req, res) => {
    const { templateId } = req.params;
    try{
        const id = ObjectId.createFromHexString(templateId);
        const query = { _id: templateId };
        const result = await Template.deleteOne(query);
        if(result.deletedCount == 1)
            res.status(200).send({msg:"Deleted Successfully.", id:id});
        else 
            res.status(500).send({msg:"Error is occured!", result});
    } catch (err){
        res.status(500).send(err);
    }
}
module.exports = { 
    getCustomers,
    getEdiCustomer, 
    saveCustomer, 
    updateCustomer, 
    saveEdiCustomer, 
    deleteCustomer, 
    getCustomerById, 
    getTemplates,
    getTemplateById, 
    saveTemplate, 
    deleteTemplate 
}