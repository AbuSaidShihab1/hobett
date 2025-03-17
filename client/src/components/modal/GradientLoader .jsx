const GradientLoader = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        {/* Bars Animation */}
        <div className="flex space-x-2">
          <div className="h-12 w-[8px] lg:w-3 rounded-full bg-gradient-to-b from-orange-400 to-pink-500 animate-loader"></div>
          <div className="h-10 w-[8px] lg:w-3 rounded-full bg-gradient-to-b from-orange-400 to-pink-500 animate-loader delay-100"></div>
          <div className="h-14 w-[8px] lg:w-3 rounded-full bg-gradient-to-b from-orange-400 to-pink-500 animate-loader delay-200"></div>
          <div className="h-10 w-[8px] lg:w-3 rounded-full bg-gradient-to-b from-orange-400 to-pink-500 animate-loader delay-300"></div>
          <div className="h-12 w-[8px] lg:w-3 rounded-full bg-gradient-to-b from-orange-400 to-pink-500 animate-loader delay-400"></div>
        </div>
  
        {/* Animated Loading Text */}
        <p className="mt-6 text-white text-[16px] xl:text-xl font-bold tracking-wider animate-bounce">
          LOADING...
        </p>
      </div>
    );
  };
  
  export default GradientLoader;
  