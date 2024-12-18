import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './form.css'

const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    size: yup.string().required("Please select a shirt size"),
    comment: yup.string().max(200, "Comment cannot exceed 200 characters"),
});

const FormComponent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedValue, setSelectedValue] = useState("XS");

    const onSubmit = data => console.log(data);

    const handleSizeChange = (value) => {
        setSelectedValue(value);
    };

    console.log(watch("email"));

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                    <h3>Email</h3>
                    <input 
                        type="email" 
                        {...register("email")} 
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="form-field">
                    <h3>Name</h3>
                    <input 
                        type="text"
                        placeholder="Enter your name" 
                        {...register("name")} 
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-field">
                    <h3>Shirt size</h3>
                    <fieldset className="radio-group">
                        {["XS", "S", "M", "L", "XL"].map(size => (
                            <label key={size}>
                                <input
                                    {...register("size")}
                                    type="radio"
                                    name="size"
                                    value={size}
                                    checked={selectedValue === size}
                                    onChange={() => handleSizeChange(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </fieldset>
                    {errors.size && <p className="error">{errors.size.message}</p>}
                </div>

                <div className="form-field">
                    <h3>T-Shirt Preview</h3>
                    <img src="https://via.placeholder.com/150" alt="T-Shirt Preview" />
                </div>

                <div className="form-field">
                    <h3>Other thoughts or comments</h3>
                    <input type="text" {...register("comment")} />
                    {errors.comment && <p className="error">{errors.comment.message}</p>}
                </div>
                <div className="form-field">
                    <input type="submit" value="Submit" />
                    <button>Clear answer</button>
                </div>
            </form>
        </div>
    );
};

export default FormComponent;
