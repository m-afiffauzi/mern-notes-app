import React, { memo } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CardContent = ({ title, body, createdAt }) => {
  return (
    <>
      {/* Card */}
      <div className="card w-64 xs:w-80 sm:w-[450px] md:w-72 lg:w-96 xl:w-80 h-32 lg:h-60 bg-base-100 shadow-md hover:shadow-2xl active:-translate-y-1 cursor-pointer transition duration-300">
        {/* Card Container */}
        <div className="card-body flex flex-col justify-between p-4 lg:p-8">
          {/* Card Title */}
          <h2 className="card-title text-lg lg:text-2xl text-primary">
            {title}
          </h2>
          {/* Card Body */}
          <div className="h-10 lg:h-20 text-sm lg:text-lg overflow-clip">
            <p>{body}</p>
          </div>
          {/* Card Date */}
          <div className="card-actions justify-end">
            <p className="text-sm text-end text-primary-focus">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const MemoContent = memo(CardContent);

export default MemoContent;
