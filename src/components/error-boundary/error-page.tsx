import { memo } from 'react';

import { AppRoutes } from '../../helpers';

import './styles.less';

export const ErrorPage = memo(() => {
  return (
    <section className="page_500">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="five_zero_file_bg">
                <h1 className="text-center ">500</h1>
              </div>
              <div className="contant_box_500">
                <h3 className="h2">{`Oops! Something went wrong!`}</h3>
                <a href={AppRoutes.home} className="link_500 text-primary">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
