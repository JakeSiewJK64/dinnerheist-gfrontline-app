import { Flex } from "@react-css/flex";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const LoadingSpinner = ({ className, color }) => {
  return (
    <div className="card w-50 mx-auto mt-5">
      <div className="card-body">
        <div className={className ? className : "m-auto w-50"}>
          <Flex column alignItemsCenter>
            <h4>loading...</h4>
            <CircularProgress disableShrink size={25} />
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
