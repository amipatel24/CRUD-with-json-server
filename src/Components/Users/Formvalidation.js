export function ValidateUser(values, setFindErrors) {
  let errors = {};

  if (!values?.name) {
    errors.name = "Name is required";
  }
  if (!values?.email) {
    errors.email = "Email id is missing";
  } else if (!/\S+@\S+\.\S+/.test(values?.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values?.mobile) {
    errors.mobile = "Mobile No is required";     
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      parseInt(values?.mobile)
    )
  ) {
    errors.mobile_no = "mobile number is invalid";
  }

  if (!values?.address) {
    errors.address = "Adress is  required";
  }
  if (!values?.city) {
    errors.city = "Please  select your city";
  }
  if (!values?.gender) {
    errors.gender = "please select gender";
  }
  setFindErrors(false);
  return errors;
}
