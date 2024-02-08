import LandingImage from "../../assets/landing.jpg";

const Landing = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-around items-center">
      <div className="flex flex-col lg:items-start items-center ">
        <h1 className="lg:flex lg:text-left text-center lg:text-7xl text-[#5D001E] font-bold mt-2">
          India's Most-loved
        </h1>
        <h1 className="lg:flex lg:text-left text-center lg:text-7xl  text-[#5D001E] font-bold mb-6">
          Payments App
        </h1>
        <p className="flex lg:text-4xl text-xl w-2/3 ">
          Recharge & pay bills, book flights & movie tickets,
        </p>
        <p className="flex lg:text-4xl text-xl w-2/3 ">
          open a savings account, invest in stocks & mutual
        </p>
        <p className="flex lg:text-4xl text-xl w-2/3 ">
          funds, and do a lot more.
        </p>
        <div className="bg-[#9A1750] lg:text-xl  text-sm my-8 text-white w-max p-2 rounded-xl">
          Start Paying Now
        </div>
      </div>
      <div>
        <img
          src={LandingImage}
          className="items-center justify-center lg:w-[30rem] lg:h-[30rem] lg:rounded-3xl"
          alt="Landing Page"
        ></img>
      </div>
    </div>
  );
};

export default Landing;
