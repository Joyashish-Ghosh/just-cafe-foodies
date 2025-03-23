import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cherity = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

    // Fetching menu items
    const { data: menuItems = [] } = useQuery({
        queryKey: ["menu-items", fromDate, toDate],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu?fromDate=${fromDate}&toDate=${toDate}`);
            return res.data;
        },
        enabled: !!fromDate && !!toDate,
    });

    // Fetching payments
    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email, fromDate, toDate],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?fromDate=${fromDate}&toDate=${toDate}`);
            return res.data;
        },
        enabled: !!user?.email && !!fromDate && !!toDate,
    });

    // Calculating extra food items
    const extraFoodItems = useMemo(() => {
        const groupedMenuItemsArray = Object.values(menuItems.reduce((acc, item) => {
            const key = `${item.name}-${item.price}`;
            acc[key] = acc[key] || { ...item, quantity: 0 };
            acc[key].quantity += item.quantity;
            return acc;
        }, {}));

        const groupedSellItems = payments.reduce((acc, item) => {
            const key = `${item.name}-${item.price}`;
            acc[key] = acc[key] || { ...item, quantity: 0 };
            acc[key].quantity += item.quantity;
            return acc;
        }, {});

        return groupedMenuItemsArray.map(addItem => {
            const sellItem = groupedSellItems[`${addItem.name}-${addItem.price}`] || { quantity: 0 };
            if (addItem.quantity > sellItem.quantity) {
                return {
                    name: addItem.name,
                    price: addItem.price,
                    quantity: addItem.quantity - sellItem.quantity,
                };
            }
            return null;
        }).filter(Boolean);
    }, [menuItems, payments]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Extra Food</h2>

            <div className="flex justify-between mb-6">
                <div className="w-1/2 pr-3">
                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">From Date:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-1/2 pl-3">
                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">To Date:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">#</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Item Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price (BDT)</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extraFoodItems.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.price} BDT</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cherity;
