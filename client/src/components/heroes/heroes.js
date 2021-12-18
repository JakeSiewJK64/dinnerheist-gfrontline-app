import "./heroes.css";
import Flex from "@react-css/flex";
import Heroes_Array from "./gun-array";

const Heroes = () => {
  return (
    <div className="w-75 m-auto card mt-5">
      <div className="card-body">
        <h2>Guns</h2>
        <Flex flexWrap="wrap" row gap="1rem" justifyCenter>
          {Heroes_Array.map((x) => (
            <div className="hero-profile" key={x.key}>
              <img src={x.image_url} className="hero-image" />
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default Heroes;
