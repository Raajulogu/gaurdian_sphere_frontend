import React from "react";
import Base from "../Base/Base";
import Datas from "../Datas.json";

const Help = () => {
  return (
    <Base Page={"Help"}>
      <div className="flex justify-around my-4 flex-wrap gap-4">
        <div className="flex flex-col gap-4">
        <OverCome />
        <SelDefence />
        </div>
        <div>
        <HelpLines />
        </div>
      </div>
    </Base>
  );
};

const OverCome = () => {
  return (
    <div className="flex flex-col items-start p-3 z-2 bg-gray-100 shadow-[2px_2px_2px_2px_gray] rounded-md max-w-[800px]">
      <h1 className="font-semibold text-[20px] underline">How Mentally OverCome From Such incident:</h1>
      <br/>
      {Datas.MentalOvercomingTips.map((val, index) => (
        <div key={index} className="flex flex-col items-start">
          <h3 className="font-semibold 5px_5px text-[18px]">{index+1}. {val.Tip}</h3>
          <p className="pl-8 text-justify">{val.Description}</p>
        </div>
      ))}
    </div>
  );
};

const SelDefence = () => {
  return (
    <div className="flex flex-col items-start p-3 z-2 bg-gray-100 shadow-[2px_2px_2px_2px_gray] rounded-md max-w-[800px] h-fit">
      <h1 className="font-semibold text-[20px] underline">SelfDefence Tips:</h1>
      <br/>
      {Datas.SelfDefenseTips.map((val, index) => (
        <div key={index} className="flex flex-col items-start">
          <h3 className="font-semibold 5px_5px text-[18px]">{index+1}. {val.Tip}</h3>
          <p className="pl-8 text-justify">{val.Description}</p>
        </div>
      ))}
    </div>
  );
};

const HelpLines = () => {
  return (
    <div className="flex flex-col items-start p-3 z-2 bg-gray-100 shadow-[2px_2px_2px_2px_gray] rounded-md max-w-[800px]">
      <h1 className="font-semibold text-[20px] underline">HelpLines:</h1>
      <br/>
      <h1 className="font-semibold text-[20px] underline">Women Safety Organization:</h1>
      {Datas.WomensSafetyHelpline.map((val, index) => (
        <div key={index} className="flex flex-col items-start">
          <h3 className="font-semibold 5px_5px text-[18px]">{index+1}. {val.Organization}</h3>
          <p className="pl-8 text-justify">{val.Number}</p>
        </div>
      ))}
      <br/>
      <h1 className="font-semibold text-[20px] underline">Doctors Helplines:</h1>
      <br/>
      {Datas.DoctorsHelpline.map((val, index) => (
        <div key={index} className="flex flex-col items-start">
          <h3 className="font-semibold 5px_5px text-[18px]">{index+1}. {val.Organization}</h3>
          <p className="pl-8 text-justify">{val.Number}</p>
        </div>
      ))}
    </div>
  );
};
export default Help;
