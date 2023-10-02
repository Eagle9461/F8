const {

    getCustomers,
    saveCustomer,
    updateCustomer,
    saveEdiCustomer,
    deleteCustomer,
    getCustomerById,
    getEdiCustomer,
    getTemplates,
    getTemplateById,
    saveTemplate,
    deleteTemplate,
} = require("../controllers/customersController");

async function customersRoute(app){

    app.get("/api/customers/getcustomers/:userid", getCustomers);
    app.get("/api/customers/getedicustomer/:userid", getEdiCustomer);
    app.post("/api/customers/savecustomer", saveCustomer);
    app.post("/api/customers/updatecustomer", updateCustomer);
    app.post("/api/customers/saveedicustomer", saveEdiCustomer);
    app.get("/api/customers/delete/:customerid", deleteCustomer);
    app.get("/api/customers/getcustomerbyid/:customerid", getCustomerById);
    app.get("/api/agents/getTemplates", getTemplates);
    app.get("/api/agents/getTemplateById/:id", getTemplateById);
    app.post("/api/agents/saveTemplate", saveTemplate);
    app.get("/api/agents/deleteTemplate/:templateId", deleteTemplate);
}
  
module.exports = customersRoute;