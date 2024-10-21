
import { useForm } from 'react-hook-form';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="JUST Cafe Foodies"></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name')}
                            className="input input-bordered w-full " />
                    </div>

                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select {...register('category')}
                                className="select select-bordered w-full">
                                <option disabled selected>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price')}
                                className="input input-bordered w-full " />
                        </div>
                    </div>

                    {/* food details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe')}  className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>


                    <div className="form-control w-full my-6">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div>




                    <button className="btn">
                        Add Item <FaUtensils className="ml-4 "></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;