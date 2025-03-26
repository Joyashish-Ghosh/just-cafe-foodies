import { useLocation } from "react-router-dom";

const Charity = () => {
  const location = useLocation();
  console.log(location.state);  // Log the entire state to debug

  const extraFoodItems = location.state?.extraFoodItems || [];

  return (
    <div className="my-12">
      <h2 className="text-xl font-semibold mb-4">Charity Page - Donated Items</h2>

      {extraFoodItems.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Item Name</th>
              {/* <th className="border border-gray-300 p-2">Price</th> */}
              <th className="border border-gray-300 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {extraFoodItems.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                {/* <td className="border border-gray-300 p-2">{item.price} BDT</td> */}
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Items to Donate</p>
      )}
    </div>
  );
};

export default Charity;
