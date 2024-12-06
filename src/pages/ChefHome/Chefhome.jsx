import React, { useState } from "react";
import useChefStatus from "../../hooks/useChefStatus";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ChefHome = () => {
  const [status, isStatusPending, refetch] = useChefStatus();
  const [selectedItem, setSelectedItem] = useState(null);
  const [newWaitingTime, setNewWaitingTime] = useState("");
  console.log(selectedItem)

  let axiosPublic = useAxiosPublic()

  // Function to handle waiting time change
  const handleChangeWaitTime = async () => {
    let time ={
        newWaitingTime
    }
    let res = await axiosPublic.put(`/chef/wait-time/${selectedItem}`, time);
    console.log(res.data);
    if(res.data.result){
        refetch()
    }

  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Number of Items</th>
              <th>Waiting Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {status?.length > 0 ? (
              status.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.cus_email}</td>
                  <td>{item.cus_phone}</td>
                  <td>{item.cart.length}</td>
                  <td>{item.waiting_time || "N/A"}</td>
                  <td>
                    
                    <button
                      className="text-white bg-green-950 px-3 py-2 rounded-md"
                      onClick={() => setSelectedItem(item?._id)}
                    >
                      Change Time
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedItem && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Change Waiting Time</h3>
            <p className="py-4">
              Update the waiting time for <strong>{selectedItem.cus_email}</strong>
            </p>
            <input
              type="number"
              className="input input-bordered w-full mb-4"
              placeholder="Enter new waiting time (in mins)"
              value={newWaitingTime}
              onChange={(e) => setNewWaitingTime(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => handleChangeWaitTime()}
              >
                Submit
              </button>
              <button
                className="btn"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ChefHome;
