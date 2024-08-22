import React, { useEffect, useState } from 'react';
import * as yup from 'yup'; // Import Yup for validation
import axios from 'axios';


// 👇 Here are the validation errors you will use with Yup.
const e = {
  //fullname
  fullnameMin: 'full name must be at least 3 characters',
  fullNameMax: 'full name must be at most 20 characters',
  //size
  sizeOptions: 'size must be S or M or L',
 
}
const userSchema =yup.object().shape({
  fullName: yup.string().trim()
  .required('Full name is required')
  .min(3, e.fullnameMin).max(20, e.fullNameMax),
  size: yup.string()
  .required('Size is required')
  .oneOf(['S', 'M','L'], e.sizeOptions),
  toppings: yup.array().of(yup.string())

})



  const getInitialErrors = () => ({
    fullName: '',
    size: '',
    toppings: '',
    
});

const toppings = [
  { topping_id: "1", text: "Pepperoni" },
  { topping_id: "2", text: "Green Peppers" },
  { topping_id: "3", text: "Pineapple" },
  { topping_id: "4", text: "Mushrooms" },
  { topping_id: "5", text: "Ham" },
];

export default  function Form() {
const [values, setValues] = useState(
  {
    fullName: '',
    size:'',
    toppings:[]
  }
)
const [errors, setErrors] = useState(getInitialErrors())
const [serverSuccess, setServerSuccess] = useState("")
const [serverFailure, setServerFailure] = useState("")
const [formFormEnabled, setformFormEnabled] = useState(false)

useEffect(() => {
  userSchema.isValid(values).then(valid => setformFormEnabled(valid)).catch(()=> setformFormEnabled(false))
}, [values])

const onSubmit = evt => {
  evt.preventDefault()
  axios.post('http://localhost:9009/api/order', {
    ...values,
    toppings: Array.from(values.toppings),
  })
  .then(res => {
    setValues({fullName: '', size:'', toppings: []})
    setServerSuccess(res.data.message)
    setServerFailure(null)
    setformFormEnabled(true)
  })
  .catch(err => {
    console.log(err.response)
    setServerSuccess(err.response.data.message)
    setServerFailure()
    setformFormEnabled(false)

  
  })
}

const handleChange =(event) => {
  const { name, type, value, checked } = event.target;

  let newValue = type === "checkbox" ? checked : value;
  if(name === "fullName") {
    newValue = newValue.trim()
  }
  setValues((prevState) => ({
    ...prevState,
    [name]: newValue,
  }))

  yup.reach(userSchema, name)
  .validate(newValue)
  .then(()=> {
    setErrors((prevErrors) => ({...prevErrors, [name]: ''}))
  })
  .catch((err) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: err.errors[0]}))
  })
};

const onCheckboxChange = (evt) => {
  const { value , checked } = evt.target
  let newToppings = [...values.toppings]

  if(checked) {
    newToppings = [...newToppings, value]

  } else {
    newToppings = newToppings.filter((topping) => topping !== value)
  }
  setValues({...values, toppings: newToppings})
}

  return (
    <div>
    
      <h2>Order Your Pizza</h2>

      {/* Success and failure messages */}
      {serverSuccess && (<div className='success'>{serverSuccess}</div>)}
      {serverFailure && (<div className='failure'>
        <p>
            Thank you for your order, {values.fullName}! Your{" "} 
            {values.size} pizza with {values.toppings.length < 1 ? "no" : toppings.length} topping{values.toppings.length === 1 ? "" : "s"} is on the way.
        </p>
        </div>)}
  <form onSubmit={onSubmit}>
      {/* Full Name input */}
      <div className="input-group">
   <div>
    <label htmlFor="fullname">Full Name</label>
    <br></br>
    <input placeholder="Type full name" onChange={handleChange} id="fullName" type="text" name="fullName" value={values.fullName} />
</div>
</div>
        {errors.fullName && (
          <div className="error">
            {values.fullName.length < 3
            ? e.fullnameMin
            : values.fullName.length > 20
            ? e.fullNameMax
            : ""
            }
          </div>
        )}

        {/* Size dropdown */}
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select value={values.size} name='size'id='size' onChange={handleChange}>
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          </select>
          
        
         </div>
         </div>

         {errors.size && <div className='error'>{errors.size}</div>}
      
      <div className="input-group">
        {toppings.map((topping)=>(
          <label key={topping.topping_id}>
            <input
            name='toppings'
            type="checkbox"
            value={topping.topping_id}
              checked={values.toppings.includes(topping.topping_id)}
              onChange={onCheckboxChange}
              />
              {topping.text}
              <br/>
          </label>
        ))}
      </div>
      <input type="submit" disabled={!formFormEnabled} />
      </form>
      </div>
      );
    }
    