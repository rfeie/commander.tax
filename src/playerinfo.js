import React from "react";

const PlayerIcon = () => {
  return (
    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
      <svg
        className="h-6 w-6 text-white"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      />
    </div>
  );
};
const CardWrapper = ({ children }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
};
const Amount = ({ dir, side, amount }) => {
  if (dir !== side || amount <= 1) {
    return null;
  }
  return (
    <span className="text-xl leading-8 font-semibold text-gray-900">
      {amount}
    </span>
  );
};
const Plus = () => (
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z"
    fill="#4A5568"
  />
);
const Minus = () => (
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H7Z"
    fill="#4A5568"
  />
);
const LifeButton = ({ updateFn, amount, direction, last }) => {
  const lookup = {
    left: {
      true: "rounded-l-md",
      false: "",
    },
    right: {
      true: "rounded-r-md",
      false: "",
    },
  };
  const Icon = amount > 0 ? Plus : Minus;
  console.log("rgf", Math.abs(amount), amount, direction);
  const absAmount = Math.abs(amount);
  const content = (
    <>
      <Amount dir={direction} side="right" amount={absAmount} />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Icon />
      </svg>
      <Amount dir={direction} side="left" amount={absAmount} />
    </>
  );
  const dirClass = lookup[direction] ? lookup[direction][!!last] : "";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        updateFn(amount);
      }}
      className={` ${dirClass} relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
    >
      {content}
    </button>
  );
};
const PlayerInfo = ({ name, life, updatePlayer }) => {
  return (
    <CardWrapper>
      <PlayerIcon />
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
            {name}
          </dt>
          <dd className="flex items-baseline">
            <div className="ml-2 flex items-baseline text-sm leading-5 font-semibold text-red-600">
              <span className="relative z-0 inline-flex shadow-sm">
                <LifeButton
                  amount={-5}
                  direction={"left"}
                  last={true}
                  updateFn={(amount) => {
                    updatePlayer({ name, life: life + amount });
                  }}
                />
                <LifeButton
                  amount={-1}
                  direction={"left"}
                  updateFn={(amount) => {
                    updatePlayer({ name, life: life + amount });
                  }}
                />
                <div className="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150">
                  <div className="text-2xl leading-8 font-semibold text-gray-900">
                    {life}
                  </div>
                </div>
                <LifeButton
                  amount={1}
                  direction={"right"}
                  updateFn={(amount) => {
                    updatePlayer({ name, life: life + amount });
                  }}
                />
                <LifeButton
                  amount={5}
                  direction={"right"}
                  last={true}
                  updateFn={(amount) => {
                    updatePlayer({ name, life: life + amount });
                  }}
                />{" "}
              </span>
            </div>
          </dd>
        </dl>
      </div>
    </CardWrapper>
  );
};
export default PlayerInfo;
