
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { productInput, SET_FORMDATA, ADD_DISPLAYING_INDEXES, selectFormData, selectIsLoading } from "../../redux/features/customers/customersSlice";
import { IdealCustomer } from "../../constants.js";
import { replaceObjectKeysWithString } from "../../helpers.js";
import { validateForm } from "../../utils/validator";
import { toast } from "react-toastify";

export default function ProductInput() {
    const dispatch = useDispatch();
    const formData = useSelector(selectFormData);

    const isLoading = useSelector(selectIsLoading);

    const handleChangeInput = (e:any) => {
        const { name, value } = e.target;
        dispatch(SET_FORMDATA({ [name]: value }));
    }

    const handlesubmit = async (e:any) => {
        e.preventDefault();
            // Get form data
        const formData = {
            goals: e.target.goals.value,
            product_service: e.target.product_service.value,
            productservice_type: e.target.productservice_type.value,
            productservice_name: e.target.productservice_name.value,
            productservice_brand: e.target.productservice_brand.value,
            productservice_price: e.target.productservice_price.value,
            target_location: e.target.target_location.value,
        };
    
        // Perform validation
        const isValid = validateForm(formData);
    
        if (isValid) {
            // Proceed with further actions
            // ...
            let prompts:any = {};
            IdealCustomer[0].queries.map((query) =>{
                let buf = {};
                buf = query.fields.reduce((acc:any, field:any) => {
                    acc[field.database_label] = replaceObjectKeysWithString(formData, field.prompt);
                    return acc;
                }, []);
                prompts = {...prompts, ...buf};
            });
            await dispatch(productInput(prompts));
            dispatch(ADD_DISPLAYING_INDEXES(0));
        } else {
            // Handle validation error
            toast.warning("Not validate");
            // ...
        }
        // scrollToElement('#title_1', {
        //     duration: 100,
        //     offset: 0
        // });
    }
    return <section className="container mt-5">
        <h2 className="text-center" id={"title_-1"}>
            {
                isLoading ? 
                    <span>Thinking..</span>:
                    <span>Ideal Customer Persona</span>
            }
        </h2>
        <form className='mt-5' onSubmit={handlesubmit}>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Goals:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="goals" onChange={handleChangeInput} value={formData.goals}/>
                </div>
            </div>
            <div className="row mb-5">
                <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Product or Service?:</label>
                <div className="col-sm-7">
                    <select className="form-select" defaultValue='0' name="product_service" aria-label="Default select example" onChange={handleChangeInput} value={formData.product_service}>
                        <option value='0'>Please select</option>
                        <option value="product">Product</option>
                        <option value="service">Service</option>
                    </select>
                </div>

            </div>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Type of Product/ Service:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="productservice_type" onChange={handleChangeInput}  value={formData.productservice_type}/>
                </div>
            </div>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Product/Service name:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="productservice_name" onChange={handleChangeInput}  value={formData.productservice_name}/>
                </div>
            </div>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Brand Name:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="productservice_brand" onChange={handleChangeInput}  value={formData.productservice_brand}/>
                </div>
            </div>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Price:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="productservice_price" onChange={handleChangeInput}  value={formData.productservice_price}/>
                </div>
            </div>
            <div className="row mb-5">
                <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Location:</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" name="target_location" onChange={handleChangeInput}  value={formData.target_location}/>
                </div>
            </div>

            <div className="row mb-5">
                <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Is the User also the decision maker?</label>
                <div className="col-sm-7">
                    <select className="form-select" defaultValue='0' name="uDecMaker" aria-label="Default select example" onChange={handleChangeInput}  value={formData.uDecMaker}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

            </div>
            <div className="text-center mt-5">
                <button type="submit" className="btn btn-purple text-center" style={{ minWidth: "50%" }}>
                    Continue
                </button>
            </div>
        </form>
    </section>

}