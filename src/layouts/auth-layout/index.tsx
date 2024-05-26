import { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen min-w-[1600px] overflow-hidden">
      <div className="grid grid-cols-3">
        <div className="col-span-1 overflow-hidden">
          <img src={'/img/Splash-IMG.png'} alt="authentication-banner" className="w-full h-full" />
        </div>
        <div className="col-span-2">
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
