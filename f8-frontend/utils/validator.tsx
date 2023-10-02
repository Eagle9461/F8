export const validateForm = (data:any) => {
    // Perform your validation logic here
    if (!data.product_service || !data.goals || !data.productservice_type || !data.productservice_name || !data.productservice_brand || !data.productservice_price || !data.target_location) {
      return false;
    }
    return true;
  };