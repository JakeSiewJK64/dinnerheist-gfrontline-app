import Flex from "@react-css/flex";
import sopmod from "../../img/sopmod_404.png";

export function MissingPage() {
  return (
    <div className="card mx-auto mt-5 w-75">
      <div className="card-body">
        <Flex column alignItemsCenter>
          <h1>Oops!</h1>
          <h4>The page you are looking for is not available.</h4>
          <img draggable="false" src={sopmod} style={{ width: "20rem" }} />
        </Flex>
      </div>
    </div>
  );
}
