import { Flex } from "@react-css/flex";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinner = ({ className, color }) => {
  return (
    <div className={className ? className : "m-auto w-50 text-white"}>
      <Flex column alignItemsCenter>
        <h4>loading...</h4>
        <CircularProgress
          disableShrink
          size={25}
          style={{ color: color ? color : "#fff" }}
        />
      </Flex>
    </div>
  );
};

export default LoadingSpinner;
