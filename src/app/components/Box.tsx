
export default function Box({ children } : { children?: any }) {
    return (
      <div className="box flex flex-col flex-grow box-border rounded-lg transition duration-300 ease-in-out hover:shadow-[0_0_15px_10px_#ff1493] hover:shadow-violet-500/50 hover:ring-1 hover:ring-purple-500 hover:scale-102 hover:brightness-110 bg-gradient-to-b from-violet-950 via-purple-500 to-pink-500 justify-center">
        {children ? children : null}
      </div>
    );
  }