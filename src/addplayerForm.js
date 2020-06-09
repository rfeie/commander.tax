import React, { useState } from "react";

const AddPlayerForm = ({ addPlayer }) => {
  const [name, setName] = useState("");
  const [life, setLife] = useState("40");
  return (
    <div>
      <fieldset>
        <legend className="block text-sm font-medium leading-5 text-gray-700">
          Player Information
        </legend>
        <div className="mt-1 rounded-md shadow-sm">
          <div>
            <input
              onChange={e => {
                const { value } = e.target;
                setName(value);
              }}
              value={name}
              className="form-input relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              placeholder="Name"
            />
          </div>
          <div className="-mt-px">
            <input
              value={life}
              onChange={e => {
                const { value } = e.target;
                const regex = /\d+/;
                if (regex.test(value)) {
                  setLife(value);
                } else {
                  e.preventDefault();
                }
              }}
              className="form-input relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              placeholder="Life"
            />
          </div>
        </div>
      </fieldset>
      <button
        onClick={e => {
          e.preventDefault();
          console.log("addPlayer", { name, life });
          addPlayer({ name, life: Number.parseInt(life, 10) });
        }}
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
      >
        Add player
      </button>
    </div>
  );
};

export default AddPlayerForm;
